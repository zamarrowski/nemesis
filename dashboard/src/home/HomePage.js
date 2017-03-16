import React from 'react'
import styled from 'styled-components'

import ReportCard from './ReportCard'
import lastReports from './lastReports.mock.js'
import Alert from './../common/Alert'
import Ionicon from 'react-ionicons'

const HomePageContainer = styled.div`
  padding: 20px;
`

const ColReport = styled.div`
  margin-top: 10px;
`

class HomePage extends React.Component {
  render() {
    return(
      <HomePageContainer>
        <div className="row">
            {lastReports.map((report, index) => (
              <ColReport className="col-lg-4 col-md-6 col-xs-12" key={index}>
                <ReportCard report={report} ></ReportCard>
              </ColReport>
            ))}
            {!lastReports.length ? <Alert className="col-xs-12"> <Ionicon icon="ion-sad-outline"/> <br/> Last reports not found.</Alert> : ''}
        </div>
      </HomePageContainer>
    )
  }
}

export default HomePage
