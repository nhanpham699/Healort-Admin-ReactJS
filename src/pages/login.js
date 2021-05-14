import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import TextField from '@material-ui/core/TextField';
import UserIcon from '../img/user.png';
import PassIcon from '../img/password.png';
import axios from 'axios';
import './login.css';

const cookies = new Cookies();

class Login extends Component{    
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }  

    componentDidMount(){
        if(cookies.get("adminId")){
            window.location.href = "/"
        }
    }

    login(event) {
        event.preventDefault()
        const { username, password } = event.target
        let response = {
            username: username.value,
            password: password.value
        }
        axios.post("http://localhost:8080/admins/login", response)
        .then(res => {
           if(res.data.err){
               alert("Login failed!")
           }else{
                let d = new Date();
                d.setTime(d.getTime() + (10000*60*1000));
                cookies.set('adminId', res.data.admin._id, { path: '/', expires: d }); 
                window.location.href = "/"
           }
        })
    }

    render(){
        return(   
            <div className="login">
                <div className="login-form">
                    <h1 className="login-title">LOG IN</h1>
                    <form onSubmit={(event) => this.login(event)}>
                        <div className="login-content">
                            <div className="username-layout">
                                <div><img className="user-icon form-icon" src={UserIcon} /></div>
                                <div className="username-text">
                                    <TextField id="username" name="username" label="Username" variant="outlined" />
                                    <span className="login-user-err"></span>
                                </div>
                            </div> 
                            <div className="password-layout">
                                <div><img className="pass-icon form-icon" src={PassIcon} /></div>
                                <div className="password-text">
                                    <TextField id="password" name="password" type="password" label="Password" variant="outlined" />
                                    <span className="login-pass-err"></span>
                                </div>
                            </div>
                        </div>
                        <div className="login-btn-layout">
                            <button type="submit" className="login-btn">LOG IN</button>
                        </div>
                        </form>
                </div>
            </div>
        )
    }
}
export default Login