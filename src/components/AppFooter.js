import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { PersonRolodex } from "react-bootstrap-icons";

export const AppFooter = () => {
  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        className="appFooter"
        sticky="bottom"
        style={{ width: "100%", padding: 0 }}
      >
        <Container>
          <Navbar.Brand href="#home" style={{ margin: "0 auto" }}>
            <span style={{ margin: "5px 10px 0px 0px" }}>© OK19</span>
            <PersonRolodex
              color="white"
              size={"24px"}
              style={{ marginBottom: "8px" }}
              className="d-inline-block"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};
