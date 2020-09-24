import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap';

const MenuActionContainer = styled.div`
  margin: 0 0 0 20px;
  font-size: 20px;
  color: grey;
  display: flex;
  justify-content: space-between;
`;

const MenuAction = styled.i`
  cursor: pointer;

  :hover {
    color: black;
  }
`;

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link href="/admin/dashboard">
              <a className="h4 mb-0 text-dark text-uppercase d-none d-lg-inline-block">
                /{this.props.brandText}
              </a>
            </Link>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" />
                </InputGroup>

                <Nav className="align-items-center d-none d-md-flex" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <i className="fa fa-cog" style={{ color: "grey", fontSize: "20px" }} />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem className="noti-title" header tag="div">
                        <h6 className="text-overflow m-0">Setting items</h6>
                      </DropdownItem>
                      <Link href="/admin/profile">
                        <DropdownItem>
                          <i className="ni ni-single-02" />
                          <span>Setting #1</span>
                        </DropdownItem>
                      </Link>
                      <Link href="/admin/profile">
                        <DropdownItem>
                          <i className="ni ni-settings-gear-65" />
                          <span>Settings #2</span>
                        </DropdownItem>
                      </Link>
                      <DropdownItem divider />
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="ni ni-user-run" />
                        <span>Logout</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>

                <MenuActionContainer>
                  <MenuAction className="fa fa-question" />
                </MenuActionContainer>
              </FormGroup>
            </Form>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm">
                      <img
                        alt="..."
                        src={require('assets/img/brand/logo.jpg')}
                      />
                    </span>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <Link href="/admin/profile">
                    <DropdownItem>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                  </Link>
                  <Link href="/admin/profile">
                    <DropdownItem>
                      <i className="ni ni-calendar-grid-58" />
                      <span>Activity</span>
                    </DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
