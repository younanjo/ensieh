import React from 'react';
import Link from 'next/link';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Badge,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip,
} from 'reactstrap';
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from 'variables/charts.js';
import moment from 'moment';

import Header from 'components/Headers/Header.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: 'data1',
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === 'data1' ? 'data2' : 'data1',
    });
  };
  render() {
    const time = moment().format('YYYY-MM-DD HH:mm').toString();
    return (
      <>
        <Header />

        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="bg-white shadow">
                <CardHeader className="bg-transparent border-0" style={{    display: "flex", justifyContent: "space-between"}}>
                  <h3 className="text-dark mb-0">Projects</h3>
                  <input placeholder={"Filter projects"} style={{borderRadius: "20px", padding: "8px 15px", border: "1px solid gainsboro", fontSize: "10px", width: "200px"}}/>
                </CardHeader>
                <Table
                  className="align-items-center table-white table-flush"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Project name</th>
                      <th scope="col"># work items</th>
                      <th scope="col">Updated by</th>
                      <th scope="col">Last updated</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media>
                          <span
                            style={{ cursor: 'pointer' }}
                            className="mb-0 text-sm"
                          >
                            <Link href="/admin/icons">Project #1</Link>
                          </span>
                        </Media>
                      </th>
                      <td>10</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          NC
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">{time}</div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media>
                          <span
                            style={{ cursor: 'pointer' }}
                            className="mb-0 text-sm"
                          >
                            <Link href="/admin/icons">Project #2</Link>
                          </span>
                        </Media>
                      </th>
                      <td>4</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-success" />
                          NC
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">{time}</div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media>
                          <span
                            style={{ cursor: 'pointer' }}
                            className="mb-0 text-sm"
                          >
                            <Link href="/admin/icons">Project #3</Link>
                          </span>
                        </Media>
                      </th>
                      <td>14</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-danger" />
                          NC
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">{time}</div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media>
                          <span
                            style={{ cursor: 'pointer' }}
                            className="mb-0 text-sm"
                          >
                            <Link href="/admin/icons">Project #4</Link>
                          </span>
                        </Media>
                      </th>
                      <td>30</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-info" />
                          NC
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">{time}</div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media>
                          <span
                            style={{ cursor: 'pointer' }}
                            className="mb-0 text-sm"
                          >
                            <Link href="/admin/icons">Project #5</Link>
                          </span>
                        </Media>
                      </th>
                      <td>2</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          NC
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">{time}</div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

Dashboard.layout = Admin;

export default Dashboard;
