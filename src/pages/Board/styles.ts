import styled from "styled-components";

type BoarStyledProps = {
    length:number
}

export const BoardContainer = styled.div<BoarStyledProps>`
    width: 90vw;
    display: grid;
    grid-template-columns: ${({length}) => applyGridTemplateColumn(length)};
`

function applyGridTemplateColumn(length: number) {
    let frs: string = ''
    while (length > 0) {
        frs = frs + ' 1fr'
        length -= 1
    }
    return frs
}