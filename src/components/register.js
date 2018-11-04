import React, {Component} from 'react'
import {Form, Button, Modal} from 'semantic-ui-react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { registerUserAction } from '../actions/auth';

class RegisterComponent extends Component {
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
        event.preventDefault()
        console.log(this.state.name)
        if(!this.state.name || !this.state.password)
        {
            alert('please enter required values.')
            return
        }
        this.setState({open: false})
        await this.props.registerUser({name: this.state.name, password: this.state.password})
        let token = sessionStorage.getItem('token')
        if(token)
            this.props.history.push('/')
    }

    render() {
        return (
            <Modal open={this.state.open} closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header>Registration Information</Modal.Header>
                <Modal.Content>
                    <Form.Input name="name" fluid onChange={this.onChangeHandler} placeholder='Enter your name'/>
                    <Form.Input name="password" type='password' fluid onChange={this.onChangeHandler} placeholder='Enter your password'/>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick = {this.onSubmitHandler}>Login</Button>
                    <Button onClick = {this.onSubmitHandler}>Register</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerUser: bindActionCreators(registerUserAction, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(RegisterComponent)