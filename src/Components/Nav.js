import styled from 'styled-components'
import { Link } from 'preact-router/match'
import Logo from '../assets/logo.svg'

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
`

const List = styled.ul`
  display: flex;
  justify-content: flex-end;
`

const LogoWrapper = styled(Link)`
  opacity: 1;
  border: none;
  &:after {
    display: none;
  }
`

const Item = styled.li`
  &:not(:last-child) {
    margin-right: 10px;
  }
`

export default () => (
  <header>
    <Nav>
      <LogoWrapper href="/">
        <img src={Logo} width="70" alt="Logo" />
      </LogoWrapper>
      <List>
        <Item>
          <Link href="/speakers">
            <span>Speakers</span>
          </Link>
        </Item>
        <Item>
          <Link href="/categories">
            <span>Categories</span>
          </Link>
        </Item>
        <Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/SaraVieira/awesome-talks"
          >
            <span>GitHub</span>
          </a>
        </Item>
      </List>
    </Nav>
  </header>
)
