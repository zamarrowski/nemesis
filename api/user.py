# -*- coding: utf-8 -*-
import json

from bottle import request, route

from api.utils import authorize
from models.user import UserSlack
from bot.nemesis import Nemesis
from api.serializers.user import UserSlackListSerializer


@route('/users/', method='GET')
@authorize(request)
def users():
    _all = request.query.all
    if _all is not None:
        _all = json.loads(_all)
    if _all is True:
        users = Nemesis().get_users()
        ids = [user['id'] for user in users]
        query = UserSlack.objects.filter(slack_id__in=ids)
        my_ids = query.values_list('slack_id')
        data = UserSlackListSerializer(query).serialize()
        for user in users:
            if user['id'] not in my_ids:
                data.append(serialize_user(user))
        return json.dumps(data)
    query = UserSlack.objects()
    return json.dumps(UserSlackListSerializer(query).serialize())


def serialize_user(user):
    return {
        'slack_id': user['id'],
        'username': user['name'],
        'avatar': user['profile']['image_192'],
        'realname': user['profile']['real_name'],
        'active': False
    }
