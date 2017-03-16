# -*- coding: utf-8 -*-

from mongoengine import DynamicDocument, fields


class HappyUserHistoric(DynamicDocument):
    user = fields.StringField(required=True)
    name = fields.StringField(required=True)
    realname = fields.StringField(required=True)
    happy = fields.IntField(required=True)
    reported_at = fields.DateTimeField(required=True)
    comment = fields.StringField(required=False)

    def serialize_reported_at(self):
        current_tz = pytz.timezone(timezone)
        timestamp = self.timestamp.replace(tzinfo=pytz.utc).astimezone(current_tz)
        return '{datetime:%d-%m-%Y %H:%M:%S}'.format(datetime=timestamp)

    def serialize(self):
        return {
            'username': self.user,
            'happinnes': self.happy,
            'realname': self.realname,
            'reported_at': ,
            'comment': self.comment,
            'avatar': self.avatar
        }
