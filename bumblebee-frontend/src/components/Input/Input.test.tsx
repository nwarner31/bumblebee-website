import React from 'react';
import {render, screen} from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
    it('contains label with the given text', () => {
       render(<Input label='Test Input' />) ;
       const labelElement = screen.getByText(/Test Input/);
       expect(labelElement).toBeInTheDocument();
    });
    it('has the class if included in the props', () => {
        const testClass = 'testCssClass'
        render(<Input label='Test Input' cssClass={testClass} />) ;
        const labelElement = screen.getByText(/Test Input/);
        const classDiv = labelElement.parentElement;
        expect(classDiv!.classList).toContain(testClass);
    });
});