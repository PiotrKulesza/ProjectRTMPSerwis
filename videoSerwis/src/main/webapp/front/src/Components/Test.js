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
        if ('null' !== this.state.userId || typeof this.state.userId !== "undefined") {
            window.location = "/login"
        }else
        if ('ADMIN' === localStorage.getItem('typeOfUser') || 'HEAD_ADMIN' === localStorage.getItem('typeOfUser') ) {
            window.location = "/admin"
        }else
        if ('USER' === localStorage.getItem('typeOfUser') || 'MODERATOR' === localStorage.getItem('typeOfUser') ) {
            window.location = "/user"
        }else{
            window.location = "/login"
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