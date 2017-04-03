# -*- coding: utf-8 -*-

from bottle import run

from common.config import options
from common.utils import load_options
from common.utils import set_logger
from common.utils import mongo_connect


def main():
    load_options()
    set_logger()
    mongo_connect()

    from api import user, report, utils
    run(server='tornado', host=options.api_host, port=options.api_port)


if __name__ == "__main__":
    main()
