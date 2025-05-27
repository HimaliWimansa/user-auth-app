import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pickle

# Sample training data (include diverse examples)
data = pd.DataFrame({
    'TDS': [450, 600, 400, 520, 300, 800],
    'Temperature': [25, 28, 22, 40, 15, 10],
    'PH': [7.0, 8.6, 6.4, 7.2, 7.5, 9.1],
    'Turbidity': [3, 6, 4, 5.5, 2, 7],
})

# Rule-based labeling
def classify(row):
    if (row['TDS'] > 500 or row['PH'] < 6.5 or row['PH'] > 8.5 or
        row['Turbidity'] > 5 or row['Temperature'] < 5 or row['Temperature'] > 35):
        return 'Unsafe'
    else:
        return 'Safe'

data['Label'] = data.apply(classify, axis=1)

X = data[['TDS', 'Temperature', 'PH', 'Turbidity']]
y = data['Label']

model = RandomForestClassifier()
model.fit(X, y)

# Save the model
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model trained and saved as model.pkl")
