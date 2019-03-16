class Item:
    def __init__(self, name, score):
        self.name = name
        self.score = score

project_id = 'recycle-pi'
compute_region = 'us-central1'
model_id = 'ICN1955812788478599087'
file_path = 'test.jpg'
score_threshold = '0.0'

from google.cloud import automl_v1beta1 as automl

automl_client = automl.AutoMlClient()

# Get the full path of the model.
model_full_id = automl_client.model_path(
    project_id, compute_region, model_id
)

# Create client for prediction service.
prediction_client = automl.PredictionServiceClient()

# Read the image and assign to payload.
with open(file_path, "rb") as image_file:
    content = image_file.read()
payload = {"image": {"image_bytes": content}}

# params is additional domain-specific parameters.
# score_threshold is used to filter the result
# Initialize params
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
accurate = sorted_items[length - 1]

print("\nMost confident class name: " + accurate.name)
print("Most confident class score: " + accurate.score)
