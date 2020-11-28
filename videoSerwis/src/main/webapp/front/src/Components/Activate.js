import React from "react";
import {Jumbotron} from "react-bootstrap";
import axios from "axios";

class Activate extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }

    }


    componentDidMount() {

            axios({
                method:'put',
                url:'http://localhost:8080/putActivate?userId='+this.props.match.params.userId
            })

    }


    render() {
        return (

            <Jumbotron className = "bg-light text-dark">
                <h1>Twoje konto sostało aktywowane</h1>
                <p>
                    Możesz się teraz zalogować.
                </p>

            </Jumbotron>

        );
    }
}
export default Activate;