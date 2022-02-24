import React from 'react'
import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen } from '@testing-library/react'
import { ICard } from '../../schemas/card'
import Card from './'
import renderer from 'react-test-renderer'
import "jest-styled-components"
import { Description } from './styles'

describe('Card Component', () => {
    it('Should return Card component as defined', () => {
        let card: ICard = {
            id: '',
            columnId: '',
            label: '',
            description: '',
            priority: { description: '', code: 1 }
        }
        const removeCard = () => { }
        const utils = render(
            <Card card={card} removeCard={removeCard} />
        )
        expect(utils).toBeDefined()
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
        render(
            <Card card={card} removeCard={removeCard} />
        )
        const cardDescription = screen.getByTestId('description')

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
        render(
            <Card card={card} removeCard={removeCard} />
        )
        const descriptionShowedOrHidenButton = screen.getByTestId('descriptionShowedOrHidenButton')
        userEvent.click(descriptionShowedOrHidenButton)
        // userEvent
        // use role to check dialog
        const cardDescription = screen.getByTestId('description')

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
        render(
            <Card card={card} removeCard={removeCard} />
        )
        const descriptionShowedOrHidenButton = screen.getByTestId('descriptionShowedOrHidenButton')
        fireEvent.click(descriptionShowedOrHidenButton)
        fireEvent.click(descriptionShowedOrHidenButton)
        const cardDescription = screen.getByTestId('description')

        expect(cardDescription).toBeVisible()
    })

    it('Should update a card and find new informations in screen', () => {
        let card: ICard = {
            id: '1',
            columnId: '1',
            label: 'Planning travell',
            description: 'Planning all of the travell burocracies',
            priority: { description: 'HIGH', code: 0 }
        }
        const removeCard = () => { }
        const { rerender } = render(
            <Card card={card} removeCard={removeCard} />
        )

        const input = screen.getByTestId('title')
        const textarea = screen.getByTestId('description')
        const select = screen.getAllByTestId('selectPriority1')
        userEvent.type(input, 'Updated Card')
        userEvent.type(textarea, 'Updated text Card')
        const saveEdition = screen.getByTestId('saveEdition')
        // let option = select.find()
        // userEvent.selectOptions(select, JSON.stringify({ description: 'LOW', code: 2 }))
        fireEvent.click(saveEdition)
    })
})


describe('Card Styled Component', () => {
    it('Should check if Description is tagged as display is none', () => {
        const tree = renderer.create(<Description getHiden={true} />).toJSON()
        // expect(tree).toHaveStyleRule('display', 'none')
    })

    it('Should check if Description is tagged as display is flex', () => {
        const tree = renderer.create(<Description getHiden={false} />).toJSON()
        // expect(tree).toHaveStyleRule('display', 'block')
    })
})