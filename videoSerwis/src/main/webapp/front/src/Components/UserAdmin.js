import React from "react";
import {Nav, Card,} from "react-bootstrap";
import {ip} from "./config/config.json"

class UserAdmin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selected:"1",
            userId: '',
            text: '',
            users: []
        };


    }

 


    render() {
        return (

            <Card className={"border border-light bg-light text-black"}>
               <Card.Header>

               </Card.Header>
                <Card.Body>

                </Card.Body>

            </Card>

        );
    }

}


export default UserAdmin;