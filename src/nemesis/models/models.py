# -*- coding: utf-8 -*-

import pytz
import datetime

from mongoengine import DynamicDocument, fields
from mongoengine.errors import DoesNotExist

from nemesis.common.config import options
from nemesis.common import constants


class UserSlack(DynamicDocument):
    slack_id = fields.StringField(required=True)
    username = fields.StringField(required=True)
    realname = fields.StringField(required=True)
    avatar = fields.StringField(required=False)

    def serialize(self):
        return {
            'slack_id': self.slack_id,
            'username': self.username,
            'realname': self.realname,
            'avatar': self.avatar
        }

    def update(self, user):
        self.username = user['username']
        self.realname = user['realname']
        self.avatar = user['avatar']
        self.save()

    @staticmethod
    def get_user(slack_id):
        try:
            return UserSlack.objects.get(slack_id=slack_id)
        except DoesNotExist:
            return None

    @staticmethod
    def has_user_reported(user):
        try:
            user = UserSlack.objects.get(slack_id=user)
        except:
            return False
        if UserSlack.get_user_status_today(user) is not None:
            return True
        return False

    @staticmethod
    def get_user_status_from_day(user, day=None):
        if day is None:
            day = datetime.datetime.utcnow().date()
        midnight = datetime.datetime.combine(day, datetime.time(0))
        tomorrow_midnight = datetime.datetime.combine(day + datetime.timedelta(days=1), datetime.time(0))
        if len(UserStatusReport.objects.filter(user=user, reported_at__gte=midnight).filter(reported_at__lte=tomorrow_midnight)) > 0:
            return UserStatusReport.objects.filter(user=user, reported_at__gte=midnight).filter(reported_at__lte=tomorrow_midnight)[0]

    @staticmethod
    def report_status(user, status, comments=None):
        try:
            user_slack = UserSlack.objects.get(slack_id=user['slack_id'])
            user_slack.update(user)
        except:
            user_slack = UserSlack(**user).save()
        user_status_report = UserSlack.get_user_status_today(user_slack)
        if user_status_report is not None:
            user_status_report.update(status, comments)
        else:
            UserStatusReport(user=user_slack, status=status, reported_at=datetime.datetime.utcnow(), comments=comments).save()


class UserStatusReport(DynamicDocument):
    user = fields.ReferenceField(UserSlack, required=True)
    status = fields.IntField(choices=constants.USER_STATUS, max_length=1, required=True)
    reported_at = fields.DateTimeField(required=True)
    comments = fields.StringField(required=False)

    def get_status(text):
        text = text.split(':')
        status = text[0]
        if status.isdigit() is False or int(status) not in range(1, 6):
            return None, None
        comments = None
        if len(text) > 1:
            comments = text[1]
        return int(status), comments

    @staticmethod
    def get_login_message():
        initial_message = u'Hi! How do you feeling today?\n'

        for status in constants.USER_STATUS:
            initial_message += str(status[0]) + '. ' + status[1] + '\n'
        initial_message += 'ex, 3: I am tired'
        return initial_message

    def serialize_reported_at(self, timezone=options.nemesis_timezone):
        current_tz = pytz.timezone(timezone)
        reported_at = self.reported_at.replace(tzinfo=pytz.utc).astimezone(current_tz)
        return '{datetime:%d-%m-%Y %H:%M:%S}'.format(datetime=reported_at)

    def serialize(self, user=False):
        user_status_report = {
            'status_str': self.get_status_display(),
            'status_level': self.status,
            'reported_at': self.serialize_reported_at(),
            'comments': self.comments
        }
        if user is True:
            user_status_report.update({'user': self.user.serialize()})
        return user_status_report

    def update(self, status, comments):
        self.status = status
        self.comments = comments
        self.reported_at = datetime.datetime.utcnow()
        self.save()
