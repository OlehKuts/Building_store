import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { DatabaseFillCheck, Wrench } from "react-bootstrap-icons";
import { getDailyIncomeSum } from "../store/incomeSlice";
import { useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";

export const AppNavbar = () => {
  const totalDailySum = useSelector(getDailyIncomeSum);
  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        className="mb-3"
        sticky="top"
        style={{ width: "100%" }}
      >
        <Container>
          <Navbar.Brand href="#home">
            <Wrench
              color="white"
              size={24}
              className="d-inline-block align-top mr-3"
            />
            <span style={{ margin: "auto 10px" }}>Building store</span>
          </Navbar.Brand>

          <Nav className="me-auto" style={{ margin: "0 30rem 0 12rem" }}>
            <Nav.Link as={NavLink} to="/">
              Головна
            </Nav.Link>
            <Nav.Link as={NavLink} to="/newArticle">
              Додати товар
            </Nav.Link>
            <Nav.Link as={NavLink} to="/expenses">
              Витрати
            </Nav.Link>
            <Nav.Link as={NavLink} to="/incomes">
              Доходи
            </Nav.Link>
            <Nav.Link as={NavLink} to="/statistic">
              Статистика
            </Nav.Link>
            <NavDropdown title="Налаштування" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/settings/basicParams">
                Базові параметри
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/settings/dataClearance">
                Очищення даних
              </NavDropdown.Item>
            </NavDropdown>
            <Navbar.Text style={{ marginLeft: "150px" }}>
              <DatabaseFillCheck
                color="goldenRod"
                style={{ marginBottom: "5px", cursor: "pointer" }}
                title="Виручка за сьогодні"
              />
              <span className="totalDailySum">{totalDailySum} грн</span>
            </Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
