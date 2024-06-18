# Generated by Django 5.0.6 on 2024-06-18 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance_tracker', '0005_alter_balance_author_alter_income_author_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='recurring',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='transaction',
            name='recurring_interval',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Daily'), (2, 'Weekly'), (3, 'Monthly'), (4, 'Yearly'), (5, 'None')], default=5),
        ),
        migrations.AddField(
            model_name='transaction',
            name='transaction_type',
            field=models.CharField(choices=[('Income', 'Income'), ('Expense', 'Expense')], default='', max_length=7),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='category',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Food'), (2, 'Transport'), (3, 'Rent'), (4, 'Bills'), (5, 'Health'), (6, 'Fun'), (7, 'Charity'), (8, 'Other')], default=8),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='created_at',
            field=models.DateField(auto_now_add=True),
        ),
    ]