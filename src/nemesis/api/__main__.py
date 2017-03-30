# -*- coding: utf-8 -*-

from bottle import run

from nemesis.common.config import options
from nemesis.common.utils import load_options
from nemesis.common.utils import set_logger
from nemesis.common.utils import mongo_connect


def main():
    load_options()
    set_logger()
    mongo_connect()

    from nemesis.api import api
    run(host=options.api_host, port=options.api_port)


if __name__ == "__main__":
    main()
