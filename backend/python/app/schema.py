from pydantic import BaseModel

class Models(BaseModel):
    category: str
    instances: list[str]

class Model(BaseModel):
    HIDDEN_SIZE: int = 0
    VOCAB_SIZE: int = 0
    N_LAYERS: int = 0
    P_DROPOUT: float = 0
    # EPOCH: int | None = 0