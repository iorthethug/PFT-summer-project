# Generated by Django 5.0.6 on 2024-06-18 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance_tracker', '0007_alter_income_category_alter_transaction_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='income',
            name='category',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Salary'), (2, 'Gift'), (3, 'Other')], default=3),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='category',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Food'), (2, 'Transport'), (3, 'Rent'), (4, 'Bills'), (5, 'Health'), (6, 'Fun'), (7, 'Charity'), (8, 'Other')], default=8),
        ),
    ]
