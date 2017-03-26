import React from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Ionicon from 'react-ionicons'
import { Link } from 'react-router'
import colors from './../common/colors'

const Jumbo = styled.div`
  background-color: rgb(216, 218, 219);
  text-align: center;
  padding-bottom: 50px;
`

class UserReportJumbo extends React.Component {

  render() {
    return(
      <Jumbo>
        {this._getJumbo()}
      </Jumbo>
    )
  }

  _getJumbo() {
    let element = null
    if (this.props.report.reports.length) {
      const backButtonStyle = {
        float: 'left',
        marginTop: '20px',
        marginLeft: '20px'
      }
      element = (
        <div>
          <div className="row">
            <div className="col-xs-12">
              <Link to="/">
                <FloatingActionButton
                  mini={true}
                  style={backButtonStyle}
                  backgroundColor={colors.main}>
                    <Ionicon icon="ion-android-arrow-back"/>
                </FloatingActionButton>
              </Link>
            </div>
          </div>
          <Avatar src={this.props.report.avatar} size={150}/>
          <h1>{this.props.report.username}</h1>
          {this._getAverageHappinessText(this.props.report.status_avg)}
        </div>
      )
    } else {
      element = (
        <Ionicon fontSize="100px" style={{margin: '0 auto', marginTop: '20px'}} rotate={true} color={colors.main} icon="ion-load-c"/>
      )
    }
    return element
  }

  _getAverageHappinessText(averageHappiness) {
    let element = null

    if (averageHappiness) {
      let AverageHappinessText = styled.h3`
        color: ${(props) => props.color}
      `
      element = (<AverageHappinessText color={this._getAverageHappinessColor.bind(this, averageHappiness)}>Average happiness: {averageHappiness.toFixed(2)}</AverageHappinessText>)
    } else {
      element = (<span><Ionicon icon="ion-sad-outline"/> <br/> Sorry, we don't have the average happiness.</span>)
    }

    return element
  }

  _getAverageHappinessColor(averageHappiness) {
    let color = null
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
    return color
  }

}

UserReportJumbo.propTypes = {
  report: React.PropTypes.object.isRequired
}

export default UserReportJumbo
