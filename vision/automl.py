from google.cloud import automl_v1beta1 as automl
from api import IotAPI
from environs import Env
import boto3
import vlc

client = boto3.client('polly', region_name='ap-southeast-2')


class Item:
    def __init__(self, name, score):
        self.name = name
        self.score = score


def speek(text):
    response = client.synthesize_speech(
        OutputFormat='mp3',
        Text=text,
        TextType='text',
        VoiceId='Brian'
    )
    audio_stream = response['AudioStream'].read()
    response['AudioStream'].close()

    with open('temp.mp3', 'w') as f:
        f.write(audio_stream)

    vlc.MediaPlayer('temp.mp3').play()


def evaluate():
    env = Env()
    env.read_env()
    project_id = 'recycle-pi'
    compute_region = 'us-central1'
    model_id = env("ML_MODEL_ID")
    file_path = 'temp.jpg'
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

    speek("That's a " + confident.name + ", innit?")

    condition1 = confident.name == "trash" and float(confident.score) > 0.4
    condition2 = confident.name != "trash" and float(confident.score) <= 0.5

    if condition1 or condition2:
        recyclability = "Item is not recyclable."
    else:
        recyclability = "Item is recyclable."
    
    print(recyclability)
    speek(recyclability)

    runapi = IotAPI()
    runapi.post_measurement(
        "aaedd1f1-12f9-499b-9c5c-990147dc019a", "wasteType", confident.name)


if __name__ == '__main__':
    evaluate()
