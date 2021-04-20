from flask import Flask, render_template, url_for, request
import os, io, PIL.Image, base64
import uuid
from torch_utils import transform_image, get_prediction
#from flask_sqlalchemy import SQLAlchemy

from torch_utils import get_prediction, transform_image

app = Flask(__name__)
UPLOAD_FOLDER = './pics/'
#app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///test.db'

#db = SQLAlchemy(app)

#class Images(db.Model):
#    id = db.Column(db.Integer, primary_key = True)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    # xxx.png
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=['POST', 'GET'])
def upload_pred():
    if request.method == "POST":
        image_file = request.values['canvas']
        image = base64.b64decode(image_file)
        im_file = io.BytesIO(image)  # convert image to file-like object
        img = PIL.Image.open(im_file)
        filename = str(uuid.uuid4())
        img.save(UPLOAD_FOLDER + filename + ".png","PNG")
        
        file = open(UPLOAD_FOLDER + filename + '.png', 'rb')
        #file = open("eight.png", 'rb')
        img_bytes = file.read()
        tensor = transform_image(img_bytes)
        pred = get_prediction(tensor)
        return render_template('index.html', prediction = str(pred.item()))
    return render_template('index.html')



if __name__ == '__main__':
    app.run(port = 7550, debug=True)

