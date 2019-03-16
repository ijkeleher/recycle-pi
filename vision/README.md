# Cloud Vision API for image labelling

### Setup for cloudvision.py and automl.py (one time)

```bash
export \
    GOOGLE_APPLICATION_CREDENTIALS=key.json
```

### Run motionsense.py to evaluate image taken on rP using motionsense

```bash
python motionsense.py
```

The script activates the camera then uses motion sensing to trigger image evaluation. 

### ~~Run cloudvision.py to evaluate image~~

```bash
python cloudvision.py
```

~~labels will be returned (based on confidence, from high to low, in the form of an array of strings)~~

### ~~Run server.py to host flask server~~

```bash
python server.py
```

~~An image **POST** server will be hosted on *localhost:5000/uploader* or *0.0.0.0:5000/uploader*. Script will trigger the evaluate image function in *cloudvision.py* and the most confident image label will be returned as a response.~~





**Dependencies (pip install):**

- google-cloud-automl
- environs
- ~~flask (for server.py)~~

