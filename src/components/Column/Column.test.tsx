import { render } from '@testing-library/react';
import React from 'react';
import { ICoolumn } from '../../schemas/column';
import Column from './';

describe('Boards Component Page', () => {
    const removeColumn = () => { }

    const handleModal = (isModalCard: boolean, columnId: string) => { }
    it('Should return Card component as defined', () => {
        // const id = uuidv4()
        // const { id: boardId } = boardSession
        const value: ICoolumn = { id: 'id', label: 'label', boardId: 'boardId' };
        const utils = render(
            <Column column={value} handleModal={handleModal} removeColumn={removeColumn} />
        )

        expect(utils).toBeDefined()
    })

    it('Should rerturn find a new card when click to add a card', () => {

    })
})
