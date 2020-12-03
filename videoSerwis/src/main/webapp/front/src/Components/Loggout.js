import React from "react";
import {Navbar,Nav} from "react-bootstrap";

class Loggout extends React.Component{

    componentDidMount(){
        localStorage.clear();
        window.location = "/login"
    }

    render() {
        return (
            <Navbar bg="light" variant="light">
            </Navbar>
        );
    }
}

export default Loggout;