from google.cloud import automl_v1beta1 as automl
from api import IotAPI

class Item:
    def __init__(self, name, score):
        self.name = name
        self.score = score

def evaluate():
    project_id = 'recycle-pi'
    compute_region = 'us-central1'
    model_id = 'ICN1955812788478599087'
    file_path = 'test.jpg'
    score_threshold = '0.0'

    automl_client = automl.AutoMlClient()

    model_full_id = automl_client.model_path(
        project_id, compute_region, model_id
    )

    prediction_client = automl.PredictionServiceClient()

    with open(file_path, "rb") as image_file:
        content = image_file.read()
    payload = {"image": {"image_bytes": content}}

    params = {}
    if score_threshold:
        params = {"score_threshold": score_threshold}

    response = prediction_client.predict(model_full_id, payload, params)
    print("Prediction results:")

    items = []

    for result in response.payload:
        fixed = "{:.5f}".format(result.classification.score)
        name = result.display_name
        score = fixed
        item = Item(name, score)
        items.append(item)

    sorted_items = sorted(items, key=lambda x: x.score)

    for sorted_item in sorted_items:
        print("Predicted class name: " + sorted_item.name)
        print("Predicted class score: " + sorted_item.score)

    length = len(sorted_items)
    confident = sorted_items[length - 1]

    print("\nMost confident class name: " + confident.name)
    print("Most confident class score: " + confident.score)

    condition1 = confident.name == "trash" and float(confident.score) > 0.4
    condition2 = confident.name != "trash" and  float(confident.score) <= 0.5

    
    if condition1 or condition2:
        print("Item is not recyclable.")
        recyclable = "false"
    else:
        print("Item is recyclable.")
        recyclable = "true"

    runapi = IotAPI()
    runapi.post_measurement("aaedd1f1-12f9-499b-9c5c-990147dc019a", "wasteType", confident.name)

if __name__ == '__main__':
   evaluate()
