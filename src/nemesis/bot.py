# -*- coding: utf-8 -*-

import time
import logging

from slackclient import SlackClient

from nemesis import constants
from nemesis import bot_messages

from nemesis.config import options
from nemesis.models import UserSlack
from nemesis.models import UserStatusReport


class SlackClientNemesis(object):

    def get_channel_info(self, channel):
        return self.slack_client.api_call("channels.info", channel=channel)

    def post_message(self, channel, text):
        self.slack_client.api_call("chat.postMessage", channel=channel, text=text, as_user=True)

    def get_user_info(self, user):
        user = self.slack_client.api_call("users.info", user=user)['user']
        return {
            'slack_id': user['id'],
            'username': user['name'],
            'avatar': user['profile']['image_48'],
            'realname': user['real_name']
        }


class Nemesis(SlackClientNemesis):

    def __init__(self):
        self.token = options.bot_token_slack
        self.slack_client = SlackClient(self.token)

    def read(self):
        self.slack_connect()

    def slack_connect(self):
        if self.slack_client.rtm_connect():
            logging.info('Connected to Nemesis bot')
            while True:
                try:
                    for event in self.slack_client.rtm_read():
                        logging.debug(event)
                        event_type = self.get_event_type(event)
                        if event_type == 'user_login' and UserSlack.has_user_reported(event['user']) is False:
                            self.post_message(event['user'], bot_messages.login_message)
                        elif event_type == 'user_post_message':
                            status, comments = UserStatusReport.get_status(event['text'])
                            if status is not None:
                                self.user_report_status(event['user'], status, comments)
                            else:
                                self.post_message(event['user'], text=bot_messages.help_message)
                        time.sleep(0.5)
                except KeyboardInterrupt:
                    logging.info('Disconnected. Bye bye Nemesis')
                    break
        else:
            logging.error('Cannot connect to Nemesis bot. Is the token correct?')

    def get_event_type(self, event):
        if event['type'] == 'message':
            channel = self.get_channel_info(event['channel'])
            if channel['ok'] is False and event['user'] != constants.BOT_USER:
                return 'user_post_message'
        if event['type'] == 'presence_change' and event['presence'] == 'active':
            return 'user_login'

    def user_report_status(self, user, status, comments=None):
        UserSlack.report_status(self.get_user_info(user), status, comments)
        self.post_message(user, text=bot_messages.success_message)
