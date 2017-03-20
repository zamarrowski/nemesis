import React from 'react'
import styled from 'styled-components'
import Ionicon from 'react-ionicons'

import userReportMock from './userReport.mock'
import UserReportJumbo from './UserReportJumbo'
import UserReportsTable from './UserReportsTable'
import Alert from './../common/Alert'

const UserReportsContainer = styled.div`
  padding: 20px;
  h1 { text-align: center }
`

class UserReportsPage extends React.Component {

  render() {
    return(
        <div className="row">
          <div className="col-xs-12">
            <UserReportJumbo report={userReportMock}></UserReportJumbo>
            <UserReportsContainer>
              {userReportMock.reports.length ? <h1>Last reports</h1> : ''}
              <div className="row">
                {userReportMock.reports.length ? <UserReportsTable reports={userReportMock.reports}></UserReportsTable> : <Alert className="col-xs-12"> <Ionicon icon="ion-sad-outline"/> <br/> Last reports not found.</Alert>}
              </div>
            </UserReportsContainer>
          </div>
        </div>
    )
  }
}

export default UserReportsPage
