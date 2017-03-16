import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

class UserReportCard extends React.Component {
  render() {
    return(
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Happiness</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.reports.map((report, key) => (
            <TableRow key={key}>
              <TableRowColumn>{report.happiness}</TableRowColumn>
              <TableRowColumn>{this._getDate(report.date)}</TableRowColumn>
              <TableRowColumn>
                {report.comments ? <FlatButton label="See comments" /> : ''}
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  _getDate(date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }

}

export default UserReportCard
