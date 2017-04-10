# -*- coding: utf-8 -*-

import json


class Serializer(object):

    def __init__(self, instance):
        self.instance = instance

    def serialize(self):
        _object = {}
        for field in self.Meta.fields:
            try:
                _object[field] = json.loads(getattr(self.instance, field).to_json())
            except AttributeError:
                _object[field] = getattr(self.instance, field)
        return _object


class ListSerializer(Serializer):

    def __init__(self, query):
        self.query = query

    def serialize(self):
        _all = []
        for instance in self.query:
            super().__init__(instance)
            _all.append(super().serialize())
        return _all
