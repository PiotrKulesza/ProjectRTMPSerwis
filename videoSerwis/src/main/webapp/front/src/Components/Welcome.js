import React from "react";
import {Jumbotron} from "react-bootstrap";

class Welcome extends React.Component{

    render() {
        return (
            <Jumbotron className = "bg-light text-dark">
                <h1>Witaj w serwisie strumieniowania wideo!</h1>
                <p>
                    Aktualnie jesteś wstanie tylko oglądać strumienie wideo innych użytkowników.
                </p>
                <p>
                    Dla dodatkowych funkcjonalności zarejestruj się albo zaloguj.
                </p>
            </Jumbotron>
        );
    }
}

export default Welcome;