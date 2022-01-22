import { HeaderContainer, Item } from "./styles";

export default function Header() {

    const tabs = [{ id: '1', label: 'DTM', to: "/" }]

    return <HeaderContainer>
        {tabs.map(({ id, to, label }) => {
            return <Item key={id} to={to}>
                {label}
            </Item>
        })}
    </HeaderContainer>
}