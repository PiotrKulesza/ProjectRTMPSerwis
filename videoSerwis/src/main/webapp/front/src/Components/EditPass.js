import React from "react";
import axios from 'axios';
import {Alert, Button, Card, Col, Form, ListGroup} from "react-bootstrap";
import {ip} from "./config/config.json"

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
                url:'http://'+ip+':8080/putPassword?newPass='
                    +this.state.newPass
                    +'&oldPass='
                    +this.state.oldPass
                    +'&userId='
                    +this.state.userId,
            }).then(response => response.data)
                .then((data) =>{
                    this.setState({returnString: data});
                    alert(this.state.returnString)
                    if(this.state.returnString ===0)
                        window.location = "/"+this.state.userType+"/profil";
                });
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
                            <Form.Group as={Col}>
                                <Form.Label>Stare Hasło</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    autoComplete={"off"}
                                    name={"oldPass"}
                                    value={this.state.oldPass}
                                    onChange={this.valueChange}
                                    placeholder="password"
                                    className={"bg-light text-black"}

                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Nowe hasło</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    autoComplete={"off"}
                                    name={"newPass"}
                                    value={this.state.newPass}
                                    onChange={this.valueChange}
                                    placeholder="password"
                                    className={"bg-light text-black"}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Powtórz nowe hasło</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    autoComplete={"off"}
                                    name={"newPassRep"}
                                    value={this.state.newPassRep}
                                    onChange={this.valueChange}
                                    placeholder="password"
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
                    <CheckIfNotMatch newPass={this.state.newPass} newPassRep={this.state.newPassRep}/>
                    <PutReturnAlert returnString ={this.state.returnString}/>
                </Form>
            </Card>
        );
    }
}

const PutReturnAlert = (props) => {
    if(props.returnString===1){
        return <AlertIfOldPassNotMatch />
    }else if(props.returnString===2) {
        return <AlertIfUserNotMatch />
    }else{
        return <EmptyDiv />
    }
}

const AlertIfOldPassNotMatch = () => {
    return<div>
        <Alert  variant={"danger"}>
            Podano nie właściwe stare hasło
        </Alert></div>

}

const AlertIfUserNotMatch = () => {
    return<div>
        <Alert  variant={"danger"}>
            Oj coś jest nie tak zostaniesz wylogowany.
            {window.location = "loggout"}
        </Alert></div>
}

const CheckIfNotMatch = (props) =>{
    if(props.newPass!==props.newPassRep){
        return <AlertIfPassNotMatch />
    }else {
        return <EmptyDiv/>
    }
}

const AlertIfPassNotMatch = () => {
    return<div>
        <Alert  variant={"danger"}>
            Hasła nie są identyczne
        </Alert></div>
}

const EmptyDiv = () => {
    return<div>
    </div>
}

export default EditPass;