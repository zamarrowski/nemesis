# Nemesis
A Slack Bot that tracks the happiness of your team :)
https://zamarrowski.github.io/nemesis/

## Requirements:

* Create a Slack App: https://api.slack.com/apps/new
* Create a Slack Bot: https://my.slack.com/services/new/bot
* Slack Client Id (Provided when you create the app)
* Slack Client Secret (Provided when you create the app)
* Slack Bot API Token (Provided when you create the bot)
* Prepare redirect URI (https://api.slack.com/docs/sign-in-with-slack#create_slack_app)

## Configuration

Open and edit nemesis.cfg with your slack info:
```
[slack]
token_bot_slack=SLACK_BOT_API_TOKEN
client_id=SLACK_CLIENT_ID
client_secret=SLACK_CLIENT_SECRENT
```
You can also configure another fields as mongodb user or what you want.

Open dashboard/src/config.js file and replace clientId with your clientId:

```
export default {
  baseService: 'http://localhost:8080',
  clientId: 'clientId'
}

```
If you are going to deploy with docker you should not change anything else.

## Deploy with Docker

Execute ```docker-compose up``` in root directory. When docker-compose has finished you need to create a user in mongodb.
If you have not modify the mongodb user in nemesis.cfg you would do something like this in the terminal (assuming you have installed mongodb client).

```
mongo
use nemesis
db.createUser({ user: "nemesis", pwd: "nemesis", roles: ["readWrite"] })
```

* Nemesis-Dashboard is running in: http://localhost
* Nemesis-API is running in: http://localhost:8080
* Nemesis-Bot is running in your Slack!
* MongoDB is running in 27017

## Modify Nemesis messages:

Open ```src/nemesis/common/constants.py``` and modify:

```
USER_STATUS = (
        (1, 'really bad :disappointed:'),
        (2, 'a bit down :pensive:'),
        (3, 'normal :neutral_face:'),
        (4, 'alright :slightly_smiling_face:'),
        (5, 'awesome :smile:')
)
```

## How to contribute:

We love feedback so feel free to open issues (https://github.com/zamarrowski/nemesis/issues) or Pull Request.
