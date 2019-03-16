import requests
import datetime

BASE_URL = "http://rpi.hazelfire.net/iot"


class IotAPI:
    def post_measurement(self, deviceId, key, value):
        response = requests.post(BASE_URL + "/measurements/", json={
            'device': deviceId,
            'key': key,
            'value': value,
            'time': datetime.datetime.now().isoformat() + "Z"
        })
       # print(response.text)
