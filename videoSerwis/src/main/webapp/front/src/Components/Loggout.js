import React from "react";
import {Navbar,Nav} from "react-bootstrap";

class Loggout extends React.Component{

    componentDidMount(){
        localStorage.clear();
        window.location = "/login"


    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">


            </Navbar>
        );
    }

}

export default Loggout;