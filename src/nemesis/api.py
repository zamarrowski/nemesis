# -*- coding: utf-8 -*-

import pytz
import json

from datetime import datetime

from slackclient import SlackClient
from bottle import get, request, abort, response

from nemesis import constants
from nemesis.config import options
from nemesis.models import UserSlack, UserStatusReport


def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.content_type = 'application/json'
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors


def authorize(request):
    def check_token(api_func):
        def wrapper(**kwds):
            auth_token = request.headers.get('Token')
            if auth_token is not None:
                res = SlackClient(auth_token).api_call("users.identity", scope=constants.OAUTH_SCOPE)
                if res['ok'] is False:
                    abort(401, "Not authorized")
                return api_func(**kwds)
            else:
                abort(401, "Not authorized")
        return wrapper
    return check_token


@get("/auth-token/")
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


@get('/last-reports/')
@get('/last-reports/<user>/')
@authorize(request)
@enable_cors
def last_reports(user=None):
    query = UserStatusReport.objects.all()
    if user is not None:
        user = UserSlack.get_user(user)
        if user is None:
            return json.dumps([])
        query = query.filter(user=user)

    reports = []
    for status in query.order_by('-reported_at')[0:constants.MAX_LAST_REPORTS]:
        reports.append(status.serialize())

    return json.dumps(reports)


@get('/users/')
@authorize(request)
@enable_cors
def users():
    users = []
    for user in UserSlack.objects.all():
        users.append(user.serialize())
    return json.dumps(users)


def get_utc_from_str(dt_str):
    dt = datetime.strptime(dt_str, '%d-%m-%Y')
    current_tz = pytz.timezone(options.nemesis_timezone)
    return current_tz.localize(dt)


@get('/users-reports/')
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
        query = query.filter(user=user)
        report = {'user_avg': query.average('status'), 'reports': []}
        for user_report in query.filter(user=user).order_by('-reported_at'):
            report['reports'].append(user_report.serialize())
        global_reports['users_reports'].append(report)

    return json.dumps(global_reports)
