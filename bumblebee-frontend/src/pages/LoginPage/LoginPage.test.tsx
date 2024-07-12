import React from 'react';
import {render, screen} from '@testing-library/react';
import LoginPage from "./LoginPage";
import {BrowserRouter} from "react-router-dom";

describe('LoginPage Component', () => {
    it('should contain the two input elements (username, password)', async () => {
        const login = jest.fn();
        render(<BrowserRouter><LoginPage loginUser={login} /></BrowserRouter>);
        const inputElements = await screen.getAllByRole('textbox');
        const passwordInputs = screen.getAllByLabelText('Password');
        expect(inputElements).toHaveLength(1);
        expect(passwordInputs).toHaveLength(1);
        expect(inputElements[0]).toHaveAttribute('id', 'email');
        expect(passwordInputs[0]).toHaveAttribute('id', 'password');
    });
    it('should have two buttons (cancel, login)', () => {
        const login = jest.fn();
        render(<BrowserRouter><LoginPage loginUser={login} /></BrowserRouter>);
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
        const cancelButton = screen.getByRole('button', { name: /Cancel/i });
        expect(cancelButton).toBeInTheDocument();
        const loginButton = screen.getByRole('button', { name: /Login/i });
        expect(loginButton).toBeInTheDocument();
    });
})