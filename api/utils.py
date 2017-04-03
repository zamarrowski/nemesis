# -*- coding: utf-8 -*-

import pytz
import json

from datetime import datetime
from datetime import timedelta

from slackclient import SlackClient
from bottle import request, abort, response, hook, route

from common import constants
from common.config import options


def get_utc_from_str(dt_str):
    dt = datetime.strptime(dt_str, '%d-%m-%Y')
    current_tz = pytz.timezone(options.nemesis_timezone)
    return current_tz.localize(dt)


def get_all_dates(start_date, end_date):
    delta_date = end_date - start_date
    labels = []
    for i in range(delta_date.days + 1):
        labels.append(start_date + timedelta(days=i))
    return labels


def get_labels(all_dates, timezone=options.nemesis_timezone):
    current_tz = pytz.timezone(timezone)
    labels = []
    for day in all_dates:
        label = day.replace(tzinfo=pytz.utc).astimezone(current_tz)
        labels.append('{datetime:%d-%m-%Y}'.format(datetime=label))
    return labels


@hook('after_request')
def set_response():

    response.content_type = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Authorization, Origin, Accept, \
                                                        Content-Type, X-Requested-With, X-CSRF-Token'


def authorize(request):
    def check_token(api_func):
        def wrapper(**kwds):
            auth_token = request.headers.get('Authorization')
            if auth_token is not None:
                res = SlackClient(auth_token).api_call("users.identity", scope=constants.OAUTH_SCOPE)
                if res['ok'] is False:
                    abort(401, "Not authorized")
                return api_func(**kwds)
            else:
                abort(401, "Not authorized")
        return wrapper
    return check_token


@route('/', method='OPTIONS')
@route('/<path:path>', method='OPTIONS')
def options_handler(path=None):
    return


@route("/auth-token/", method='GET')
def auth_token():

    auth_code = request.query.code

    slack_client = SlackClient("")
    auth_response = slack_client.api_call(
        "oauth.access",
        client_id=options.slack_client_id,
        client_secret=options.slack_client_secret,
        code=auth_code
    )

    return json.dumps(auth_response)
