from elasticsearch_dsl import analyzer

from django_elasticsearch_dsl import DocType, Index, fields

from .models import Measurement, Device

measurement_index = Index('measurement')
measurement_index.settings(
    number_of_shards=1,
    number_of_replicas=0
)

html_strip = analyzer(
    'html_strip',
    tokenizer="standard",
    filter=["standard", "lowercase", "stop", "snowball"],
    char_filter=["html_strip"]
)


@measurement_index.doc_type
class MeasurementDocument(DocType):
    """Article elasticsearch document"""

    id = fields.IntegerField(attr='id')
    key = fields.StringField()
    value = fields.TextField()
    location = fields.TextField()
    device = fields.IntegerField(attr='device_id')
    time = fields.IntegerField()

    class Meta:
        model = Measurement
