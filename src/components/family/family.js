import React, { Component } from 'react'
import { connect } from 'react-redux'
import FamilyMember from './familyMember'

class FamilyContainer extends Component {

  render() {
    let roots = this.props.root.filter(m => m.parent === -1)
    return (
          <div>
            <div className="ui relaxed divided list">
              <ul>
                {
                  roots.map(member => <FamilyMember key={member.key} member={member}/>)
                }
              </ul>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    root: state.family.family
  }
}
export default connect(mapStateToProps)(FamilyContainer)
