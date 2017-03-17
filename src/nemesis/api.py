# -*- coding: utf-8 -*-

import pytz
import json

from mongoengine import connect

from nemesis import config
from nemesis import constants

from datetime import datetime
from bottle import get, request
from bottle import run, response

from nemesis.models import UserSlack, UserStatusReport


@get('/last-reports/')
@get('/last-reports/<user>/')
def last_reports(user=None):
    query = UserStatusReport.objects.all()
    if user is not None:
        user = UserSlack.objects.get(slack_id=user)
        query = query.filter(user=user)

    reports = []
    for status in query.order_by('-reported_at')[0:constants.MAX_LAST_REPORTS]:
        reports.append(status.serialize())

    return json.dumps(reports)


def get_utc_from_str(dt_str):
    dt = datetime.strptime(dt_str, '%d-%m-%Y')
    current_tz = pytz.timezone(config.TIME_ZONE)
    return current_tz.localize(dt)


@get('/users-reports/')
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


def main():
    connect(config.mongodb)

    response.content_type = 'application/json'

    run(host='localhost', port=8080)
