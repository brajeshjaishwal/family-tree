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
                {this.props.descendants.map(m=> <FamilyMember key={m.key} member={m} parent={m.parent} />)}
            </ul> :
            null
        );
    }
}

export default FamilyMemberChildren
