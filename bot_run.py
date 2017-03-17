# -*- coding: utf-8 -*-

import config

from mongoengine import connect
from bot import Nemesis

connect(config.mongodb)


Nemesis(config.token_slack).read()
