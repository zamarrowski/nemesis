# -*- coding: utf-8 -*-

import pytz
import json

from datetime import datetime

from slackclient import SlackClient
from bottle import request, abort, response, hook, route

from nemesis.common import constants
from nemesis.common.config import options
from nemesis.models.models import UserSlack, UserStatusReport


@hook('after_request')
def set_response():

    response.content_type = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Authorization, Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


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


@route('/last-reports/<user>/', method='GET')
@authorize(request)
def last_user_reports(user):
    user = UserSlack.get_user(user)
    if user is None:
        abort(400)
    result = user.serialize()

    query = UserStatusReport.objects.filter(user=user)
    query = query.order_by('-reported_at')[0:constants.MAX_LAST_REPORTS]
    result.update({'status_avg': query.average('status')})
    reports = []
    for status in query:
        reports.append(status.serialize())
    result.update({'reports': reports})

    return json.dumps(result)


@route('/last-reports/', method='GET')
@authorize(request)
def last_reports():
    query = UserStatusReport.objects.all()

    reports = []
    for status in query.order_by('-reported_at')[0:constants.MAX_LAST_REPORTS]:
        reports.append(status.serialize(user=True))

    return json.dumps(reports)


@route('/users/', method='GET')
@authorize(request)
def users():
    users = []
    for user in UserSlack.objects.all():
        users.append(user.serialize())
    return json.dumps(users)


def get_utc_from_str(dt_str):
    dt = datetime.strptime(dt_str, '%d-%m-%Y')
    current_tz = pytz.timezone(options.nemesis_timezone)
    return current_tz.localize(dt)


@route('/users-reports/', method='GET')
@authorize(request)
def users_reports():
    users = request.query.users.split(',')
    start_date = get_utc_from_str(request.query.start_date)
    end_date = get_utc_from_str(request.query.end_date)

    users = UserSlack.objects.filter(slack_id__in=users)
    query = UserStatusReport.objects.filter(reported_at__gte=start_date)
    query = query.filter(reported_at__lte=end_date)

    global_reports = {'global_status_avg': query.average('status'), 'users_reports': []}
    for user in users:
        user_query = query.filter(user=user)
        report = {'user_avg': user_query.average('status'), 'user': user.serialize(), 'reports': []}
        for user_report in user_query.filter(user=user).order_by('-reported_at'):
            report['reports'].append(user_report.serialize())
        global_reports['users_reports'].append(report)

    return json.dumps(global_reports)
