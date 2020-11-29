import React from "react";
import {Navbar,Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBarUser extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

            user: ''

        }

    }

    componentDidMount(){
        this.state.user = localStorage.getItem('loggedUser')

        if ('null' !== this.state.user.userId && typeof this.state.user.userId !== "undefined"
            && this.state.user.role !== null) {
            window.location = "/login"
        }
        if ('ADMIN' === localStorage.getItem('typeOfUser') || 'HEADADMIN' === localStorage.getItem('typeOfUser') ) {
            window.location = "/admin"
        }

    }

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Link to={"/user"} className={"navbar-brand"}>
                    RTMPStreamer
                </Link>
                <Nav className="mr-auto">
                    <Link to="/user/profil" className={"nav-link"}>Profil Uzytkonwika</Link>
                    <Link to="/user/videoslist" className={"nav-link"}>Szukaj filmów</Link>
                    <Link to="/user/startStream" className={"nav-link"}>Rozpocznij strumień</Link>
                    <Link to="/loggout" className={"nav-link"} style={{ marginRight: "auto" }}>Wyloguj</Link>
                </Nav>
            </Navbar>
        );
    }

}

export default NavigationBarUser;