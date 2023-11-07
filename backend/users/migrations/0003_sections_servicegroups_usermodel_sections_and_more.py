# Generated by Django 4.2.6 on 2023-11-07 17:42

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_usermodel_username_alter_usermodel_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sections',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('learn_id', models.TextField()),
                ('term', models.IntegerField(choices=[(0, 'Winter'), (1, 'Spring'), (2, 'Fall')])),
                ('year', models.IntegerField()),
            ],
            options={
                'verbose_name': 'Section',
                'verbose_name_plural': 'Sections',
                'db_table': 'Sections',
            },
        ),
        migrations.CreateModel(
            name='ServiceGroups',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.TextField()),
            ],
            options={
                'verbose_name': 'Service Group',
                'verbose_name_plural': 'Service Groups',
                'db_table': 'ServiceGroups',
            },
        ),
        migrations.AddField(
            model_name='usermodel',
            name='sections',
            field=models.ManyToManyField(to='users.sections'),
        ),
        migrations.AddField(
            model_name='usermodel',
            name='service_groups',
            field=models.ManyToManyField(to='users.servicegroups'),
        ),
    ]