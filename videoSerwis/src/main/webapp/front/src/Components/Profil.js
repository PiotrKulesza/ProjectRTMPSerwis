import React from "react";
import axios from 'axios';
import {Card,Table} from 'react-bootstrap';
import Avatar from "react-avatar";
import { FiEdit  } from 'react-icons/fi';

class Profil extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userId : '',
            userType:'',
            users: {}
        }

    }

    componentDidMount() {
        if ('USER' === localStorage.getItem('typeOfUser') && 'MODERATOR' === localStorage.getItem('typeOfUser')) {
            this.state.userType="user"
        }else{
            this.state.userType="admin"
        }


        this.state.userId = localStorage.getItem('loggedUser')

        axios({
            method:'get',
            url:'http://localhost:8080/getUsersById?userId='+this.state.userId,
        }).then(response => response.data)
            .then((data) =>{
                this.setState({users: data});
            });

    }

    render() {
        return (
            <Card className={"border border-light bg-light text-black"}>


                <Table border hover striped variant={"light"}>
                    <thead>
                    <Avatar name={this.state.users.login} size="50" round={true}></Avatar>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Email</td>
                        <td>{this.state.users.email}</td>
                    </tr>
                    <tr>
                        <td>Login</td>
                        <td>{this.state.users.login} <a href={"/"+this.state.userType+"/editLogin"}><FiEdit   /></a></td>
                    </tr>
                    <tr>
                        <td>Imię</td>
                        <td>{this.state.users.name} <a href={"/"+this.state.userType+"/editName"}><FiEdit   /></a></td>
                    </tr>
                    <tr>
                        <td>Nazwisko</td>
                        <td>{this.state.users.surname} <a href={"/"+this.state.userType+"/editSurname"}><FiEdit   /></a></td>
                    </tr>
                    <tr>
                        <td>Hasło</td>
                        <td>**** <a href={"/"+this.state.userType+"/editPass"}><FiEdit   /></a></td>
                    </tr>
                    <tr>
                        <td>Telefon</td>
                        <td>{this.state.users.telephone}<a href={"/"+this.state.userType+"/editTelephone"}><FiEdit   /></a></td>
                    </tr>


                    </tbody>
                </Table>


            </Card>
        );
    }

}

export default Profil;