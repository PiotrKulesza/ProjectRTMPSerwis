import React from "react";
import {Button, Card, Col, Form, Alert} from "react-bootstrap";
import axios from "axios";
import {ip} from "./config/config.json"

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            rep_password:'',
            name: '',
            surname: '',
            telephone:'',
            login:'',
            postReturn:''
        }
        this.valueChange = this.valueChange.bind(this)
        this.submitRegister = this.submitRegister.bind(this)
    }

    submitRegister(event){
        const params = new URLSearchParams();
        params.append('email',this.state.email);
        params.append('password',this.state.password);
        params.append('name',this.state.name);
        params.append('surname',this.state.surname);
        params.append('telephone',this.state.telephone);
        params.append('address',this.state.address);
        params.append('login',this.state.login);
        if(this.state.password===this.state.rep_password){
            axios({
                method:'post',
                url:'http://'+ip+':8080/postUser',
                data: params
            }).then(response => response.data)
                .then((data) =>{
                    this.setState({postReturn: data});
                    if(this.state.postReturn !== 1 && this.state.postReturn !== 2 && this.state.postReturn !=='')
                        window.location = "http://"+ip+":3000/laststep/"+this.state.postReturn+"/"+this.state.email
                });
        }
        event.preventDefault();
    }

    valueChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render() {
        return(
            <Card className="border border-light bg-light text-black">
                <Card.Header>Zarejestruj się</Card.Header>
                <Form onSubmit={this.submitRegister}>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Adres Email</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    name={"email"}
                                    value={this.state.email}
                                    onChange={this.valueChange}
                                    placeholder="name@example.com"
                                    className={"bg-light text-black"}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Login</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name={"login"}
                                    value={this.state.login}
                                    onChange={this.valueChange}
                                    placeholder="login"
                                    className={"bg-light text-black"}

                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    name={"password"}
                                    value={this.state.password}
                                    onChange={this.valueChange}
                                    placeholder="Password"
                                    className={"bg-light text-black"}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Powtórz Hasło</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    name={"rep_password"}
                                    value={this.state.rep_password}
                                    onChange={this.valueChange}
                                    placeholder="Password"
                                    className={"bg-light text-black"}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Imię</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name={"name"}
                                    value={this.state.name}
                                    onChange={this.valueChange}
                                    placeholder="Jan"
                                    className={"bg-light text-black"}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name={"surname"}
                                    value={this.state.surname}
                                    onChange={this.valueChange}
                                    placeholder="Kowalski"
                                    className={"bg-light text-black"}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Numer Telefonu</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name={"telephone"}
                                    value={this.state.telephone}
                                    onChange={this.valueChange}
                                    placeholder="123456789"
                                    className={"bg-light text-black"}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            Rejestruj
                        </Button>
                    </Card.Footer>
                    <CheckIfNotMatch pass={this.state.password} rep_pass={this.state.rep_password}/>
                    <PostReturnAlert postReturn={this.state.postReturn}/>
                </Form>
            </Card>
        );
    }
}

const PostReturnAlert = (props) => {
    if(props.postReturn===1){
        return <AlertIfLoginExist />
    }else if(props.postReturn===2) {
        return <AlertIfEmailExist />
    }else{
        return <EmptyDiv />
    }
}

const AlertIfLoginExist = () => {
    return<div>
        <Alert  variant={"danger"}>
            Taki login już istnieje
        </Alert></div>

}

const AlertIfEmailExist = () => {
    return<div>
        <Alert  variant={"danger"}>
            Taki email już istnieje
        </Alert></div>

}


const CheckIfNotMatch = (props) =>{
    if(props.pass!==props.rep_pass){
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

export default Register;