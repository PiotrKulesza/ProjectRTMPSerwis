import React from "react";
import {Navbar,Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBar extends React.Component{

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Link to={""} className={"navbar-brand"}>
                    RTMPStreamer
                </Link>
                <Nav className="mr-auto">
                    <Link to="login" className={"nav-link"}>Logowanie</Link>
                    <Link to="register" className={"nav-link"}>Rejestracja</Link>
                    <Link to={"videoslist"} className={"nav-link"}>Szukaj filmów</Link>
                </Nav>

            </Navbar>
        );
    }

}

export default NavigationBar;