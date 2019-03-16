def evaluate():
    from google.cloud import vision
    from google.cloud.vision import types
    import io
    import os

    client = vision.ImageAnnotatorClient()

    file_name = os.path.join(
        os.path.dirname(__file__),
        'test.jpg')

    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations

    print('Labels detected:')
    for label in labels:
        print(label.description)

    # returning the most confident image label
    return labels[0].description

if __name__ == '__main__':
   evaluate()
