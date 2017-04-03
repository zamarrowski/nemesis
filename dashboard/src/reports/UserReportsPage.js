import React from 'react'

import UserReportJumbo from './UserReportJumbo'
import UserReportsTable from './UserReportsTable'
import UserReportChart from './UserReportChart'
import reportServices from './reportServices'
import { UserReportsContainer } from './styles'

class UserReportsPage extends React.Component {

  constructor() {
    super()
    this.state = { userReport: { reports: [] }, loading: false }
  }

  componentDidMount() {
    this.setState({ loading: true })
    reportServices.getUserReports(this.props.params.id).then(response => {
      this.setState({ userReport: response.data, loading: false })
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
                <UserReportChart reports={this.state.userReport.reports}/>
              </div>
              <div className="row">
                <UserReportsTable reports={this.state.userReport.reports}/>
              </div>
            </UserReportsContainer>
          </div>
        </div>
    )
  }
}

export default UserReportsPage
