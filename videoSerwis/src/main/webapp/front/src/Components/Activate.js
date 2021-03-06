import React from "react";
import {Jumbotron} from "react-bootstrap";
import axios from "axios";
import {ip} from "./config/config.json"

class Activate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
            axios({
                method:'put',
                url:'http://'+ip+':8080/putActivate?userId='+this.props.match.params.userId
            })
    }

    render() {
        return (
            <Jumbotron className = "bg-light text-dark">
                <h1>Twoje konto zostało aktywowane!</h1>
                <p>
                    Możesz się teraz zalogować.
                </p>
            </Jumbotron>
        );
    }
}

export default Activate;