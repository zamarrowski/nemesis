# -*- coding: utf-8 -*-

import time
import datetime

from mongoengine import connect
from slackclient import SlackClient

from models import HappyUserHistoric

token = 'xoxb-154931849507-HRrjXZGiKIS4FJEBwEPf7dqR'


connect('nemesis')


class Nemesis():

    def __init__(self, token_slack):
        self.slack_client = SlackClient(token_slack)
        self.slack_connect()

    def slack_connect(self):
        if self.slack_client.rtm_connect():
            print("Conectado")
            while True:
                for event in self.slack_client.rtm_read():
                    print(event)
                    try:
                        self.detect_user_login(event)
                        self.read_message_user(event)
                        time.sleep(0.5)
                    except KeyboardInterrupt:
                        print("Desconectado")
                        break
        else:
            print("Ups, algo fue mal...")

    def its_for_me(self, event):
        if event['type'] == 'message':
            channel = self.slack_client.api_call("channels.info", channel=event['channel'])
            if channel['ok'] is False and event['user'] != 'U4JTDQZEX':
                return True

    def detect_user_login(self, event):
        if event['type'] == 'presence_change' and event['presence'] == 'active':
            self.slack_client.api_call("chat.postMessage", channel=event['user'],
                                       text='ola ke ase?\n 1. uffff\n 2. meh\n 3. great', as_user=True)

    def read_message_user(self, event):
        if self.its_for_me(event):
            if event['text'] in ['1', '2', '3']:
                print(self.user_happiness_today(event['user']))
                if self.user_happiness_today(event['user']) is not True:
                    happy = self.save_hapiness(event['user'], int(event['text']))
                    if happy:
                        self.slack_client.api_call("chat.postMessage", channel=event['user'],
                                                   text=':+1:', as_user=True)
                    else:
                        self.slack_client.api_call("chat.postMessage", channel=event['user'],
                                                   text='tu felicidad hoy es .', as_user=True)
            else:
                self.slack_client.api_call("chat.postMessage", channel=event['user'],
                                           text='de momento soy un poco tonto, dime 1, 2 o 3?', as_user=True)

    def user_happiness_today(self, user):
        midnight = datetime.datetime.combine(datetime.datetime.utcnow().date(), datetime.time(0))
        tomorrow_midnight = datetime.datetime.combine(datetime.datetime.utcnow().date() + datetime.timedelta(days=1), datetime.time(0))
        if len(HappyUserHistoric.objects.filter(user=user, date__gte=midnight).filter(date__lte=tomorrow_midnight)) > 0:
            return True

    def save_hapiness(self, user, happiness):
        user = self.get_user_info(user)
        return HappyUserHistoric(user=user['user'], name=user['username'], avatar=user['avatar'], realname=user['realname'], happy=happiness, reported_at=datetime.datetime.utcnow()).save()

    def get_user_info(self, user):
        user = self.slack_client.api_call("users.info", user=user)['user']
        return {
            'user': user['id'],
            'username': user['name'],
            'avatar': user['profile']['image_48'],
            'realname': user['real_name']
        }

Nemesis(token)
