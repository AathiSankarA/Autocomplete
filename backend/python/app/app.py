from fastapi import FastAPI, WebSocket, Path
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated

from app.model import charRNN, GenerateText
from app.config import *
from app.schema import *

import dotenv, json
import numpy as np

int2char = {v:k for k, v in char2int.items()}

app = FastAPI(
    title="Autocomplete app",
    description="""
# Autocomplete
"""
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# load model
model = charRNN(VOCAB_SIZE, HIDDEN_SIZE, N_LAYERS, P_DROPOUT, BATCH_FIRST)
model.load_state_dict(torch.load(PATH, map_location=device))
model.eval()

text_gen = GenerateText(model, k , char2int, device)

@app.websocket("/")
async def mirror(websocket: WebSocket):
    await websocket.accept()
    while True:
        input_text = await websocket.receive_text()
        # autocomplete_text = text_gen.generate_text(input_text)
        autocomplete_text = input_text
        await websocket.send_text(autocomplete_text)

@app.websocket("/{name}")
async def complete(name:Annotated[str , Path()],websocket: WebSocket):
    await websocket.accept()

    data = json.load(open(CONFIG_PATH+"config.json"))

    name = name.split("+")[-1]
    configs = data.get(name)

    model = charRNN(**configs)
    model.load_state_dict(torch.load(MODEL_PATH+name+".pt", map_location=device))
    model.eval()

    char2int = json.load(open(ENCODING_PATH+configs["VOCAB"]))

    
    text_gen = GenerateText(model, k , char2int, device)

    while True:
        input_text = await websocket.receive_text()
        autocomplete_text = text_gen.generate_text(input_text)
        await websocket.send_text(autocomplete_text)

@app.get("/models",tags=["Information"])
def get_models() -> list[Models]:
    result = json.load(open(CONFIG_PATH+"models.json"))
    return result

@app.get("/model/{category}/{instance}",tags=["Information"])
def get_model_info(
    category : Annotated[str , Path(title="category of the model")],
    instance : Annotated[str , Path(title="instance from a category")]
) -> Model:
    info = json.load(open(CONFIG_PATH+"models.json"))
    for i in info:
        if i["category"] == category:
            break
    else:
        return Model()
    if instance in i["instances"]:
        result = json.load(open(CONFIG_PATH+"config.json")).get(instance)
        return result if result else {}
    return Model()

