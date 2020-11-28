import React from "react";
import { withRouter } from "react-router";
import axios from 'axios';
import {Nav, Card,} from "react-bootstrap";
import Avatar from "react-avatar";

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

    handleSelect =(eventKey)=>{
        this.setState({
            selected: eventKey
        })
    }


    render() {
        return (

            <Card className={"border border-light bg-light text-black"}>
               <Card.Header>
                   <Nav variant="tabs" defaultActiveKey="#profil" onSelect={this.handleSelect}>
                       <Nav.Item>
                           <Nav.Link eventKey={"1"} href="#profil">Użytkonik</Nav.Link>
                       </Nav.Item>
                       <Nav.Item>
                           <Nav.Link eventKey={"2"}  href="#videos">Filmy użytkonika</Nav.Link>
                       </Nav.Item>
                   </Nav>
               </Card.Header>
                <Card.Body>
                    {this.state.selected==="1" ?
                    <div>
                        Wybrano jeden
                    </div>:
                        <div>
                            Wybrano dwa
                        </div>
                    }
                </Card.Body>

            </Card>

        );
    }

}


export default UserAdmin;