import React from 'react'
import Paper from 'material-ui/Paper'
import DatePicker from 'material-ui/DatePicker'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
import Avatar from 'material-ui/Avatar'
import Snackbar from 'material-ui/Snackbar'
import styled from 'styled-components'
import colors from './../common/colors'

const UserBox = styled.div`
  max-height: 300px;
  overflow-y: auto;
`

class SeekerForm extends React.Component {

  constructor() {
    super()
    this.state = { showError: false }
  }

  render() {

    const paperStyles = {
      padding: '10px'
    }

    const datePickerStyles = {
      width: '100%'
    }

    const flatButtonStyles = { color: colors.main }

    return(
      <div>
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
             {this.props.users.map((user, key) => (
               <ListItem
                 primaryText={user.username} key={key}
                 leftCheckbox={
                   <Checkbox iconStyle={{fill: colors.main}} onCheck={this._selectUser.bind(this, user)} />
                 }
                 rightAvatar={<Avatar src={user.avatar} />}
                />
             ))}
           </UserBox>
         </List>
          <FlatButton style={flatButtonStyles} onTouchTap={this._search.bind(this)} fullWidth={true}>Search</FlatButton>
        </Paper>
        <Snackbar
          open={this.state.showError}
          message="Min date, max date and users are required."
          autoHideDuration={3000}
        />
      </div>
    )
  }

  _search() {
    let usersSelected = this.props.users.filter(user => user.selected)
    if (this._minDateInput.state.date && this._maxDateInput.state.date && usersSelected.length) {
      let searchInfo = {
        minDate: this._minDateInput.state.date,
        maxDate: this._maxDateInput.state.date,
        users: usersSelected
      }
      this.props.onSearch(searchInfo)
      this.setState({ showError: false })
    } else {
      this.setState({ showError: true })
    }

  }

  _selectUser(userSelected) {
    let usersList = this.props.users
    for (let user of usersList) {
      if (user.id === userSelected.id) user.selected = !user.selected
    }
  }

}

export default SeekerForm
