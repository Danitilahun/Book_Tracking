from dataclasses import dataclass
from typing import Optional

@dataclass
class Book:
    id: Optional[int] = None
    title: Optional[str] = None
    status:  Optional[str] = None
    
    def __post_init__(self):
        if self.status not in ["To-Read", "In-Progress", "Completed"]:
            raise ValueError("Status should be one of: To-Read, In-Progress, Completed")