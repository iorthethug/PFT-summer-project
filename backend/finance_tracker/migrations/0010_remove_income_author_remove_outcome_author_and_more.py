# Generated by Django 5.0.6 on 2024-06-20 09:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('finance_tracker', '0009_alter_transaction_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='income',
            name='author',
        ),
        migrations.RemoveField(
            model_name='outcome',
            name='author',
        ),
        migrations.DeleteModel(
            name='Balance',
        ),
        migrations.DeleteModel(
            name='Income',
        ),
        migrations.DeleteModel(
            name='Outcome',
        ),
    ]
