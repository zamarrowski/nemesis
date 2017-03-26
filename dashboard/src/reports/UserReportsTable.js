import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'

import colors from './../common/colors'

const flatButtonStyles = { color: colors.main }

class UserReportCard extends React.Component {

  constructor() {
    super()
    this.state = {
      modalOpen: false,
      modalInfo: {}
    }
    this.modalActions = [
      <FlatButton
        label="Cancel"
        style={flatButtonStyles}
        onTouchTap={this._handleCloseModal.bind(this)}
      />
    ]
  }

  render() {

    return(
      <div className="col-xs-12 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
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
                <TableRowColumn>{report.status_level}</TableRowColumn>
                <TableRowColumn>{report.reported_at}</TableRowColumn>
                <TableRowColumn>
                  {report.comments ? <FlatButton label="See comments" style={flatButtonStyles} onClick={this._showCommentsModal.bind(this, report)} /> : ''}
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          title="Report comments"
          modal={false}
          actions={this.modalActions}
          open={this.state.modalOpen}>
          {this.state.modalInfo.comments ? this.state.modalInfo.comments : ''}
        </Dialog>

      </div>
    )
  }

  _showCommentsModal(report) {
    this.setState({ modalOpen: true, modalInfo: report })
  }

  _handleCloseModal() {
    this.setState({ modalOpen: false, modalInfo: {} })
  }

}

UserReportCard.propTypes = {
  reports: React.PropTypes.array.isRequired
}

export default UserReportCard
