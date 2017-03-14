# -*- coding: utf-8 -*-


from mongoengine import DynamicDocument, fields

class User(DynamicDocument):
    slack_id = fields.StringField(required=False)
    name = fields.StringField(required=True)


class HappyUserHistoric(DynamicDocument):
    user = fields.ReferenceFIeld(User, required=True)
    happy = fields.IntField(required=True)
    date = fields.DateTimeField(required=True)
