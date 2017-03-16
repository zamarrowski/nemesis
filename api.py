# -*- coding: utf-8 -*-

from bottle import route, run, template
from models import HappyUserHistoric


@route('/last-reports/')
def index():
    return template('<b>Hello {{name}}</b>!', name=name)

run(host='localhost', port=8080)
