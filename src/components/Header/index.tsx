import { useState } from "react";
import { HeaderContainer, Item } from "./styles";

export default function Header() {

    const [tabs, setTabs] = useState([
        { id: '1', label: 'DTM', active: true, to: "/" }
    ])

    const handleTabs = (id: string) => {
        setTabs(prevState => {
            return [...prevState.map(prev => {
                if (prev.id === id)
                    prev.active = true
                else
                    prev.active = false
                return prev
            })]
        })
    }

    return <HeaderContainer>
        {tabs.map(({ id, active, to, label }) => {
            return <Item key={id} onClick={() => handleTabs(id)} active={active} to={to}>
                {label}
            </Item>
        })}
    </HeaderContainer>
}