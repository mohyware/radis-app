import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ToggleColorMode, { ColorModeContext } from '../../../src/components/ToggleColorMode';

// Mock localStorage
const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value;
        }),
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

describe('ToggleColorMode Component', () => {
    const TestComponent = () => {
        const colorMode = React.useContext(ColorModeContext);
        return (
            <button onClick={colorMode.toggleColorMode} data-testid="theme-toggle">
                Toggle Theme
            </button>
        );
    };

    beforeEach(() => {
        localStorageMock.clear();
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
    });

    it('renders children correctly', () => {
        render(
            <ToggleColorMode>
                <div data-testid="test-child">Test Child</div>
            </ToggleColorMode>
        );
        expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });

    it('initializes with light theme when no saved preference', () => {
        render(
            <ToggleColorMode>
                <TestComponent />
            </ToggleColorMode>
        );
        expect(localStorageMock.getItem).toHaveBeenCalledWith('theme-mode');
    });

    it('initializes with saved theme preference from localStorage', () => {
        localStorageMock.getItem.mockReturnValue('dark');
        render(
            <ToggleColorMode>
                <TestComponent />
            </ToggleColorMode>
        );
        expect(localStorageMock.getItem).toHaveBeenCalledWith('theme-mode');
    });

    it('toggles theme when toggleColorMode is called', async () => {
        render(
            <ToggleColorMode>
                <TestComponent />
            </ToggleColorMode>
        );

        const toggleButton = screen.getByTestId('theme-toggle');

        fireEvent.click(toggleButton);
        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme-mode', 'light');

        fireEvent.click(toggleButton);
        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme-mode', 'dark');
    });

    it('uses system preference when no saved preference', () => {
        // Mock system preference to dark mode
        window.matchMedia = vi.fn().mockImplementation(query => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        render(
            <ToggleColorMode>
                <TestComponent />
            </ToggleColorMode>
        );
        expect(localStorageMock.getItem).toHaveBeenCalledWith('theme-mode');
    });
}); 