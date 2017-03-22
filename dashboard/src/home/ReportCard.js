import React from 'react'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import styled from 'styled-components'
import { Link } from 'react-router'

import colors from './../common/colors'

const flatButtonStyles = { color: colors.main }

class ReportCard extends React.Component {

  constructor(props) {
    super(props)
    this.modalActions = [
      <FlatButton
        label="Cancel"
        style={flatButtonStyles}
        onTouchTap={this._handleCloseModal.bind(this)}
      />
    ]
    this.state = { modalOpen: false, modalInfo: {} }
  }

  render() {
    const flatButtonStyles = { color: colors.main }
    return(
      <div>
        <Card>
          <CardHeader
            title={this._getTextFeeling(this.props.report.status_level, this.props.report.user.username)}
            avatar={this.props.report.user.avatar}
            subtitle={`Reported at ${this.props.report.reported_at}`}
          />
          <CardActions>
            <Link to={"/user/" + this.props.report.user.slack_id + "/reports"}><FlatButton label="Reports" style={flatButtonStyles} /></Link>
            {this.props.report.comments ? <FlatButton label="Comments" onClick={this._showCommentsModal.bind(this)} style={flatButtonStyles} /> : ''}
          </CardActions>
        </Card>

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

  _getTextFeeling(feeling, username) {
    let feelingText = null
    let color = null
    let FeelingTextWrapper = styled.span`
      color: ${(props) => props.color};
      font-weight: 800;
     `
    if (feeling === 5) {
      feelingText = 'awesome'
      color = 'green'
    } else if (feeling === 4) {
      feelingText = 'really good'
      color = 'orange'
    } else if (feeling === 3) {
      feelingText = 'alright'
      color = 'gray'
    } else if (feeling === 2) {
      feelingText = 'a bit down'
      color = 'blue'
    } else if (feeling === 1) {
      feelingText = 'really bad'
      color = 'red'
    }

    return (<span>{username} is feeling <FeelingTextWrapper color={color}>{feelingText}</FeelingTextWrapper></span>)
  }

  _showCommentsModal() {
    this.setState({ modalOpen: true, modalInfo: this.props.report })
  }

  _handleCloseModal() {
    this.setState({ modalOpen: false, modalInfo: {} })
  }

}

export default ReportCard
