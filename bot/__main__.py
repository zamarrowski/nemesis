# -*- coding: utf-8 -*-

from common.utils import load_options
from common.utils import set_logger
from common.utils import mongo_connect


def main():
    load_options()

    set_logger()

    mongo_connect()

    from bot.nemesis import Nemesis
    Nemesis().read()


if __name__ == "__main__":
    main()
