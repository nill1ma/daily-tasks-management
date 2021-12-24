import { useEffect, useState } from "react";
import { HeaderContainer, Item } from "./styles";

export default function Header() {

    const [tabs, setTabs] = useState([
        { id: 1, label: 'Create Boards', active: false, to: "/create" },
        { id: 2, label: 'Boards', active: false, to: "/" }
    ])

    const handleTabs = (id: number) => {
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