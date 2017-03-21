import React from 'react'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import styled from 'styled-components'
import { Link } from 'react-router'
import colors from './../common/colors'

class ReportCard extends React.Component {
  render() {
    const flatButtonStyles = { color: colors.main }
    return(
      <Card>
        <CardHeader
          title={this._getTextFeeling(this.props.report.status_level, this.props.report.user.username)}
          avatar={this.props.report.user.avatar}
          subtitle={`Reported at ${this.props.report.reported_at}`}
        />
        <CardActions>
          <Link to={"/user/" + this.props.report.user.slack_id + "/reports"}><FlatButton label="Reports" style={flatButtonStyles} /></Link>
          {this.props.report.comments ? <FlatButton label="Comments" style={flatButtonStyles} /> : ''}
        </CardActions>
      </Card>
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

}

export default ReportCard
