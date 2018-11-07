import React, {Component} from 'react'
import {connect} from 'react-redux'
import FamilyMemberChildren from './familyMemberChildren'
import MemberInfoDialog from './memberInfoDialog'
import { Button, List, Segment, Divider } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'
import 'semantic-ui-css/semantic.min.css'
import { bindActionCreators } from 'redux';
import { fetchFamilyMembersAction } from '../../actions/family';

const expandState = { expand: 'expand', collapse: 'collapse'}
class FamilyMember extends Component {
    constructor(props){
        super(props);
        this.state = {
            dialogVisible: false,
            expanded: expandState.collapse,
            key: this.props.member.key
        }
    }

    showDialog = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        this.setState({expanded: expandState.collapse})
        this.setState({dialogVisible: true});
    }

    hideDialog = () =>{
        this.setState({dialogVisible: false});
    }

    handleExpand = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let expanded = this.state.expanded === expandState.collapse ? expandState.expand : expandState.collapse
        this.setState({expanded})
        if(expanded === expandState.expand) {
            this.props.fetchMembers(this.state.key)
        }
    }

    render() {
        return (
                <List.Item >
                    <Divider hidden></Divider>
                    <List.Content>
                            <Segment>
                                <Button 
                                    icon = { this.state.expanded === expandState.expand ? 'caret down' : 'caret right'} 
                                    floated='left' size='mini' circular 
                                    loading = { this.props.loading }
                                    onClick={this.handleExpand} />    
                                <a data-tip data-for={`toolTip-${this.props.member.key}`} href='false'>{this.props.member.name}</a>
                                <Button icon='plus' onClick={this.showDialog} circular size='mini' floated='right' />
                            </Segment>
                            <ReactTooltip id={`toolTip-${this.props.member.key}`} border={true} effect='solid' type={'light'}>
                                <div>
                                    <h3>{this.props.member.relation}</h3>
                                    <p>{this.props.member.name}</p>
                                </div>
                            </ReactTooltip>
                    </List.Content>
                    <FamilyMemberChildren expanded={this.state.expanded} />
                    <MemberInfoDialog
                        dialogVisible={this.state.dialogVisible}
                        showDialog={this.showDialog}
                        hideDialog={this.hideDialog}
                        member={this.props.member}
                    />
                </List.Item>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMembers: bindActionCreators(fetchFamilyMembersAction, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(FamilyMember)