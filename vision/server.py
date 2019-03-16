from werkzeug import secure_filename
from flask import Flask, request
from cloudvision import evaluate

app = Flask(__name__)
 
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      f.save(secure_filename(f.filename))
      label = evaluate()
      return label

if __name__ == '__main__':
   app.run(host= '0.0.0.0')
