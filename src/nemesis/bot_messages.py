# -*- coding: utf-8 -*-

from nemesis import constants


def get_login_message():
    initial_message = u'¡Buenos días! ¿Cómo te encuentras hoy?\n'

    for status in constants.USER_STATUS:
        initial_message += str(status[0]) + '. ' + status[1] + '\n'
    initial_message += 'ejemplo; 3: estoy cansado'
    return initial_message


login_message = get_login_message()

help_message = u'use (X: comments)'

dashboard = u' http://localhost:8080/last-reports/'

success_message = u'Muchas gracias! Recuerda que puedes ver el estado'
success_message += 'de felicidad de tus compañeros en el siguiente enlace\n {dashboard}'.format(dashboard=dashboard)
