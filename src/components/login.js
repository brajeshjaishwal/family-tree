import React, {Component} from 'react'
import {Form, Button, Modal} from 'semantic-ui-react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { loginUserAction, registerUserAction } from '../actions/auth'

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            password: '',
            open: true,
        }
    }

    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmitHandler = async (event) => {
        console.log(this.state)
        event.preventDefault()
        if(!this.state.name || !this.state.password)
        {
            alert('please enter required values.')
            return
        } 
        if(event.target.name === 'login') {
            await this.props.loginUser({name: this.state.name, password: this.state.password})
        }else {
            await this.props.registerUser({name: this.state.name, password: this.state.password})
        }
        let token = sessionStorage.getItem('token')

        if(token) {
            this.setState({open: false})       
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <Modal open={this.state.open} closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header>Login Information</Modal.Header>
                <Modal.Content>
                    <Form.Input name="name" fluid onChange={this.onChangeHandler} placeholder='Enter your name'/>
                    <Form.Input name="password" type='password' fluid onChange={this.onChangeHandler} placeholder='Enter your password'/>
                    {this.props.error && <div>{this.props.message}</div>}
                </Modal.Content>
                <Modal.Actions>
                    <Button name='login' onClick = {this.onSubmitHandler}>Login</Button>
                    <Button name='register' onClick = {this.onSubmitHandler}>Register</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.auth.error !== "",
        message: state.auth.error.message,
        loading: state.auth.loading,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loginUser: bindActionCreators(loginUserAction, dispatch),
        registerUser: bindActionCreators(registerUserAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)