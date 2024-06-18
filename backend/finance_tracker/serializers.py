from rest_framework import serializers
from .models import Transaction, Income, Outcome, Balance

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        extra_kwargs = {"author": {"read_only": True}}

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ['id', 'amount', 'category', 'created_at', 'description', 'author', 'repetitive', 'repetition_interval']
        extra_kwargs = {"author": {"read_only": True}}

class OutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outcome
        fields = ['id', 'amount', 'category', 'created_at', 'description', 'author', 'repetitive', 'repetition_interval']
        extra_kwargs = {"author": {"read_only": True}}

class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ['id', 'amount', 'category', 'created_at', 'description', 'author']
        extra_kwargs = {"author": {"read_only": True}}
