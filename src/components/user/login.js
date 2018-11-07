import React, {Component} from 'react'
import {Form, Button, Modal} from 'semantic-ui-react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { loginUserAction, registerUserAction } from '../../actions/auth'

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            password: '',
            open: true,
            registered: false,
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
        console.log(token)
        if(token && token !== null && token !== undefined && token !== 'undefined') {
            this.setState({open: false})       
            this.props.history.push('/Family')
        }
    }

    render() {
        return (
            <Modal open={this.state.open} closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header>Login Information</Modal.Header>
                <Modal.Content>
                    <Form.Input name="name" fluid onChange={this.onChangeHandler} placeholder='Enter your name'/>
                    <Form.Input name="password" type='password' fluid onChange={this.onChangeHandler} placeholder='Enter your password'/>
                    {this.props.error && <div>{this.props.errMessage + this.props.message}</div>}
                    {this.props.registered && <div>Your are registered now, please login.</div>}
                </Modal.Content>
                <Modal.Actions>
                    <Button name='login' 
                        onClick = {this.onSubmitHandler}
                        loading= { this.props.loading } >Login</Button>
                    <Button name='register' 
                        onClick = {this.onSubmitHandler}>Register</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.auth.error !== "",
        message: state.auth.error.message,
        errMessage: state.auth.error,
        loading: state.auth.loading,
        registered: state.auth.registered,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loginUser: bindActionCreators(loginUserAction, dispatch),
        registerUser: bindActionCreators(registerUserAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)