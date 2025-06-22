from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from torchvision import transforms
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load model
model = torch.jit.load("NEW1_oral_disease_mobilevit_cbam_mobile.pt", map_location="cpu")
model.eval()

# Class names used during training
class_names = ['Calculus', 'Caries', 'Discoloration', 'Gingivitis', 'Hypodontia', 'Mouth Ulcer', 'Oral Cancer']

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    image = Image.open(file).convert("RGB")
    img_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        logits = model(img_tensor)
        probs = torch.sigmoid(logits).squeeze().numpy()
        pred_idx = int(probs.argmax())
        confidence = float(probs[pred_idx])

    return jsonify({
        'prediction': class_names[pred_idx],
        'confidence': f"{confidence*100:.2f}%",
        'probabilities': {class_names[i]: round(float(p)*100, 2) for i, p in enumerate(probs)}
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)