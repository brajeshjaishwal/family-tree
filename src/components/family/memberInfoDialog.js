import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Form, Button, Modal, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { bindActionCreators } from 'redux';
import { addFamilyMemberAction } from '../../actions/family';

class MemberInfoDialog extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            relation: '',
            parent: this.props.member.key,
        };
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    close = () => {
        this.props.hideDialog();
        this.setState({name: '',relation: ''})
    }

    saveAndClose = async () => {
        let { name, relation, parent } = this.state
        await this.props.addMember({name, relation, parent})
        if(this.props.success)
            this.props.hideDialog()
        this.setState({name: '', relation: ''})
    }

    render() {
        return (
            <Modal open={this.props.dialogVisible}>
                <Modal.Header>
                    <Header>Family member information</Header>
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input
                            name='name'
                            label='Name'
                            value={this.state.name}
                            placeholder="Enter name"
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            name='relation'
                            label='Relation'
                            value={this.state.relation}
                            placeholder="Enter relation"
                            onChange={this.handleChange}
                        />
                    </Form>
                {this.props.error && <span style={{color:'red'}}>{this.props.error}</span>}
                </Modal.Content>
                <Modal.Actions>
                    <Button type="submit" primary 
                        onClick={this.saveAndClose} 
                        loading={this.props.loading === this.props.member.key}>Save And Close</Button>
                    <Button onClick={this.close} secondary>Close</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    console.log('memberInfoDialog, mapStateToProps', state)
    return {
        loading: state.family.loading,
        error: state.family.error,
        success: state.family.success,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addMember: bindActionCreators(addFamilyMemberAction, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MemberInfoDialog)