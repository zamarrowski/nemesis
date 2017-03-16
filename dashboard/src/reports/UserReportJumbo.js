import React from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'

const Jumbo = styled.div`
  background-color: rgb(216, 218, 219);
  text-align: center;
  padding-bottom: 50px;
`

class UserReportJumbo extends React.Component {
  render() {
    const avatarStyle = { marginTop: '50px' }
    return(
      <Jumbo>
        <Avatar src={this.props.report.photo} style={avatarStyle} size={150}/>
        <h1>{this.props.report.username}</h1>
        {this._getAverageHappinessText(this.props.report.averageHappiness)}
      </Jumbo>
    )
  }

  _getAverageHappinessText(averageHappiness) {
    let color = null
    let AverageHappinessText = styled.h3`
      color: ${(props) => props.color}
    `

    if (averageHappiness >= 1 && averageHappiness < 2) {
      color = 'red'
    } else if (averageHappiness >= 2 && averageHappiness < 3) {
      color = 'blue'
    } else if (averageHappiness >= 3 && averageHappiness < 4) {
      color = 'black'
    } else if (averageHappiness >= 4 && averageHappiness < 5) {
      color = 'orange'
    } else if (averageHappiness === 5) {
      color = 'green'
    }

    return (<AverageHappinessText color={color}>Average happiness: {averageHappiness}</AverageHappinessText>)

  }
}

export default UserReportJumbo
