import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import FamilyMember from './familyMember'

class FamilyContainer extends Component {

  constructor(props){
    super(props);
      let user = localStorage.getItem('name')
      if( localStorage.getItem('family') != null ){
        //console.log("from storage",JSON.parse(localStorage.getItem('family')));
        this.state = {
          family : JSON.parse(localStorage.getItem('family'))
        }
      }else{
        this.state = {
          family: [{
            key: uuidv4(),
            name: `${user}'s Family`,
            relation: "",
            parent: 0
          }]
        };
      }
  }

  addFamilyMember = member => {
    //console.log("adding new family member: ", member);
    member.key = uuidv4();
    var latest = this.state.family.slice();
    latest.push(member)
    this.setState({family:latest});
    localStorage.setItem('family', JSON.stringify(latest));
    console.log("added family member: ", member, " as child of key: ", member.parent);
  }

  getDescendantsOfUUID = (key) => {
    if(this.state.family){
      var filtered = this.state.family.filter(function(member){
        console.log(member.parent, key);
        return (member.parent === key)
      });
      console.log(filtered);
      return filtered;
    }else{
      return [];
    }
  }

  render() {

    return (
          <div>
            <div className="tree">
              <ul>
                {this.getDescendantsOfUUID(0).map(member=>{
                  return <FamilyMember
                            key={member.key}
                            member={member}
                            getDescendantsOfUUID={this.getDescendantsOfUUID}
                            onAdd={this.addFamilyMember}
                            descendants={this.getDescendantsOfUUID(member.key)} />
                })}
              </ul>
            </div>
        </div>

    );
  }
}

export default FamilyContainer;
