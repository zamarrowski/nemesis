# -*- coding: utf-8 -*-

import logging
import argparse

from mongoengine import connect

from common.config import options


def load_options():

    parser = argparse.ArgumentParser(description='Nemesis parser')
    parser.add_argument('--conf', action='store', required=True, help='path to config file')
    args = parser.parse_args()

    options.load(args.conf)


def set_logger():
    log_file = options.nemesis_log_file
    fmt = '[%(asctime)s] nemesis %(name)s (%(levelname)s): %(message)s'
    date_format = '%Y-%m-%d %H:%M:%S'
    logging.basicConfig(filename=log_file, format=fmt, datefmt=date_format, level=logging.DEBUG)


def mongo_connect():
    connect(
        db=options.mongodb_db,
        username=options.mongodb_username,
        password=options.mongodb_password,
        host=options.mongodb_host,
        port=int(options.mongodb_port),
        authentication_source=options.mongodb_auth_database
    )
