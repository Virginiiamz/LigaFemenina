/**
 * @fileoverview Componente de navegación principal de la aplicación Liga Femenina
 * @author Tu Nombre
 * @version 1.0.0
 */

// Importaciones de MDB React UI Kit para la navegación
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

/**
 * @typedef {Object} MenuProps
 * No requiere props ya que es un componente de navegación global
 */

/**
 * Componente de menú principal que proporciona navegación a todas las secciones
 * @component
 * @returns {JSX.Element} Barra de navegación responsive con dropdowns
 */
function Menu() {
    /**
     * Estado para controlar la apertura/cierre del menú en modo móvil
     * @type {[boolean, Function]} Estado y función para actualizar
     */
    const [openBasic, setOpenBasic] = useState(false);

    return (
        <MDBNavbar expand="lg" light bgColor="light">
            <MDBContainer fluid>
                {/* Logo y nombre de la aplicación */}
                <MDBNavbarBrand href="#">
                    <img src={logo} height="30" alt="" loading="lazy" />
                    Liga Femenina
                </MDBNavbarBrand>

                {/* Botón hamburguesa para modo móvil */}
                <MDBNavbarToggler
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setOpenBasic(!openBasic)}
                >
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>

                {/* Contenido del menú colapsable */}
                <MDBCollapse navbar open={openBasic}>
                    <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                        {/* Menú desplegable de Equipos */}
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                                    Equipos
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <Link to="/altaequipo" style={{ color: "#4f4f4f" }}>
                                        <MDBDropdownItem link>Alta de equipo</MDBDropdownItem>
                                    </Link>
                                    <Link to="/buscadorequipos" style={{ color: "#4f4f4f" }}>
                                        <MDBDropdownItem link>Buscador de equipos</MDBDropdownItem>
                                    </Link>
                                    <Link to="/listadoequipos" style={{ color: "#4f4f4f" }}>
                                        <MDBDropdownItem link>Listado de equipos</MDBDropdownItem>
                                    </Link>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>

                        {/* Menú desplegable de Jugadoras */}
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                                    Jugadoras
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <Link to="/altajugadora" style={{ color: "#4f4f4f" }}>
                                        <MDBDropdownItem link>Alta de jugadora</MDBDropdownItem>
                                    </Link>
                                    <Link to="/buscadorjugadoras" style={{ color: "#4f4f4f" }}>
                                        <MDBDropdownItem link>Buscador de jugadoras</MDBDropdownItem>
                                    </Link>
                                    <Link to="/graficajugadoras" style={{ color: "#4f4f4f" }}>
                                        <MDBDropdownItem link>Grafica de jugadoras</MDBDropdownItem>
                                    </Link>
                                    <Link to="/listadojugadoras" style={{ color: "#4f4f4f" }}>
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
