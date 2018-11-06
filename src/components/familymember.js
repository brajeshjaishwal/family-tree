import React, {Component} from 'react'
import FamilyMemberChildren from './familyMemberChildren'
import MemberInfoDialog from './memberInfoDialog'
import { Button, List, Segment, Divider } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'
import 'semantic-ui-css/semantic.min.css'

class FamilyMember extends Component {

    constructor(props){
        super(props);
        this.state = {
            dialogVisible: false,
            expanded: false,
        }
    }

    showDialog = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        this.setState({dialogVisible: true});
    }

    hideDialog = () =>{
        this.setState({dialogVisible: false});
    }

    handleExpand = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({expanded: !this.state.expanded})
    }

    addDescendant = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("adding new descendant for key: ",this.props.member.key)
        const member = {
            name: "temp",
            relation: "temp relation",
            parent: this.props.member.key
        }
        this.props.onAdd(member);
    }

    render() {
        return (
                <List.Item >
                    <Divider hidden></Divider>
                    <List.Content>
                            <Segment>
                                <Button icon={ this.state.expanded ? 'caret down' : 'caret right'} 
                                            floated='left' size='mini' circular onClick={this.handleExpand} />    
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
                    <FamilyMemberChildren
                        expanded={this.state.expanded}
                        descendants={this.props.descendants}
                        getDescendants={this.props.getDescendants}
                        onAdd={this.props.onAdd}
                    />
                    <MemberInfoDialog
                        dialogVisible={this.state.dialogVisible}
                        onAdd={this.props.onAdd}
                        showDialog={this.showDialog}
                        hideDialog={this.hideDialog}
                        member={this.props.member}
                    />
                </List.Item>
        );
    }
}

export default FamilyMember