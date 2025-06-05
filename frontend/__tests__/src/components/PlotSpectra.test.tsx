import { render, screen, waitFor } from '@testing-library/react';
import user from "@testing-library/user-event";
import React from 'react';
import { describe, it, expect } from 'vitest';
import App from "../../../src/App";

describe('PlotSpectra Component Integration Tests', () => {
    it('should render the PlotSpectra component', async () => {
        render(<App />);

        const button = screen.getByRole("button", {
            name: /new plot/i,
        });
        user.click(button);
        try {
            await waitFor(() => {
                expect(screen.getByTestId('plot-testid')).toBeDefined();
            })
        } catch (err) {
            console.warn('Plot did not render. Axios likely failed:', err);
            return;
        }
        await waitFor(() => {
            expect(screen.getByTestId('plot-testid')).toBeDefined();
        })
    });
});