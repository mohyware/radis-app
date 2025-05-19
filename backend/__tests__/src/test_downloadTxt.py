from src.main import app
from fastapi.testclient import TestClient
from unittest.mock import patch
from radis.misc.warning import EmptyDatabaseError
from __tests__.helpers.payload_data import payload_data

client = TestClient(app)

def test_download_txt():
  
    response = client.post("/download-txt", json=payload_data)
    
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/octet-stream"
    
    # Check the filename extension from the content-disposition header
    content_disposition = response.headers["content-disposition"]
    filename_start = content_disposition.index("filename*=utf-8''") + len("filename*=utf-8''")
    expected_extension = ".csv"  # Adjust with the expected file extension
    
    assert content_disposition[filename_start:].endswith(expected_extension)

@patch("src.routes.downloadTxt.calculate_spectrum")
def test_download_txt_empty_database_error(mock_calc):
    """
    testing /download-txt endpoint when EmptyDatabaseError occurs
    """
    mock_calc.side_effect = EmptyDatabaseError("Empty DB")

    response = client.post("/download-txt", json=payload_data)

    assert response.status_code == 200
    assert response.json() == {"error": "No line in the specified wavenumber range"}


@patch("src.routes.downloadTxt.calculate_spectrum")
def test_download_txt_generic_exception(mock_calc):
    """
    testing /download-txt endpoint when generic exception occurs
    """
    mock_calc.side_effect = Exception("Unexpected error")

    response = client.post("/download-txt", json=payload_data)

    assert response.status_code == 200
    assert response.json() == {"error": "Unexpected error"}
