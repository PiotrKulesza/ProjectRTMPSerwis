import React from "react";
import {Navbar,Nav} from "react-bootstrap";
import {Link} from "react-router-dom";


class NavigationBarAdmin extends React.Component{

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
            window.location = "/loggout"
        }else
        if ('USER' === localStorage.getItem('typeOfUser') || 'MODERATOR' === localStorage.getItem('typeOfUser')) {
            window.location = "/user"
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