import React from 'react'
import Paper from 'material-ui/Paper'
import DatePicker from 'material-ui/DatePicker'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
import Avatar from 'material-ui/Avatar'
import styled from 'styled-components'

const UserBox = styled.div`
  max-height: 300px;
  overflow-y: auto;
`

class SeekerForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = { users: this.props.users }
  }

  render() {

    const paperStyles = {
      padding: '10px'
    }

    const datePickerStyles = {
      width: '100%'
    }

    return(
      <Paper style={paperStyles} zDepth={1}>
        <List>
          <Subheader>Date range</Subheader>
          <ListItem hoverColor="transparent">
            <DatePicker
              textFieldStyle={datePickerStyles}
              hintText="Min date"
              ref={(input) => { this._minDateInput = input }}
              autoOk={true}
            />
          </ListItem>
          <ListItem hoverColor="transparent">
            <DatePicker
              textFieldStyle={datePickerStyles}
              hintText="Max date"
              ref={(input) => { this._maxDateInput = input }}
              autoOk={true}
            />
          </ListItem>
        </List>
        <List>
         <Subheader>Users:</Subheader>
         <UserBox>
           {this.state.users.map((user, key) => (
             <ListItem
               primaryText={user.username} key={key}
               leftCheckbox={
                 <Checkbox onCheck={this._selectUser.bind(this, user)} />
               }
               rightAvatar={<Avatar src={user.photo} />}
              />
           ))}
         </UserBox>
       </List>
        <FlatButton onTouchTap={this._search.bind(this)} fullWidth={true}>Search</FlatButton>
      </Paper>
    )
  }

  _search() {
    let searchInfo = {
      minDate: this._minDateInput.state.date,
      maxDate: this._maxDateInput.state.date,
      users: this.state.users.filter(user => user.selected)
    }
    this.props.onSearch(searchInfo)
  }

  _selectUser(userSelected) {
    let usersList = this.state.users
    for (let user of usersList) {
      if (user.id === userSelected.id) user.selected = !user.selected
    }
    this.setState({ users: usersList })
  }

}

export default SeekerForm
