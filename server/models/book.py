from dataclasses import dataclass
from typing import Optional

@dataclass
class Book:
    id: Optional[int] = None
    title: Optional[str] = None
    status:  Optional[str] = None
