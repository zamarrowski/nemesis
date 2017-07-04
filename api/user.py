# -*- coding: utf-8 -*-
import json

from bottle import request, route

from api.utils import authorize
from models.user import UserSlack
from bot.nemesis import Nemesis
from api.serializers.user import UserSlackListSerializer


@route('/users/', method=['GET', 'POST'])
@authorize(request)
def users():
    if request.method == 'GET':
        _all = request.query.all
        if _all is not '':
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
    else:
        users = request.json['users']
        user_ids = []
        for user in users:
            user_ids.append(UserSlack.get(Nemesis().get_user_info(user), create=True).slack_id)

        UserSlack.objects.filter(slack_id__in=user_ids).values_list('slack_id').update(active=True)
        UserSlack.objects.filter(slack_id__nin=user_ids).values_list('slack_id').update(active=False)
        return


def serialize_user(user):
    return {
        'slack_id': user['id'],
        'username': user['name'],
        'avatar': user['profile']['image_192'],
        'realname': user['profile']['real_name'],
        'active': False
    }
