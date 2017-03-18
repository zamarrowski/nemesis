import React from 'react'
import Paper from 'material-ui/Paper'
import DatePicker from 'material-ui/DatePicker'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'

import usersMock from './users.mock'

class SeekerForm extends React.Component {
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
          <Subheader>Select date range</Subheader>
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
         {usersMock.map((user, key) => (
           <ListItem primaryText={user.username} key={key} leftCheckbox={<Checkbox />} />
         ))}
       </List>
        <FlatButton onTouchTap={this._search.bind(this)} fullWidth={true}>Search</FlatButton>
      </Paper>
    )
  }

  _search() {
    console.log(this._minDateInput.state.date)
  }

}

export default SeekerForm
