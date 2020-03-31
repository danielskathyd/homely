# Generated by Django 3.0.4 on 2020-03-29 16:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('homely', '0003_auto_20200329_0313'),
    ]

    operations = [
        migrations.AlterField(
            model_name='personaltodo',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ptodo_set', to=settings.AUTH_USER_MODEL, to_field='username'),
        ),
    ]