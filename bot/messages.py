# -*- coding: utf-8 -*-

from common.utils import get_options

initial = u'Hi! How do you feeling today?\n'
options = get_options()

example = 'ex, 3: I am tired'
help = u'use (x: comments)'

poll = '{}{}{}'.format(initial, options, example)
dashboard = u' http://localhost/'
success = u'Thank you! {dashboard}'.format(dashboard=dashboard)
