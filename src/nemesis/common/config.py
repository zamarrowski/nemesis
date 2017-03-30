# -*- coding: utf-8 -*-

from configparser import ConfigParser


class Options(object):

    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls, *args, **kwargs)

        return cls._instance

    def load(self, config_file):
        configparser = ConfigParser()
        configparser.optionxform = str
        configparser.read_file(open(config_file))

        self.parse_options(configparser)

    def parse_options(self, raw_options):
        for item_name, item_section in raw_options.items():
            for key, value in raw_options.items(item_name):
                attr_name = '{item}_{key}'.format(item=item_name, key=key)
                setattr(self, attr_name, value)

options = Options()
