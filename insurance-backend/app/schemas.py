from dataclasses import dataclass
from enum import Enum

class Sex(str, Enum):
    male = "male"
    female = "female"

class Region(str, Enum):
    southwest = "southwest"
    southeast = "southeast"
    northwest = "northwest"
    northeast = "northeast"

@dataclass
class InsuranceInput:
    age: int
    sex: Sex
    bmi: float
    children: int
    smoker: bool
    region: Region

@dataclass
class InsuranceOutput:
    prediction: float
    confidence: float
    details: dict