# -*- coding: utf-8 -*-

import time
import logging

from slackclient import SlackClient

from bot import messages
from common.config import options
from models.user import UserSlack


class SlackClientNemesis(object):

    def get_bot_info(self):
        bot_info = self.slack_client.api_call("auth.test")
        if 'ok' in bot_info and bot_info['ok'] is True:
            return bot_info['user_id']
        return None

    def get_channel_info(self, channel):
        return self.slack_client.api_call("channels.info", channel=channel)

    def post_message(self, channel, text):
        self.slack_client.api_call("chat.postMessage", channel=channel, text=text, as_user=True)

    def get_user_info(self, user):
        user = self.slack_client.api_call("users.info", user=user)['user']
        return {
            'slack_id': user['id'],
            'username': user['name'],
            'avatar': user['profile']['image_192'],
            'realname': user['real_name']
        }


class Nemesis(SlackClientNemesis):

    def __init__(self):
        self.token = options.slack_token_bot_slack
        self.slack_client = SlackClient(self.token)
        self.bot_id = self.get_bot_info()

    def read(self):
        self.slack_connect()

    def slack_connect(self):
        if self.slack_client.rtm_connect():
            print('Connected to Nemesis bot')
            logging.info('Connected to Nemesis bot')
            while True:
                try:
                    for event in self.slack_client.rtm_read():
                        logging.debug(event)
                        event_type = self.handler_event(event)
                        if 'user' in event:
                            user = UserSlack.get(self.get_user_info(event['user']), create=True)
                            if event_type == 'user_login' and user.get_current_report() is None:
                                self.post_message(event['user'], messages.poll)
                            elif event_type == 'user_message':
                                status, comments = self.get_status(event['text'])
                                if status is not None:
                                    user.update_report(**{'status': status, 'comments': comments})
                                    self.post_message(event['user'], text=messages.success)
                                else:
                                    self.post_message(event['user'], text=messages.help)
                        time.sleep(0.3)
                except KeyboardInterrupt:
                    logging.info('Disconnected. Bye bye Nemesis')
                    break
                except Exception:
                    logging.exception("message")
        else:
            logging.error('Cannot connect to Nemesis bot. Is the token correct?')

    def handler_event(self, event):
        if event['type'] == 'message':
            channel = self.get_channel_info(event['channel'])
            if channel['ok'] is False and event['user'] != self.bot_id:
                return 'user_message'
        if event['type'] == 'presence_change' and event['presence'] == 'active':
            return 'user_login'

    def user_report_status(self, user, status, comments=None):
        UserSlack.report_status(self.get_user_info(user), status, comments)
        self.post_message(user, text=messages.success)

    @staticmethod
    def get_status(text):
        text = text.split(':')
        status = text[0]
        if status.isdigit() is False or int(status) not in range(1, 6):
            return None, None
        comments = None
        if len(text) > 1:
            comments = text[1]
            return int(status), comments
