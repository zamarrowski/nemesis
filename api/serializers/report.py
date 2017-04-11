# -*- coding: utf-8 -*-

from api.serializers.model import Serializer, ListSerializer


class UserStatusReportSerializer(Serializer):

    class Meta:
        fields = ('user', 'comments', 'status_str', 'status', 'reported', )


class UserStatusReportCompleteListSerializer(ListSerializer):

    class Meta:
        fields = ('user', 'comments', 'status_str', 'status', 'reported', )


class UserStatusReportListSerializer(ListSerializer):

    class Meta:
        fields = ('comments', 'status_str', 'status', 'reported', )
