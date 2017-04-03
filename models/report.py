# -*- coding: utf-8 -*-

import pytz
import datetime

from mongoengine import DynamicDocument, fields
from mongoengine.errors import DoesNotExist


from models.user import UserSlack
from common.config import options
from common import constants


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
