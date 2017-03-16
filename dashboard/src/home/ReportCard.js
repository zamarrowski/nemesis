import React from 'react'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import styled from 'styled-components'
import { Link } from 'react-router'

class ReportCard extends React.Component {
  render() {
    const flatButtonStyles = { color: 'rgb(255, 130, 110)' }
    return(
      <Card>
        <CardHeader
          title={this._getTextFeeling(this.props.report.happiness, this.props.report.username)}
          avatar={this.props.report.photo}
          subtitle={this._getDate(this.props.report.date)}
        />
        <CardActions>
          <Link to={"/user/" + this.props.report.userId + "/reports"}><FlatButton label="Reports" style={flatButtonStyles} /></Link>
          {this.props.report.comments ? <FlatButton label="Comments" style={flatButtonStyles} /> : ''}
        </CardActions>
      </Card>
    )
  }

  _getDate(date) {
    return `Reported at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${String(date.getMinutes()).lenght === 1 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds()}`
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
