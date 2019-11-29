import React, { Component } from 'react';
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/user.actions";
import './login-page.css';

class LoginPage extends Component {

    constructor(props){
        super(props);
        
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();
        const { signIn } = this.props;
        const email = this.emailRef.current.value;
        const password = this.passwordRef.current.value;

        //very simple validation
        if( email.trim().length === 0 || password.trim().length === 0 ){
            return;
        }

        signIn(email, password);
    }
    
    render(){
        return(
            <div className="signup-container">
                <h1>Login</h1>
                <form className="signup-form">
                    <input type="email" id="email" placeholder="Email" ref={this.emailRef}/>
                    <input type="password" id="password" placeholder="Password" ref={this.passwordRef}/>
                    <input type="button" value="Login" onClick={ this.submitHandler }/>
            </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signIn: (email, password) => dispatch(signIn({email, password}))
})

export default connect(null, mapDispatchToProps)(LoginPage);