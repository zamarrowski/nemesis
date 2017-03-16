# -*- coding: utf-8 -*-

import pytz

from mongoengine import DynamicDocument, fields


class HappyUserHistoric(DynamicDocument):
    user = fields.StringField(required=True)
    name = fields.StringField(required=True)
    realname = fields.StringField(required=True)
    happy = fields.IntField(required=True)
    reported_at = fields.DateTimeField(required=True)
    comment = fields.StringField(required=False)
    avatar = fields.StringField(required=False)

    def serialize_reported_at(self, timezone='Europe/Madrid'):
        current_tz = pytz.timezone(timezone)
        reported_at = self.reported_at.replace(tzinfo=pytz.utc).astimezone(current_tz)
        return '{datetime:%d-%m-%Y %H:%M:%S}'.format(datetime=reported_at)

    def serialize(self):
        return {
            'username': self.name,
            'realname': self.realname,
            'happinnes': self.happy,
            'reported_at': self.serialize_reported_at(),
            'comment': self.comment,
            'avatar': self.avatar
        }
