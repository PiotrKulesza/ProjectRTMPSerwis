import React from "react";
import {Navbar,Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBarAdmin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        if(localStorage.getItem('state') === 'BANNED' || localStorage.getItem('state') === 'INACTIVATED' ){
            window.location = "/loggout"
        }

        if ('USER' === localStorage.getItem('typeOfUser') || 'MODERATOR' === localStorage.getItem('typeOfUser') ) {
            window.location = "/user"
        }else if (null === localStorage.getItem('typeOfUser')){
            window.location = "/loggout"
        }
    }

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Link to={"/admin"} className={"navbar-brand"}>
                    RTMPStreamer
                </Link>
                <Nav className="mr-auto">
                    <Link to="/admin/profil" className={"nav-link"}>Profil</Link>
                    <Link to="/admin/users" className={"nav-link"}>Lista użytkoników</Link>
                    <Link to="/loggout" className={"nav-link"}>Wyloguj</Link>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBarAdmin;