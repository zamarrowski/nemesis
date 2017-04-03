import React from 'react'
import Paper from 'material-ui/Paper'
import DatePicker from 'material-ui/DatePicker'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
import Avatar from 'material-ui/Avatar'
import Snackbar from 'material-ui/Snackbar'
import Ionicon from 'react-ionicons'

import colors from './../common/colors'
import { UserBox } from './styles'


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
      <div style={{ marginTop: '10px' }}>
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
             {this._getUsersNode()}
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

  _getUsersNode() {
    let element = null
    if (this.props.users.length) {
      element = (
        this.props.users.map((user, key) => (
          <ListItem
            primaryText={user.username} key={key}
            leftCheckbox={
              <Checkbox iconStyle={{fill: colors.main}} onCheck={this._selectUser.bind(this, user)} />
            }
            rightAvatar={<Avatar src={user.avatar} />}
           />
        ))
      )
    } else {
      element = (<Ionicon fontSize="30px" style={{marginLeft: '45%'}} rotate={true} color={colors.main} icon="ion-load-c"/>)
    }
    return element
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

  _selectUser(user, e, value) {
    user.selected = value
  }

}

SeekerForm.propTypes = {
  users: React.PropTypes.array.isRequired
}

export default SeekerForm
