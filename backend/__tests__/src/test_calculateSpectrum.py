from src.main import app   # assuming your FastAPI app instance is named 'app'
from fastapi.testclient import TestClient
from __tests__.helpers.payload_data import payload_data
client = TestClient(app)
import pytest

def test_calc_spectrum():
    
    response = client.post("/calculate-spectrum", json=payload_data)
    
    data = response.json()["data"]
    assert response.status_code == 200
    assert "x" in data
    assert "y" in data
    assert "units" in data

@pytest.mark.skip(reason="ExoMol test is too slow")
def test_exomol_database():
    modified_payload = payload_data.copy()
    modified_payload.update({
        "database": "exomol",
    })

    response = client.post("/calculate-spectrum", json=modified_payload)
    
    data = response.json()["data"]
    assert response.status_code == 200
    assert "x" in data
    assert "y" in data
    assert "units" in data

@pytest.mark.skip(reason="Nist test needs HITRAN web site credentials")
def test_nist_database():
    modified_payload = {
        "min_wavenumber_range": 9679,
        "max_wavenumber_range": 20074,
        "species": [
            {
                "molecule": "N_II",
                "mole_fraction": 0.1,
            }
        ],
        "pressure": 20,
        "tgas": 9000,
        "path_length": 1.0,
        "use_simulate_slit": "false",
        "mode": "radiance_noslit",
        "database": "nist",
        "wavelength_units": "1/u.cm",
        "pressure_units": "u.bar",
        "path_length_units": "u.cm",
    }
    response = client.post("/calculate-spectrum", json=modified_payload)
    
    data = response.json()["data"]
    assert response.status_code == 200
    assert "x" in data
    assert "y" in data
    assert "units" in data
