import React from "react";
import {Navbar,Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBarUser extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        if(localStorage.getItem('state') === 'BANNED' || localStorage.getItem('state') === 'INACTIVATED' ){
            window.location = "/loggout"
        }
        if ('ADMIN' === localStorage.getItem('typeOfUser') || 'HEAD_ADMIN' === localStorage.getItem('typeOfUser') ) {
            window.location = "/admin"
        }else if (null === localStorage.getItem('typeOfUser')){
            window.location = "/loggout"
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