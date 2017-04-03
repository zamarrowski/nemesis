# -*- coding: utf-8 -*-

import datetime

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
        if UserSlack.get_user_status_from_day(user) is not None:
            return True
        return False

    @staticmethod
    def get_user_status_from_day(user, day=None):
        from models.report import UserStatusReport
        if day is None:
            day = datetime.datetime.utcnow().date()
        midnight = datetime.datetime.combine(day, datetime.time(0))
        tomorrow_midnight = datetime.datetime.combine(day + datetime.timedelta(days=1), datetime.time(0))
        if len(UserStatusReport.objects.filter(user=user, reported_at__gte=midnight).filter(reported_at__lte=tomorrow_midnight)) > 0:
            return UserStatusReport.objects.filter(user=user, reported_at__gte=midnight).filter(reported_at__lte=tomorrow_midnight)[0]

    @staticmethod
    def report_status(user, status, comments=None):
        from models.report import UserStatusReport
        try:
            user_slack = UserSlack.objects.get(slack_id=user['slack_id'])
            user_slack.update(user)
        except:
            user_slack = UserSlack(**user).save()
        user_status_report = UserSlack.get_user_status_from_day(user_slack)
        if user_status_report is not None:
            user_status_report.update(status, comments)
        else:
            UserStatusReport(user=user_slack, status=status, reported_at=datetime.datetime.utcnow(), comments=comments).save()
