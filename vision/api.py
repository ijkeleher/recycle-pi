import requests
from datetime import datetime
import uuid

BASE_URL = "https://d284504808e347ccb2779337f23759e2.ap-southeast-2.aws.found.io:9243"


class IotAPI:
    def post_measurement(self, deviceId, key, value):
        response = requests.post(BASE_URL + "/measurements/doc/", json={
            'id': int(uuid.uuid1().int) & (1 << 32) - 1,
            'device': deviceId,
            'key': key,
            'value': value,
            'time': datetime.now().isoformat() + "Z",
            'location': "Melbourne, Australia",
        }, auth=('elastic', 'hR6DNpugI77mueYKNBEulFH3'))
        print(response.text)
