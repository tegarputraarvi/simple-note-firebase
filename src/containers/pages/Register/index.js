import React, { Component, Fragment } from 'react';
import './Register.scss';
import Button from '../../../components/atoms/Button';
import { registerUserAPI } from '../../../config/redux/action';
import { connect } from 'react-redux';

class Register extends Component {

  state = {
    email: '',
    password: '',
  }

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleRegisterSubmit = async () => {
    const { email, password } = this.state;
    
    const res = await this.props.registerAPI({email, password}).catch(err => err);
    if (res) {
      console.log("Register Successfully...");
      this.setState({
        email: '',
        password: '',
      })
    }
    else {
      console.log("Register Failed...");
    }
  }

  render() {
    return (
      <Fragment>
        <div className="auth-container">
          <div className="auth-card">
            <p className="auth-title">Register Page</p>
            <input className="input" id="email" placeholder="Email..." type="text" onChange={this.handleChangeText} value={this.state.email} />
            <input className="input" id="password" placeholder="Password..." type="password" onChange={this.handleChangeText} value={this.state.password} />
            <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading}/>
          </div>
        </div>
      </Fragment>
    )
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);