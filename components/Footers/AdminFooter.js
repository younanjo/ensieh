/*eslint-disable*/
import React from 'react';

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer" style={{ backgroundColor: '#fff' }}>
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © Avesta consulting {new Date().getFullYear()}{' '}
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
