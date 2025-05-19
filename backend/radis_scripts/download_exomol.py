# -*- coding: utf-8 -*-
"""
Download some molecules from EXOMOL data, parse & cache them, to make 
sure the example notebooks run fast.
"""

from radis.io.exomol import fetch_exomol

# More molecules will be confirmed and added in upcoming updates
EXOMOL_working_molecules = [
    'CO',
    'NO',
    'AlO', 
    'HCl',
]

for molecule in EXOMOL_working_molecules:
    fetch_exomol(molecule)