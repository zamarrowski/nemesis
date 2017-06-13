# -*- coding: utf-8 -*-
import pytz

from datetime import datetime, timedelta

from mongoengine.queryset.visitor import Q
from mongoengine import DynamicDocument, fields
from mongoengine.errors import DoesNotExist

from common.config import options


def get_interval_date(date):
    min_date = datetime.combine(date, datetime.min.time())
    max_date = min_date + timedelta(days=1)
    return min_date, max_date


class UserSlack(DynamicDocument):
    slack_id = fields.StringField(required=True)
    username = fields.StringField(required=True)
    realname = fields.StringField(required=True)
    avatar = fields.StringField(required=False)
    active = fields.BooleanField(default=False)

    @staticmethod
    def get(user, create=False):
        try:
            return UserSlack.objects.get(slack_id=user['slack_id'])
        except DoesNotExist:
            if create is True:
                return UserSlack(**user).save()

    def get_current_report(self):
        timezone = options.nemesis_timezone
        current_tz = pytz.timezone(timezone)
        return self.get_report(datetime.utcnow().replace(tzinfo=pytz.utc).astimezone(current_tz).date())

    def get_report(self, date):
        from models.report import UserStatusReport
        min_date, max_date = get_interval_date(date)
        reports = UserStatusReport.objects.filter(user=self)
        filter_date = Q(reported_at__gte=min_date) & Q(reported_at__lt=max_date)
        return reports.filter(filter_date)[0] if len(reports.filter(filter_date)) > 0 else None

    def update_report(self, **kwargs):
        from models.report import UserStatusReport
        user_report = self.get_current_report()
        kwargs['reported_at'] = datetime.utcnow()
        if user_report is not None:
            user_report.update(**kwargs)
        else:
            UserStatusReport(user=self, **kwargs).save()
