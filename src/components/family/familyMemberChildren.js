import React, {Component} from 'react'
import FamilyMember from './familyMember'

class FamilyMemberChildren extends Component {
    render() {
        return (
        (
            this.props.descendants &&
            this.props.descendants.length>0 &&
            this.props.expanded
        )?
            <ul>
                    {this.props.descendants.map(member=>
                        <FamilyMember
                            key={member.key}
                            member={member}
                            parent={member.parent}
                            getDescendants={this.props.getDescendants}
                            descendants={this.props.getDescendants(member.key)}
                            onAdd={this.props.onAdd}
                        />
                    )}
            </ul> :
            null
        );
    }
}

export default FamilyMemberChildren
