import React, { Component } from 'react'
import { connect } from 'react-redux'
import FamilyMember from './familyMember'

class FamilyContainer extends Component {
  render() {
    console.log(this.props.root)
    return (
          <div>
            <div className="ui relaxed divided list">
              <ul>
                {
                  this.props.root.map(member => <FamilyMember key={member.key} member={member}/>)
                }
              </ul>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('family', state)
  return {
    root: state.family.family
  }
}
export default connect(mapStateToProps)(FamilyContainer)
