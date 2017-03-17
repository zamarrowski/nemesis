# -*- coding: utf-8 -*-

import config
import api

from mongoengine import connect
from bottle import run, response

connect(config.mongodb)

response.content_type = 'application/json'

run(host='localhost', port=8080)
