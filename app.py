from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS

model = pickle.load(open('model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received:", data)  # For debugging
        features = np.array([[data['TDS'], data['Temperature'], data['PH'], data['Turbidity']]])
        prediction = model.predict(features)
        print("Prediction:", prediction[0])  # Debug
        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
