import { Link } from 'gatsby'
import React from 'react'
import { Nav, Navbar, Container } from "react-bootstrap"
import styled from 'styled-components'
import colors from '../colors'
// @ts-ignore
import SiteLogo from '../images/logo.png'

const Wrapper = styled(Navbar)`
  height: 66px;

  .navbar-brand {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
    }
    /* font-weight: bold; */
  }

  .navbar-collapse {
    padding: 0px 10px;
    background-color: ${colors.light.background};
  }

  .navbar-collapse.show {
    z-index: 1000;
    border-bottom: 2px solid ${colors.light.backgroundAccent};
    border-radius: 5px;
  }
`

function Navigation() {
  return (
    <Wrapper expand="lg">
      <Container fluid>
        <Nav.Link as="div" href="#" style={{ padding: "0" }}>
          <Link className="navbar-brand" to="/">
            <img src={SiteLogo} alt="BrianMorrison.me Logo" height="40" width="40" /> Brian Morrison II
          </Link>
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navnav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end" as="ul">
            <Nav.Item>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/uses">Uses</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Wrapper>
  )
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/uses">Uses</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Navigation