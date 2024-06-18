# Generated by Django 5.0.6 on 2024-06-18 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance_tracker', '0006_transaction_recurring_transaction_recurring_interval_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='income',
            name='category',
            field=models.PositiveSmallIntegerField(choices=[('Salary', 'Salary'), ('Gift', 'Gift'), ('Other', 'Other')], default='Other'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='category',
            field=models.PositiveSmallIntegerField(choices=[('Food', 'Food'), ('Transport', 'Transport'), ('Rent', 'Rent'), ('Bills', 'Bills'), ('Health', 'Health'), ('Fun', 'Fun'), ('Charity', 'Charity'), ('Other', 'Other')], default='Other'),
        ),
    ]