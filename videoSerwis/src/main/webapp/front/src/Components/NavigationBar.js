import React from "react";
import {Navbar,Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }

    componentDidMount() {

        if(localStorage.getItem('state') === 'BANNED' || localStorage.getItem('state') === 'INACTIVATED' ){
            window.location = "/loggout"
        }
        if ('ADMIN' === localStorage.getItem('typeOfUser') || 'HEAD_ADMIN' === localStorage.getItem('typeOfUser') ) {
            window.location = "/admin"
        }else
        if ('USER' === localStorage.getItem('typeOfUser') || 'MODERATOR' === localStorage.getItem('typeOfUser') ) {
            window.location = "/user"
        }

    }

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Link to={""} className={"navbar-brand"}>
                    RTMPStreamer
                </Link>
                <Nav className="mr-auto">
                    <Link to="/login" className={"nav-link"}>Logowanie</Link>
                    <Link to="/register" className={"nav-link"}>Rejestracja</Link>
                    <Link to={"/videoslist"} className={"nav-link"}>Szukaj filmów</Link>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;