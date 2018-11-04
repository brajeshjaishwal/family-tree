import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Icon, Button, Grid, Card } from 'semantic-ui-react';

class FamilyTreeComponent extends Component {
    render() {
        return (
            <List>
                <List.Item >
                <Icon name='plus icon' ></Icon>
                <List.Content >
                    <List.Header>Brajesh</List.Header>
                    <List.Description >Father</List.Description>
                    <List >
                        <List.Item>
                        <Card>
                            <Grid columns='3'>
                                <Grid.Row>
                                    <Grid.Column><Button icon='plus' compact circular></Button></Grid.Column>
                                    <Grid.Column width='20'>Brajesh Jaishwal</Grid.Column>
                                    <Grid.Column><Button compact>Add</Button></Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card>
                        </List.Item>
                    </List>
                </List.Content>
                </List.Item>
                <List.Item>
                <Icon name='plus icon' ></Icon>
                <List.Content>
                    <List.Header>Shakun</List.Header>
                    <List.Description>Mother</List.Description>
                </List.Content>
                </List.Item>
            </List>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FamilyTreeComponent)