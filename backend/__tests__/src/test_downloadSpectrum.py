""" testing downloadSpectrum.py """
from unittest.mock import patch
from fastapi.testclient import TestClient
from radis.misc.warning import EmptyDatabaseError
from src.main import app
from __tests__.helpers.payload_data import payload_data

client = TestClient(app)


def test_download_spec():
    """
    testing /download-spectrum endpoint 
    """
    response = client.post("/download-spectrum", json=payload_data)

    assert response.status_code == 200
    assert response.headers["content-type"] == "application/octet-stream"
    content_disposition = response.headers["content-disposition"]
    filename_start = content_disposition.index("filename*=utf-8''") + len(
        "filename*=utf-8''")
    expected_extension = ".spec"  # Adjust with the expected file extension
    assert content_disposition[filename_start:].endswith(expected_extension)


@patch("src.routes.downloadSpectrum.calculate_spectrum")
def test_download_spec_empty_database_error(mock_calc):
    """
    testing /download-spectrum endpoint when EmptyDatabaseError occurs
    """
    mock_calc.side_effect = EmptyDatabaseError("Empty DB")

    response = client.post("/download-spectrum", json=payload_data)

    assert response.status_code == 200
    assert response.json() == {
        "error": "No line in the specified wavenumber range"
    }


@patch("src.routes.downloadSpectrum.calculate_spectrum")
def test_download_spec_generic_exception(mock_calc):
    """
    testing /download-spectrum endpoint when generic exception occurs
    """
    mock_calc.side_effect = Exception("Unexpected error")

    response = client.post("/download-spectrum", json=payload_data)

    assert response.status_code == 200
    assert response.json() == {"error": "Unexpected error"}
