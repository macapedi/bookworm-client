import "./Login.scss";
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Input from "../../components/Input/Input";
import axios from "axios";
class Login extends Component {
    state = {
        error: "",
        success: false,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post("http://localhost:8080/users/login", {
            email: event.target.email.value,
            password: event.target.password.value,
        })
        .then((response) => {
            sessionStorage.setItem("token", response.data.token);
            this.setState({ success: true });
        })
        .catch((error) => {
            this.setState({ error: error.response ? error.response.data : error.message });
        });
    };

    render() {
        return (
            <main className="login-page">
                <form className="login" onSubmit={this.handleSubmit}>
                    <h1 className="login__title">Log in</h1>
                    
                    <Input type="text" name="email" label="Email" />
                    <Input type="password" name="password" label="Password" />

                    <button className="login__button">Log in</button>
                    {this.state.success && <Redirect to="/books" />}
                </form>
                <p>
                    Need an account? <Link to="/signup">Sign up</Link>
                </p>
            </main>
        );
    }
}

export default Login;