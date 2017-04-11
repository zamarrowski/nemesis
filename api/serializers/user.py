# -*- coding: utf-8 -*-

from api.serializers.model import Serializer, ListSerializer


class UserSlackSerializer(Serializer):

    class Meta:
        fields = ('slack_id', 'username', 'realname', 'avatar', )


class UserSlackListSerializer(ListSerializer):

    class Meta:
        fields = ('slack_id', 'username', 'realname', 'avatar', )
