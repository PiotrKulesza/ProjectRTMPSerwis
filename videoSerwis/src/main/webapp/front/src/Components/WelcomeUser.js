import React from "react";
import {Jumbotron} from "react-bootstrap";

class WelcomeUser extends React.Component{

    render() {
        return (
            <Jumbotron className = "bg-light text-dark">
                <h1>Witaj użytkowniku!</h1>
                <p>
                    Teraz po zalogowaniu możesz:
                    <ol>
                        <li>Edytować swoje dane osobowe</li>
                        <li>Wyszukiwać trwajace strumienie</li>
                        <li>Startować i kończyć włąsne strumienie wideo</li>
                    </ol>
                </p>

            </Jumbotron>

        );
    }
}

export default WelcomeUser;