import radis
import numpy as np
from fastapi import APIRouter
import astropy.units as u
from src.models.payload import Payload
from src.helpers.calculateSpectrum import calculate_spectrum

router = APIRouter()
@router.post("/calculate-spectrum")
async def calc_spectrum(payload: Payload):
    print(payload)

    try:
        spectrum = calculate_spectrum(payload)
        if payload.use_simulate_slit is True:
            if(payload.wavelength_units=="1/u.cm"):
                slit_unit="cm-1"
            else:
                slit_unit="nm"
            print("Applying simulate slit")
            spectrum.apply_slit(payload.simulate_slit, slit_unit)

    except radis.misc.warning.EmptyDatabaseError:
        return {"error": "No line in the specified wavenumber range"}
    except Exception as exc:
        print("Error", exc)
        return {"error": str(exc)}
    else:

        wunit = spectrum.get_waveunit()
        iunit = "default"
        xNan, yNan = spectrum.get(payload.mode, wunit=wunit, Iunit=iunit)
        # to remove the nan values from x and y
        x = xNan[~np.isnan(xNan)]
        y = yNan[~np.isnan(yNan)]

        # to compute X  on the client side.
        x_min, x_max = x[0], x[-1]
        if len(x) > 1:
            x_step = x[1] - x[0]
        else:
            x_step = None
        resample = None

        # Reduce payload size
        threshold = 5e7
        if len(spectrum) * 8 * 2 > threshold:
            print("Reducing the payload size")
            # Setting return payload size limit of 50 MB
            # one float is about 8 bytes
            # we return only one array (I), while the other one (W) is computed on the client side.
            resample = int(len(spectrum) * 8 * 2 // threshold)
            y = y[::resample]

        return {
            "data": {
                "y": list(y),
                "x":{
                "min" : x_min,
                "max" : x_max,
                "step" : x_step,
                "resample" :resample,
                },
                "units": spectrum.units[payload.mode],
            },
        }
