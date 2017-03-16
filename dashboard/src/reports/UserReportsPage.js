import React from 'react'
import styled from 'styled-components'

import userReportMock from './userReport.mock'
import UserReportJumbo from './UserReportJumbo'
import UserReportsTable from './UserReportsTable'

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
              <h1>Last reports</h1>
              <div className="row">
                <div className="col-xs-12 col-md-6 col-md-offset-3 col-lg-8 col-lg-offset-2">
                  <UserReportsTable reports={userReportMock.reports}></UserReportsTable>
                </div>
              </div>
            </UserReportsContainer>
          </div>
        </div>
    )
  }
}

export default UserReportsPage
