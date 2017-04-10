# -*- coding: utf-8 -*-
import json

from bottle import request, route

from api.utils import authorize
from models.user import UserSlack
from api.serializers.user import UserSlackListSerializer


@route('/users/', method='GET')
@authorize(request)
def users():
    query = UserSlack.objects()
    return json.dumps(UserSlackListSerializer(query).serialize())
