import React from "react";
import {Jumbotron} from "react-bootstrap";

class Test extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            userId: ''
        }
    }

    componentDidMount(){
        this.state.userId = localStorage.getItem('loggedUser')
        if(localStorage.getItem('state') === 'BANNED' || localStorage.getItem('state') === 'INACTIVATED' ){
            window.location = "/loggout"
        }
        if ('ADMIN' === localStorage.getItem('typeOfUser') || 'HEAD_ADMIN' === localStorage.getItem('typeOfUser') ) {
            window.location = "/admin"
        }else
        if ('USER' === localStorage.getItem('typeOfUser') || 'MODERATOR' === localStorage.getItem('typeOfUser') ) {
            window.location = "/user"
        }else{
            window.location = "/loggout"
        }
    }

    render() {
        return (
            <Jumbotron className = "bg-light text-dark">
            </Jumbotron>
        );
    }
}

export default Test;