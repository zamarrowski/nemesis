# -*- coding: utf-8 -*-

import json

from datetime import timedelta

from bottle import request, abort, route

from api.utils import authorize
from api.utils import get_labels, get_all_dates, get_utc_from_str
from api.serializers.user import UserSlackSerializer
from api.serializers.report import UserStatusReportListSerializer, UserStatusReportCompleteListSerializer
from common import constants
from models.user import UserSlack
from models.report import UserStatusReport


@route('/last-reports/', method='GET')
@authorize(request)
def last_reports():
    query = UserStatusReport.objects.all()[0:constants.MAX_LAST_REPORTS]
    return json.dumps(UserStatusReportCompleteListSerializer(query).serialize())


@route('/last-reports/<user>/', method='GET')
@authorize(request)
def last_user_reports(user):
    user = UserSlack.get({'slack_id': user})
    if user is None:
        abort(400)
    result = UserSlackSerializer(user).serialize()

    query = UserStatusReport.objects.filter(user=user)
    query = query.order_by('reported_at')[0:constants.MAX_LAST_REPORTS]
    result.update({'status_avg': query.average('status')})
    result.update({'reports': UserStatusReportListSerializer(query).serialize()})
    return json.dumps(result)


@route('/users-reports/', method='GET')
@authorize(request)
def users_reports():
    users = request.query.users.split(',')
    start_date = get_utc_from_str(request.query.start_date)
    end_date = get_utc_from_str(request.query.end_date) + timedelta(days=1)
    all_dates = get_all_dates(start_date, end_date)

    users = UserSlack.objects.filter(slack_id__in=users)
    query = UserStatusReport.objects.filter(reported_at__gte=start_date)
    query = query.filter(reported_at__lte=end_date)
    query = query.filter(user__in=users)

    global_reports = {
        'global_status_avg': query.average('status'),
        'users_reports': [],
        'labels': get_labels(all_dates)
    }

    for user in users:
        user_query = query.filter(user=user)
        report = {
            'user_avg': user_query.average('status'),
            'user': UserSlackSerializer(user).serialize(),
            'reports': [],
            'status': []
        }
        report['reports'] = UserStatusReportListSerializer(user_query).serialize()
        for label in all_dates:
            user_report = user.get_report(label)
            report['status'].append(user_report.status if user_report is not None else 0)
        global_reports['users_reports'].append(report)

    return json.dumps(global_reports)
