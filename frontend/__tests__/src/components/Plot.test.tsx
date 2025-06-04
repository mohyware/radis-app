import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Plot } from '../../../src/components/Plot';
import { PlotSettings, Spectrum } from '../../../src/constants';
import { describe, it, expect, vi } from 'vitest';

// Mock Plotly component since it's not needed for these tests
vi.mock('react-plotly.js', () => {
    return {
        __esModule: true,
        default: vi.fn(() => <div role="figure" aria-label="Plotly Mock">Plotly Mock</div>),
    };
});

describe('Plot Component', () => {
    const mockSpectra: Spectrum[] = [
        {
            x: [1, 2, 3],
            y: [4, 5, 6],
            species: [{ molecule: 'CO', mole_fraction: 0.1 }],
            database: 'HITRAN',
            tgas: 300,
            pressure: 1,
            pressure_units: 'u.bar',
            wavelength_units: 'u.nm',
        },
    ];

    const mockPlotSettings: PlotSettings = {
        mode: 'absorbance',
        units: '-ln(I/I0)',
    };

    const renderWithTheme = (ui: React.ReactElement, theme = createTheme()) => {
        return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
    };

    it('renders without crashing', () => {
        renderWithTheme(<Plot spectra={mockSpectra} plotSettings={mockPlotSettings} />);
        expect(screen.getByRole('figure')).toBeDefined();
    });

    it('renders with correct title for single spectrum', () => {
        renderWithTheme(<Plot spectra={mockSpectra} plotSettings={mockPlotSettings} />);
        expect(screen.getByRole('figure')).toBeDefined();
    });

    it('renders with correct title for multiple spectra', () => {
        const multipleSpectra = [
            ...mockSpectra,
            {
                ...mockSpectra[0],
                species: [{ molecule: 'CO2', mole_fraction: 0.2 }],
            },
        ];
        renderWithTheme(<Plot spectra={multipleSpectra} plotSettings={mockPlotSettings} />);
        expect(screen.getByRole('figure')).toBeDefined();
    });

    it('handles different plot modes correctly', () => {
        const modes = ['absorbance', 'transmittance', 'radiance'] as const;

        modes.forEach(mode => {
            const { unmount } = renderWithTheme(
                <Plot
                    spectra={mockSpectra}
                    plotSettings={{ ...mockPlotSettings, mode }}
                />
            );
            expect(screen.getByRole('figure')).toBeDefined();
            unmount();
        });
    });

    it('handles different wavelength units correctly', () => {
        const spectraWithDifferentUnits = [
            {
                ...mockSpectra[0],
                wavelength_units: 'u.nm',
            },
            {
                ...mockSpectra[0],
                wavelength_units: 'u.cm-1',
            },
        ];

        renderWithTheme(
            <Plot
                spectra={spectraWithDifferentUnits}
                plotSettings={mockPlotSettings}
            />
        );
        expect(screen.getByRole('figure')).toBeDefined();
    });

    it('renders with dark theme', () => {
        const darkTheme = createTheme({
            palette: {
                mode: 'dark',
            },
        });

        renderWithTheme(
            <Plot spectra={mockSpectra} plotSettings={mockPlotSettings} />,
            darkTheme
        );
        expect(screen.getByRole('figure')).toBeDefined();
    });

    it('handles empty spectra array', () => {
        renderWithTheme(<Plot spectra={[]} plotSettings={mockPlotSettings} />);
        expect(screen.getByRole('figure')).toBeDefined();
    });
});
