"""
Data migration: Cập nhật domain cho Django Sites framework.
Cần thiết để sitemap.xml hiển thị đúng domain sualaptopphuquoc.vn
"""

from django.db import migrations


def update_site_domain(apps, schema_editor):
    Site = apps.get_model('sites', 'Site')
    Site.objects.update_or_create(
        id=1,
        defaults={
            'domain': 'sualaptopphuquoc.vn',
            'name': 'Laptop Phú Quốc',
        }
    )


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_remove_siteconfig_logo_url_siteconfig_logo_and_more'),
        ('sites', '0002_alter_domain_unique'),
    ]

    operations = [
        migrations.RunPython(update_site_domain, migrations.RunPython.noop),
    ]
