# -*- coding: utf-8 -*-

import pytz
import datetime

from nemesis.config import options
from nemesis import constants

from mongoengine import DynamicDocument, fields
from mongoengine.errors import DoesNotExist


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
    def get_user_status_today(user):
        midnight = datetime.datetime.combine(datetime.datetime.utcnow().date(), datetime.time(0))
        tomorrow_midnight = datetime.datetime.combine(datetime.datetime.utcnow().date() + datetime.timedelta(days=1), datetime.time(0))
        if len(UserStatusReport.objects.filter(user=user, reported_at__gte=midnight).filter(reported_at__lte=tomorrow_midnight)) > 0:
            return UserStatusReport.objects.filter(user=user, reported_at__gte=midnight).filter(reported_at__lte=tomorrow_midnight)[0]

    @staticmethod
    def report_status(user, status, comments=None):
        try:
            user = UserSlack.objects.get(slack_id=user['slack_id'])
        except:
            user = UserSlack(**user).save()
        user_status_report = UserSlack.get_user_status_today(user)
        if user_status_report is not None:
            user_status_report.update(status, comments)
        else:
            UserStatusReport(user=user, status=status, reported_at=datetime.datetime.utcnow(), comments=comments).save()


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

    def serialize_reported_at(self, timezone=options.nemesis_timezone):
        current_tz = pytz.timezone(timezone)
        reported_at = self.reported_at.replace(tzinfo=pytz.utc).astimezone(current_tz)
        return '{datetime:%d-%m-%Y %H:%M:%S}'.format(datetime=reported_at)

    def serialize(self):
        return {
            'user': self.user.serialize(),
            'status_str': self.get_status_display(),
            'status_level': self.status,
            'reported_at': self.serialize_reported_at(),
            'comments': self.comments
        }

    def update(self, status, comments):
        self.status = status
        self.comments = comments
        self.reported_at = datetime.datetime.utcnow()
        self.save()
