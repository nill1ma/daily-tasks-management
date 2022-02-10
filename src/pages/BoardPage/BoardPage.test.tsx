import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import BoardPage from './';


describe(`Board Page Component Page`, () => {
    it('Should return Board Page component as defined', () => {
        const utils = render(
            <BoardPage />
        )
        expect(utils).toBeDefined()
    })

    it('Should check if there is a button to add a new Board', () => {
        render(
            <BoardPage />
        )
        const text = screen.getByText('Add Column')
        expect(text).toBeInTheDocument()
    })

    it('Should click on button to add a new Board and Modal has to be defined', () => {
        render(
            <BoardPage />
        )
        const addColumn = screen.getByText('Add Column')
        fireEvent.click(addColumn)
        const text = screen.getByText('Add a new Column')
        expect(text).toBeInTheDocument()
    })
})
