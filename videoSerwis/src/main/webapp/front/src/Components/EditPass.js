import React from "react";
import { withRouter } from "react-router";
import axios from 'axios';
import {Button, Card, Col, Form,ListGroup} from "react-bootstrap";
import Avatar from "react-avatar";

class EditPass extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            oldPass: '',
            newPass: '',
            newPassRep: '',
            returnString:'',
            userType:''
        };
        this.valueChange = this.valueChange.bind(this)
        this.submitChange = this.submitChange.bind(this)

    }
    valueChange  (event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    submitChange (event) {


        if(this.state.newPass===this.state.newPassRep)
            axios({
                method:'put',
                url:'http://localhost:8080/putPassword?newPass='
                    +this.state.newPass
                    +'&oldPass='
                    +this.state.oldPass
                    +'&userId='
                    +this.state.userId,
            }).then((data) =>{
                this.setState({returnString: data});
                if(this.state.returnString !== 1 && this.state.returnString !== 2 && this.state.returnString !=='')
                    window.location = "http://localhost:3000/profil/"

            });
        window.location = "/"+this.state.userType+"/profil";
        this.forceUpdate();
        event.preventDefault();
    }

    componentDidMount() {
        this.state.userId = localStorage.getItem('loggedUser')
        if ('USER' === localStorage.getItem('typeOfUser') && 'MODERATOR' === localStorage.getItem('typeOfUser')) {
            this.state.userType="user"
        }else{
            this.state.userType="admin"
        }
    }

    render() {
        return (
            <Card className={"border border-light bg-light text-black"}>

                <Form  onSubmit={this.submitChange} id={"searchFormId"}>
                    <Card.Body>
                        <Form.Row>

                            <Form.Group as={Col} controlId="formBasicPriceForFood">
                                <Form.Label>Nowe imię użytkonwika</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    autoComplete={"off"}
                                    name={"name"}
                                    value={this.state.name}
                                    onChange={this.valueChange}
                                    placeholder="name"
                                    className={"bg-light text-black"}

                                />

                            </Form.Group>

                        </Form.Row>
                        <Form.Row>

                            <Form.Group as={Col} controlId="formBasicPriceForFood">
                                <Form.Label>Stare Hasło</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    autoComplete={"off"}
                                    name={"name"}
                                    value={this.state.oldPass}
                                    onChange={this.valueChange}
                                    placeholder="password"
                                    className={"bg-light text-black"}

                                />

                            </Form.Group>

                        </Form.Row>
                        <Form.Row>

                            <Form.Group as={Col} controlId="formBasicPriceForFood">
                                <Form.Label>Nowe hasło</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    autoComplete={"off"}
                                    name={"name"}
                                    value={this.state.newPass}
                                    onChange={this.valueChange}
                                    placeholder="name"
                                    className={"bg-light text-black"}

                                />

                            </Form.Group>

                        </Form.Row>
                        <Form.Row>

                            <Form.Group as={Col} controlId="formBasicPriceForFood">
                                <Form.Label>Powtórz nowe hasło</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    autoComplete={"off"}
                                    name={"name"}
                                    value={this.state.newPassRep}
                                    onChange={this.valueChange}
                                    placeholder="name"
                                    className={"bg-light text-black"}

                                />

                            </Form.Group>

                        </Form.Row>
                    </Card.Body>
                    <Card.Footer>
                        <div >
                            <Button size="sm" variant="success" type="submit" style={{"textAlign":"center"}}>
                                Zmień
                            </Button>{" "}

                        </div>
                    </Card.Footer>

                </Form>




            </Card>
        );
    }

}



export default EditPass;