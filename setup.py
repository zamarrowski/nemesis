# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

import os

here = os.path.abspath(os.path.dirname(__file__))
readme = open(os.path.join(here, 'README.md'), encoding='utf-8').read()

setup(
    # Package info
    name='nemesis',
    version='0.1.0',
    description='Slackbot that track the hapiness of your team',
    author='authors',
    author_email='mails',
    url='',
    long_description=readme,

    # Package classifiers
    classifiers=[
        'Programming Language :: Python :: 3.6',
        'Natural Language :: Spanish',
        'Operating System :: POSIX',
        'Programming Language :: Python :: Implementation :: CPython',
    ],

    # Package structure
    packages=find_packages('src', exclude=['ez_setup', '*.tests', '*.tests.*', 'tests.*', 'tests']),
    package_dir={'': 'src'},
    include_package_data=True,
    zip_safe=False,

    # Dependencies
    install_requires=open('requirements.txt', 'r').read().splitlines(),
    entry_points={
        'console_scripts': [
            'nemesis_bot = nemesis.bot:main',
            'nemesis_api = nemesis.api:main',
        ],
    }
)
