import { render } from '@testing-library/react';
import React from 'react';
import Column from './';

describe('Boards Component Page', () => {
    const removeColumn = () => { }

    const handleModal = (isModalCard: boolean, columnId: string) => { }
    it('Should return Card component as defined', () => {
        const utils = render(
            <Column columnId={'1'} label={'Column'} handleModal={handleModal} removeColumn={removeColumn} />
        )
        
        expect(utils).toBeDefined()
    })

    it('Should rerturn find a new card when click to add a card', ()=>{

    })
})
