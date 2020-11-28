import React from "react";
import {Button, Card, Col, Form, Alert} from "react-bootstrap";
import axios from "axios";

class StartStream extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            rep_password:'',
            name: '',
            surname: '',
            telephone:'',
            login:''
        }


    }



    render() {
        return(
            <Card className="border border-light bg-light text-black">

            </Card>
        );
    }

}



export default StartStream;