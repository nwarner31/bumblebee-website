import React from 'react';
import {render, screen} from '@testing-library/react';
import Toast from "./Toast";

describe('Toast Component', () => {
    it('should contain the message prop', () => {
        render(<Toast type='success' message='Test toast' />);
        const toastElement = screen.getByText(/Test toast/);
        expect(toastElement).toBeInTheDocument();
    });
    it('should have the type on the class list', () => {
        render(<Toast type='success' message='Test toast' />);
        const toastElement = screen.getByText(/Test toast/);
        expect(toastElement.classList).toContain('success');
    });
});