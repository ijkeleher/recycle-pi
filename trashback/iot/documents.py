from elasticsearch_dsl import analyzer

from django_elasticsearch_dsl import DocType, Index, fields
from elasticsearch_dsl import connections

from .models import Measurement, Device

connections.create_connection(alias='default', http_auth=(
    'elastic', 'hR6DNpugI77mueYKNBEulFH3'), hosts=["https://d284504808e347ccb2779337f23759e2.ap-southeast-2.aws.found.io:9243"])

measurement_index = Index('measurements')
measurement_index.settings(
    number_of_shards=1,
    number_of_replicas=0
)


@measurement_index.doc_type
class MeasurementDocument(DocType):
    """Article elasticsearch document"""

    id = fields.StringField(attr='id')
    key = fields.StringField()
    value = fields.TextField()
    location = fields.TextField()
    device = fields.StringField(attr='device_id')
    time = fields.IntegerField()

    class Meta:
        model = Measurement


device_index = Index('device')
device_index.settings(
    number_of_shards=1,
    number_of_replicas=0
)


@device_index.doc_type
class DeviceDocument(DocType):
    id = fields.StringField(attr='id')
    name = fields.StringField()
    location = fields.TextField()
    owner = fields.TextField()

    class Meta:
        model = Device
