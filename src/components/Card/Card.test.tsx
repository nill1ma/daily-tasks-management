import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ICard } from '../../schemas/card';
import Card from './';

describe('Boards Component Page', () => {
    it('Should return Card component as defined', () => {
        let card: ICard = {
            id: '',
            columnId: '',
            label: '',
            description: '',
            priority: { description: '', code: 1 }
        }
        const removeCard = () => { }
        const component = render(
            <Card card={card} removeCard={removeCard} />
        )
        expect(component).toBeDefined()
    })
    it('Should find Card description text in the document', () => {
        let card: ICard = {
            id: '1',
            columnId: '1',
            label: 'Planning travell',
            description: 'Planning all of the travell burocracies',
            priority: { description: 'HIGH', code: 0 }
        }
        const removeCard = () => { }
        render(
            <Card card={card} removeCard={removeCard} />
        )
        const cardDescription = screen.getByText('Planning all of the travell burocracies')
        expect(cardDescription).toBeInTheDocument()
    })

    it('Should find Card description area visible', () => {
        let card: ICard = {
            id: '1',
            columnId: '1',
            label: 'Planning travell',
            description: 'Planning all of the travell burocracies',
            priority: { description: 'HIGH', code: 0 }
        }
        const removeCard = () => { }
        const { getByTestId } = render(
            <Card card={card} removeCard={removeCard} />
        )
        const cardDescription = getByTestId('description')

        expect(cardDescription).toBeVisible()
    })

    it('Should find Card description area not visible', () => {
        let card: ICard = {
            id: '1',
            columnId: '1',
            label: 'Planning travell',
            description: 'Planning all of the travell burocracies',
            priority: { description: 'HIGH', code: 0 }
        }
        const removeCard = () => { }
        const { getByTestId } = render(
            <Card card={card} removeCard={removeCard} />
        )
        const descriptionShowedOrHidenButton = screen.getByTestId('descriptionShowedOrHidenButton')
        userEvent.click(descriptionShowedOrHidenButton)
        // userEvent
        // use role to check dialog
        const cardDescription = getByTestId('description')

        expect(cardDescription).not.toBeVisible()
    })

    it('Should find Card description area not visible', () => {
        let card: ICard = {
            id: '1',
            columnId: '1',
            label: 'Planning travell',
            description: 'Planning all of the travell burocracies',
            priority: { description: 'HIGH', code: 0 }
        }
        const removeCard = () => { }
        const { getByTestId } = render(
            <Card card={card} removeCard={removeCard} />
        )
        const descriptionShowedOrHidenButton = screen.getByTestId('descriptionShowedOrHidenButton')
        fireEvent.click(descriptionShowedOrHidenButton)
        const cardDescription = getByTestId('description')

        expect(cardDescription).not.toBeVisible()
    })

    it('Should find Card description area visible post clicking twice on button to hide', () => {
        let card: ICard = {
            id: '1',
            columnId: '1',
            label: 'Planning travell',
            description: 'Planning all of the travell burocracies',
            priority: { description: 'HIGH', code: 0 }
        }
        const removeCard = () => { }
        const { getByTestId } = render(
            <Card card={card} removeCard={removeCard} />
        )
        const descriptionShowedOrHidenButton = screen.getByTestId('descriptionShowedOrHidenButton')
        fireEvent.click(descriptionShowedOrHidenButton)
        fireEvent.click(descriptionShowedOrHidenButton)
        const cardDescription = getByTestId('description')

        expect(cardDescription).toBeVisible()
    })
})
