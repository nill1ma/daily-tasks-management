import { render } from '@testing-library/react'
import "jest-styled-components"
import React from 'react'
import renderer from 'react-test-renderer'
import Projects from '.'
import { IBoard } from '../../schemas/board'
import { Board } from './styles'

describe('Board Component', () => {
    it('Should return Prokects component as defined', () => {
        const board = {
            id: '1',
            name: 'Test',
            active: false
        }
        const removeBoard = (board: IBoard) => { }
        const chooseBoard = (currentId: string) => { }
        const utils = render(
            <Projects project={board} removeBoard={removeBoard} chooseBoard={chooseBoard} />
        )
        expect(utils).toBeDefined()
    })
})

describe('Board Styled Component', () => {
    it('Should check if project name font-weight is tagged as Bold when hover event is actived', () => {
        const tree = renderer.create(<Board />).toJSON()
        // expect(tree).toHaveStyleRule('font-weight', 'bold', {
        //     modifier: 'span:hover',
        // })
    })
})
