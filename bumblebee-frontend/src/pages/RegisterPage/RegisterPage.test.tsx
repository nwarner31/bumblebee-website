import React from 'react';
import {render, screen} from '@testing-library/react';
import RegisterPage from "./RegisterPage";
import {BrowserRouter} from "react-router-dom";

describe('RegisterPage Component', () => {
    it('should contain the correct inputs (7 total)', async () => {
        const register = jest.fn();
        render(<BrowserRouter><RegisterPage registerUser={register} /></BrowserRouter>);
        const inputElements = await screen.getAllByRole('textbox');
        expect(inputElements).toHaveLength(6);
        const passwordInputs = screen.getAllByLabelText('Password');
        expect(passwordInputs).toHaveLength(1);
        const emailInput = screen.getByRole('textbox', {name: /Email/i});
        expect(emailInput).toBeInTheDocument();
        const nameInput = screen.getByRole('textbox', {name: /Name/i});
        expect(nameInput).toBeInTheDocument();
        const street1Input = screen.getByRole('textbox', {name: /Street Address 1/i});
        expect(street1Input).toBeInTheDocument();
        const street2Input = screen.getByRole('textbox', {name: /Street Address 2/i});
        expect(street2Input).toBeInTheDocument();
        const cityInput = screen.getByRole('textbox', {name: /City/i});
        expect(cityInput).toBeInTheDocument();
        const stateInput = screen.getByRole('textbox', {name: /State/i});
        expect(stateInput).toBeInTheDocument();
    });
    it('should have two buttons (cancel, login)', () => {
        const register = jest.fn();
        render(<BrowserRouter><RegisterPage registerUser={register} /></BrowserRouter>);
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
        const cancelButton = screen.getByRole('button', { name: /Cancel/i });
        expect(cancelButton).toBeInTheDocument();
        const registerButton = screen.getByRole('button', { name: /Register/i });
        expect(registerButton).toBeInTheDocument();
    });
});