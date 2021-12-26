import { useState } from "react";
import { HeaderContainer, Item } from "./styles";

export default function Header() {

    const [tabs, setTabs] = useState([
        { id: '1', label: 'Boards', active: false, to: "/" },
        { id: '2', label: 'Board', active: false, to: "/project/1" }
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
        {tabs.map(tab => {
            return <Item onClick={() => handleTabs(tab.id)} active={tab.active} to={tab.to}>
                {tab.label}
            </Item>
        })}
    </HeaderContainer>
}