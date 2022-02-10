import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Boards from './';

describe(`Boards Component Page`, () => {
    it('Should return Boards component as defined', () => {
        const utils = render(
            <BrowserRouter>
                <Boards />
            </BrowserRouter>
        )
        expect(utils).toBeDefined()
    })

    it('Should check if there is a button to add a new Board',   () => {
        render(
            <BrowserRouter>
                <Boards />
            </BrowserRouter>
        )
        const text =  screen.getByText('Add Board')
        expect(text).toBeInTheDocument()
    })

    it('Should click on button to add a new Board and Modal has to be defined',   () => {
        render(
            <BrowserRouter>
                <Boards />
            </BrowserRouter>
        )
        const addBoard =  screen.getByText('Add Board')
        fireEvent.click(addBoard)
        const text =  screen.getByText('Add a new Board')
        expect(text).toBeInTheDocument()
    })
})
