# -*- coding: utf-8 -*-

import json

from bottle import request, route

from api.utils import authorize
from models.user import UserSlack


@route('/users/', method='GET')
@authorize(request)
def users():
    users = []
    for user in UserSlack.objects.all():
        users.append(user.serialize())
    return json.dumps(users)
