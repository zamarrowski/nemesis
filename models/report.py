# -*- coding: utf-8 -*-

import pytz
from datetime import datetime

from mongoengine import DynamicDocument, fields

from models.user import UserSlack
from common.config import options
from common import constants


class UserStatusReport(DynamicDocument):
    user = fields.ReferenceField(UserSlack, required=True)
    status = fields.IntField(choices=constants.USER_STATUS, max_length=1, required=True)
    reported_at = fields.DateTimeField(required=True)
    comments = fields.StringField(required=False)

    meta = {
        'ordering': ['-reported_at']
    }

    @classmethod
    def clean(self):
        self.reported_at = datetime.utcnow()

    @property
    def reported(self, timezone=options.nemesis_timezone):
        current_tz = pytz.timezone(timezone)
        reported_at = self.reported_at.replace(tzinfo=pytz.utc).astimezone(current_tz)
        return '{datetime:%d-%m-%Y %H:%M:%S}'.format(datetime=reported_at)

    @property
    def status_str(self):
        return self.get_status_display()
