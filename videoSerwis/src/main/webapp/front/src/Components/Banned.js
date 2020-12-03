import React from "react";
import {Jumbotron} from "react-bootstrap";

class Banned extends React.Component{
    render() {
        return (
            <Jumbotron className = "bg-light text-dark">
                <h1>Zostałeś zbanowany!</h1>
                <p>
                    Skontaktuj się z administracją pod adresem: <b>testujemy4321@gmail.com</b>
                </p>
            </Jumbotron>
        );
    }
}

export default Banned;