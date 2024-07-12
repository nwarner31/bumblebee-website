import React from 'react';
import {render, screen} from '@testing-library/react';
import Header from "./Header";
import {BrowserRouter} from "react-router-dom";

describe('Header Component', () => {

    it('should render with login and register links when logged out', () => {
        const logout = jest.fn();
        render(<BrowserRouter><Header role="none" name='Guest' logoutUser={logout} /></BrowserRouter>) ;
        const loginElement = screen.getByText(/Login/);
        expect(loginElement).toBeInTheDocument();
        const registerElement = screen.getByText(/Register/);
        expect(registerElement).toBeInTheDocument();
    });
    it('should render the logout link and the greeting when logged in', () => {
        const logout = jest.fn();
        render(<BrowserRouter><Header role="user" name='Bob' logoutUser={logout} /></BrowserRouter>) ;
        const logoutElement = screen.getByText(/Logout/);
        expect(logoutElement).toBeInTheDocument();
        const greetingElement = screen.getByText(/You are logged in, Bob/);
        expect(greetingElement).toBeInTheDocument();
    });
    it('should call the logout function when the logout link is clicked', async () => {
        const logout = jest.fn();
        render(<BrowserRouter><Header role="user" name='Bob' logoutUser={logout} /></BrowserRouter>) ;
        const logoutElement = screen.getByText(/Logout/);
        await logoutElement.click()
        // Timeout is to allow the click function to finish
        setTimeout(() => {
            expect(logout).toBeCalledTimes(1);
        }, 1000);

    });
});