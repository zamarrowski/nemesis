# -*- coding: utf-8 -*-

import logging
import argparse

from mongoengine import connect
from bottle import run, response

from nemesis.config import options


def main():

    parser = argparse.ArgumentParser(description='VATS Scripting executor and parser')
    parser.add_argument('--conf', action='store', required=True, help='path to config file')
    args = parser.parse_args()

    options.load(args.conf)

    log_file = options.nemesis_log_file
    fmt = '[%(asctime)s] nemesis %(name)s (%(levelname)s): %(message)s'
    date_format = '%Y-%m-%d %H:%M:%S'
    logging.basicConfig(filename=log_file, format=fmt, datefmt=date_format, level=logging.DEBUG)

    connect(
        db=options.mongodb_db,
        username=options.mongodb_username,
        password=options.mongodb_password,
        host=options.mongodb_host,
        port=int(options.mongodb_port),
        authentication_source=options.mongodb_auth_database
    )


def main_bot():
    main()

    from nemesis.bot import Nemesis
    Nemesis().read()


def main_api():

    main()

    from nemesis import api
    run(host=options.api_host, port=options.api_port)
