**To setup cloudvision.py** (one time)

```bash
export \
    GOOGLE_APPLICATION_CREDENTIALS=key.json
```

then to evaluate image

```bash
python cloudvision.py
```

labels will be returned (based on confidence, from high to low, in the form of an array of strings)

**Dependencies (python):**

- google.cloud
- flask