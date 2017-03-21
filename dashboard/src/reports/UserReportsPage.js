import React from 'react'
import styled from 'styled-components'
import Ionicon from 'react-ionicons'

import UserReportJumbo from './UserReportJumbo'
import UserReportsTable from './UserReportsTable'
import Alert from './../common/Alert'
import reportServices from './reportServices'

const UserReportsContainer = styled.div`
  padding: 20px;
  h1 { text-align: center }
`

class UserReportsPage extends React.Component {

  constructor() {
    super()
    this.state = { userReport: { reports: [] } }
  }

  componentDidMount() {
    reportServices.getUserReports(this.props.params.id).then(response => {
      this.setState({ userReport: response.data })
    })
  }

  render() {
    return(
        <div className="row">
          <div className="col-xs-12">
            <UserReportJumbo report={this.state.userReport}></UserReportJumbo>
            <UserReportsContainer>
              {this.state.userReport.reports.length ? <h1>Last reports</h1> : ''}
              <div className="row">
                {this.state.userReport.reports.length ? <UserReportsTable reports={this.state.userReport.reports}></UserReportsTable> : <Alert className="col-xs-12"> <Ionicon icon="ion-sad-outline"/> <br/> Last reports not found.</Alert>}
              </div>
            </UserReportsContainer>
          </div>
        </div>
    )
  }
}

export default UserReportsPage
