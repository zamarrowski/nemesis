import React from 'react'
import styled from 'styled-components'

import ReportCard from './ReportCard'
import Alert from './../common/Alert'
import Ionicon from 'react-ionicons'
import reportServices from './../reports/reportServices'

const HomePageContainer = styled.div`
  padding: 20px;
`

const ColReport = styled.div`
  margin-top: 10px;
`

class HomePage extends React.Component {

  constructor() {
    super()
    this.state = { lastReports: [] }
  }

  componentDidMount() {
    reportServices.getLastReports().then(response => {
      this.setState({ lastReports: response.data })
    })
  }

  render() {
    return(
      <HomePageContainer>
        <div className="row">
            {this.state.lastReports.map((report, index) => (
              <ColReport className="col-xs-12 col-sm-6 col-md-4" key={index}>
                <ReportCard report={report} ></ReportCard>
              </ColReport>
            ))}
            {!this.state.lastReports.length ? <Alert className="col-xs-12"> <Ionicon icon="ion-sad-outline"/> <br/> Last reports not found.</Alert> : ''}
        </div>
      </HomePageContainer>
    )
  }
}

export default HomePage
