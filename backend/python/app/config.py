import json
import torch
import dotenv

env = dotenv.dotenv_values(".env")

CONFIG_PATH = env.get("CONFIG_PATH","../data/")
MODEL_PATH = env.get("MODEL_PATH","../data/models/")
ENCODING_PATH = env.get("ENCODING_PATH","../data/encoding/")
TRAIN_DATA_PATH = env.get("TRAIN_DATA_PATH","../data/training/")

# load vocabulary
vocab_path = ENCODING_PATH + "char2int.json"
with open(vocab_path, "r") as f:
    char2int = json.load(f)
    # add additional key to account for "space" in unicode form
    char2int.update({"\xa0": char2int[" "]})

int2char = {v:k for k, v in char2int.items()}

# define parameters
VOCAB_SIZE=len(int2char)
N_LAYERS=3
HIDDEN_SIZE=64
P_DROPOUT = 0.4
BATCH_FIRST = True
k = 3
PATH = MODEL_PATH + "wiki_1.pt"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")