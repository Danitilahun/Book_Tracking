from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

book_data = {"title": "48 Laws of Power", "status": "To-Read"}
wrong_data = {"title": 11, "status": "To-Readed"}
wrong_data2 = {"title":"48 Laws of Power", "status": "To-Readed"}


def test_fetch_all_books():
    response = client.get("/books")
    assert response.status_code == 200
    assert "title" in response.json()[0] and "status" in response.json()[0] and "id" in response.json()[0]

def test_add_book():
    global book_data
    
    response = client.post("/books", json=book_data)
    assert response.status_code == 201
    
    response_json = response.json()
    response_json.pop('id', None) 
    assert response_json == book_data
    
    response = client.post("/books", json=wrong_data)
    assert response.status_code == 422
    assert response.json()["detail"][0]["msg"] == "Input should be a valid string"
    
    
    response = client.post("/books", json=wrong_data2)
    assert response.status_code == 422

    assert response.json()["detail"][0]["msg"] == "Value error, Status should be one of: To-Read, In-Progress, Completed"

def test_update_book_status():
    global book_data
    
    response = client.get("/books")
    book_id = response.json()[0]["id"]
    updated_status = {"status": "In-Progress"}
    response = client.put(f"/books/{book_id}", json=updated_status)
    assert response.status_code == 200
    assert response.json()["message"] == "Book status updated successfully"
    

def test_delete_book():
    global book_data
    response = client.get("/books")
    book_id = response.json()[0]["id"]
    response = client.delete(f"/books/{book_id}")
    assert response.status_code == 200
