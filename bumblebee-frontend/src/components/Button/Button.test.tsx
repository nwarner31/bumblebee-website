import React from 'react';
import {render, screen} from '@testing-library/react';
import Button from "./Button";

describe('Button Component', () => {
    it('should contain the label text', () => {
        render(<Button label='Test Button' buttonType='light' />);
        const buttonElement = screen.getByText('Test Button');
        expect(buttonElement).toBeInTheDocument();
    });
    it('should contain the button type and class in the class list if included', () => {
        render(<Button label='Test Button' buttonType='light' class='testClass' />);
        const buttonElement = screen.getByText('Test Button');
        expect(buttonElement.classList).toContain('light');
        expect(buttonElement.classList).toContain('testClass');
    });
    it('should call the onClick function when clicked', () => {
        const clickFunction = jest.fn();
        render(<Button label='Test Button' buttonType='light' onClick={clickFunction} />);
        const buttonElement = screen.getByText('Test Button');
        buttonElement.click();
        expect(clickFunction).toBeCalledTimes(1);
    });
});