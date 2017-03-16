import React from 'react'

import userReportMock from './userReport.mock'
import UserReportJumbo from './UserReportJumbo'

class UserReportsPage extends React.Component {

  render() {
    return(
        <div className="row">
          <div className="col-xs-12">
            <UserReportJumbo report={userReportMock}></UserReportJumbo>
          </div>
        </div>
    )
  }
}

export default UserReportsPage
