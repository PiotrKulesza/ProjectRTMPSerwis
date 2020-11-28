import React from "react";
import {Jumbotron} from "react-bootstrap";
import axios from "axios";

class LastStep extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }

    }


    componentDidMount() {

            axios({
                method:'post',
                url:'http://localhost:8080/sendEmail?email='+this.props.match.params.email+
                '&userId='+this.props.match.params.userId
            })

    }


    render() {
        return (

            <Jumbotron className = "bg-light text-dark">
                <h1>Twoje konto już istnieje został tylko ostatni krok</h1>
                <p>
                    Na twój email został wysłany link aktywacyjny, kliknij go i aktywuj swoje konto.
                </p>

            </Jumbotron>

        );
    }
}
export default LastStep;