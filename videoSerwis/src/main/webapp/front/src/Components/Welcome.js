
import React from "react";
import {Jumbotron} from "react-bootstrap";

class Welcome extends React.Component{

    render() {
        return (

            <Jumbotron className = "bg-light text-dark">
                <h1>Witaj na stronie rezerwacji naszego hotelu!</h1>
                <p>
                    Po rejestracji i zalogowaniu będziesz wstanie wybrać odpowiadający ci pokój i następnie
                    złożyć rezerwacje.
                </p>

            </Jumbotron>

        );
    }
}
export default Welcome;