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
            login: false,
            register: false,
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
        let elementName = event.target.name;
        this.setState({[elementName]: true})
        if(event.target.name === 'login') {
            await this.props.loginUser({name: this.state.name, password: this.state.password})
        }else {
            await this.props.registerUser({name: this.state.name, password: this.state.password})
        }
        let token = sessionStorage.getItem('token')
        this.setState({[elementName]: false})
        console.log(token)
        if(token && token !== null && token !== undefined && token !== 'undefined') {
            this.setState({open: false})       
            this.props.history.push('/Family')
        }
    }

    render() {
        let registered = this.props.registered || false

        return (
            <Modal open={this.state.open} closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header>User Information</Modal.Header>
                <Modal.Content>
                    <Form.Input name="name" fluid placeholder='Enter your name'
                        onChange={this.onChangeHandler}/>
                    <Form.Input name="password" type='password' fluid placeholder='Enter your password'
                        style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} />
                    { this.props.error && <span style={{color:'red'}}>{this.props.error}</span>}
                    { registered && <span style={{color:'green'}}>Now you are registered, please login to proceed.</span>}
                </Modal.Content>
                <Modal.Actions>
                    <Button name='login' primary
                        onClick = {this.onSubmitHandler}
                        loading= { this.props.loading && this.state.login} >Login</Button>
                    <Button name='register' secondary
                        onClick = {this.onSubmitHandler}
                        loading= { this.props.loading && this.state.register } >Register</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.auth.error,
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