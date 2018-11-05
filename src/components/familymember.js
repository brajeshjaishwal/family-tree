import React, {Component} from 'react'
import FamilyMemberChildren from './familyMemberChildren'
import MemberInfoDialog from './memberInfoDialog'
import { Button, Grid, List, Card } from 'semantic-ui-react'
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
                <List.Item>
                    <Card onClick={this.showDialog}>
                        <Card.Content>
                            <Grid columns='3'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button icon={ this.state.expanded ? 'minus' : 'plus'} 
                                                size='mini' 
                                                circular 
                                                onClick={this.handleExpand} />
                                    </Grid.Column>
                                    <Grid.Column >{this.props.member.name}</Grid.Column>
                                    <Grid.Column>
                                        <Button onClick={this.showDialog} 
                                                circular size='mini'>Add</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card.Content>
                    </Card>
                    <FamilyMemberChildren
                        expanded={this.state.expanded}
                        descendants={this.props.descendants}
                        getDescendantsOfUUID={this.props.getDescendantsOfUUID}
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