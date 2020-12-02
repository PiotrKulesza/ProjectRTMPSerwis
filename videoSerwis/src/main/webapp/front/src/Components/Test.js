import React from "react";
import {Jumbotron} from "react-bootstrap";

class Test extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

            user: ''

        }

    }

    componentDidMount(){
        this.state.user = localStorage.getItem('loggedUser')

        if(localStorage.getItem('state') === 'BANNED' || localStorage.getItem('state') === 'INACTIVATED' ){
            window.location = "/loggout"
        }


        if ('null' !== this.state.user.userId && typeof this.state.user.userId !== "undefined"
            && this.state.user.role !== null) {
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