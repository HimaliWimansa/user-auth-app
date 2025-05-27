from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array([[data['TDS'], data['Temperature'], data['PH'], data['Turbidity']]])
    prediction = model.predict(features)
    return jsonify({'prediction': prediction[0]})
