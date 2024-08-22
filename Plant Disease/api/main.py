import numpy as np
from fastapi import FastAPI, File, UploadFile
import uvicorn
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Reacts development server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.saved_model.load("../model/1")
infer = model.signatures['serving_default']

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0).astype(np.float32)  # Ensure it's the correct data type

    # Make predictions using the correct input tensor name
    prediction = infer(keras_tensor=tf.constant(img_batch))

    # Extract the output using the correct output tensor name
    predicted_class = CLASS_NAMES[np.argmax(prediction['output_0'])]
    confidence = np.max(prediction['output_0'])

    return {"class": predicted_class, "confidence": float(confidence)}

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8002)
