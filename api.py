# -*- coding: utf-8 -*-

import json

from bottle import route, run, template, response
from models import HappyUserHistoric

from mongoengine import connect

connect('nemesis')

response.content_type = 'application/json'

@route('/last-reports/')
def index():
    reports = []
    for happy in HappyUserHistoric.objects.all()[0:10]:
        reports.append(happy.serialize())
    return json.dumps(reports)


run(host='localhost', port=8080)
