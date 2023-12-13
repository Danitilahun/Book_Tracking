from supabase import create_client, Client
from typing import Optional

class DatabaseConnection:
    def __init__(self, url: str, key: str):
        self.url = url
        self.key = key
        self.supabase: Optional[Client] = None

    def create_supabase_client(self):
        self.supabase = create_client(self.url, self.key)

    def connect(self):
        if self.supabase is None:
            self.create_supabase_client()
