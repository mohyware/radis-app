from src.main import app
import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from __tests__.helpers.payload_data import payload_data
from radis.misc.warning import EmptyDatabaseError
import numpy as np

client = TestClient(app)

def test_calc_spectrum_with_simulate_slit_cm1():
    modified_payload = payload_data.copy()
    modified_payload.update({
        "use_simulate_slit": True,
        "wavelength_units": "1/u.cm"
    })
    response = client.post("/calculate-spectrum", json=modified_payload)
    assert response.status_code == 200
    assert "data" in response.json()

def test_calc_spectrum_with_simulate_slit_nm():
    modified_payload = payload_data.copy()
    modified_payload.update({
        "use_simulate_slit": True,
        "wavelength_units": "u.nm"
    })
    response = client.post("/calculate-spectrum", json=modified_payload)
    assert response.status_code == 200
    assert "data" in response.json()

@patch("src.routes.calculateSpectrum.calculate_spectrum")
def test_calc_spectrum_empty_database_error(mock_calc):
    mock_calc.side_effect = EmptyDatabaseError("Empty DB")

    response = client.post("/calculate-spectrum", json=payload_data)
    assert response.status_code == 200
    assert "error" in response.json()
    assert response.json()["error"] == "No line in the specified wavenumber range"

@patch("src.routes.calculateSpectrum.calculate_spectrum")
def test_calc_spectrum_generic_exception(mock_calc):
    mock_calc.side_effect = Exception("Unexpected error")

    response = client.post("/calculate-spectrum", json=payload_data)
    assert response.status_code == 200
    assert "error" in response.json()
    assert response.json()["error"] == "Unexpected error"

@patch("src.routes.calculateSpectrum.calculate_spectrum")
def test_calc_spectrum_large_payload(mock_calc):
    payload_data["mode"] = "absorbance"
    mock_spectrum = MagicMock()
    mock_spectrum.__len__.return_value = int(1e7)
    mock_spectrum.get_waveunit.return_value = "u.nm"
    mock_spectrum.units = {"absorbance": "mW/cm2/sr/cm-1"}

    x = np.linspace(0, 1000, 10000)
    y = np.linspace(0, 1, 10000)
    
    mock_spectrum.get.return_value = (x, y)

    mock_calc.return_value = mock_spectrum

    response = client.post("/calculate-spectrum", json=payload_data)
    assert response.status_code == 200
    result = response.json()["data"]
    assert "x" in result and "y" in result and "units" in result
    assert len(result["x"]) < len(x)

    assert "x" in result and "y" in result and "units" in result
    assert len(result["x"]) < 10000
