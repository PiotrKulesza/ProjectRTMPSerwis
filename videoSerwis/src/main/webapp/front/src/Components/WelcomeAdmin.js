import React from "react";
import {Jumbotron} from "react-bootstrap";

class WelcomeAdmin extends React.Component{

    render() {
        return (
            <Jumbotron className = "bg-light text-dark">
                <h1>Witaj administratorze!</h1>
                <p>
                    Teraz po zalogowaniu możesz:
                    <ol>
                        <li>Edytować swoje dane osobowe
                        </li>
                        <li>Zmianiać stan użytkownika:
                            <ul>
                                <li>Bannowanie konta użytkownika</li>
                                <li>Aktywowanie konta użytkownika</li>
                                <li>Dezaktywowanie konta użytkownika</li>
                            </ul>
                        </li>
                        <li>Zmieniać rolę użytkownika:
                            <ul>
                                <li>Użytkownik</li>
                                <li>Moderator</li>
                                <li>Admin</li>
                            </ul>

                        </li>
                    </ol>
                </p>
            </Jumbotron>
        );
    }
}

export default WelcomeAdmin;