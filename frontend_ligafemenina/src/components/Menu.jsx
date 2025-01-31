import {
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Link } from "react-router";
import logo from "../assets/images/logo.png";

function Menu() {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <img src={logo} height="30" alt="" loading="lazy" />
          Liga Femenina
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Equipos
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to="/" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Alta de equipo</MDBDropdownItem>
                  </Link>
                  <Link to="/" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Listado de equipos</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Jugadoras
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Alta de jugadora</MDBDropdownItem>
                  <Link to="/" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Listado de jugadoras</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Menu;
