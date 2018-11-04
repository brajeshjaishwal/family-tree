import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react';

class FamilyMemberComponent extends Component {
    render() {
        return (
            <div>Family Member</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FamilyMemberComponent)