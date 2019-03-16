import requests
from datetime import datetime
import uuid

BASE_URL = "https://d284504808e347ccb2779337f23759e2.ap-southeast-2.aws.found.io:9243"


def main():
    response = requests.post(BASE_URL + "/measurements/doc/", json={
        'id': uuid.uuid1().int >> 64,
        'device': "3",
        'key': "trashType",
        'value': "paper",
        'time': datetime.now().isoformat() + "Z",
        'location': "Melbourne, Australia"
    }, auth=('elastic', 'hR6DNpugI77mueYKNBEulFH3'))
    print(response.text)

    response = requests.post(BASE_URL + "/devices/doc/", json={
        'id': int(uuid.uuid1().int) & (1 << 32) - 1,
        'name': "firstdevice",
        'owner': 1,
    }, auth=('elastic', 'hR6DNpugI77mueYKNBEulFH3'))
    print(response.text)


if __name__ == "__main__":
    main()
