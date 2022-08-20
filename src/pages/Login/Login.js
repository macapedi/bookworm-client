import "./Login.scss";
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Input from "../../components/Input/Input";
import axios from "axios";
import superWorm from "../../assets/images/superWorm.png"
class Login extends Component {
    state = {
        error: "",
        success: false,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('https://bookworm-capstone-api.herokuapp.com/api/users/login', {
                email: event.target.email.value,
                password: event.target.password.value,
            })
            .then((response) => {

                this.props.loginHandler();

                sessionStorage.setItem("token", response.data.token);

                console.log("logged in")
                this.props.routerProps.history.push("/books");

               
                // this.setState({ success: true });
                

            })
            .catch((error) => {
                this.setState({ error: error.response ? error.response.data : error.message });
            });
        
    };

    render() {

        return (
            <main className="login-page">
                <div className="login-page__wrapper">
                    <div>
                        <div className="intro-container">
                            <h1 className="login-page__title">Welcome to BOOKWORM!</h1>
                            <div className="badge-text-wrapper">
                                <img src={superWorm} className="badge badge-login"></img>
                                <p>Devour 12 books or more per year</p>
                            </div>
                        </div>
                    </div>
                    <form className="login" onSubmit={this.handleSubmit}>
                        <h1 className="login__title">Log in</h1>

                        <Input type="text" name="email" label="Email" />
                        <Input type="password" name="password" label="Password" />

                        <button className="login__button">Log in</button>
                        {/* {this.state.success && <Redirect to="/books" />} */}
                        <p>
                            Need an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </form>
                </div>
            </main>
        );
    }
}

export default Login;