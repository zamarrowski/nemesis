# -*- coding: utf-8 -*-

from nemesis.models.models import UserStatusReport

login_message = UserStatusReport.get_login_message()
help_message = u'use (x: comments)'
dashboard = u' http://localhost/'
success_message = u'Thank you! {dashboard}'.format(dashboard=dashboard)
