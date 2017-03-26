# -*- coding: utf-8 -*-

from nemesis.common.utils import load_options
from nemesis.common.utils import set_logger
from nemesis.common.utils import mongo_connect


def main():
    load_options()

    set_logger()

    mongo_connect()

    from nemesis.bot.bot import Nemesis
    Nemesis().read()


if __name__ == "__main__":
    main()
