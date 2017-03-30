import React from 'react'
import styled from 'styled-components'
import Ionicon from 'react-ionicons'

import ReportCard from './ReportCard'
import Alert from './../common/Alert'
import reportServices from './../reports/reportServices'
import colors from './../common/colors'

const HomePageContainer = styled.div`
  padding: 20px;
`

const ColReport = styled.div`
  margin-top: 10px;
`

class HomePage extends React.Component {

  constructor() {
    super()
    this.state = { lastReports: [], loading: false }
  }

  componentDidMount() {
    this.setState({ loading: true })
    reportServices.getLastReports().then(response => {
      this.setState({ lastReports: response.data })
      this.setState({ loading: false })
    })
  }

  render() {
    return(
      <HomePageContainer>
        <div className="row">
            {this.state.lastReports.map((report, index) => (
              <ColReport className="col-xs-12 col-sm-6 col-md-4" key={index}>
                <ReportCard report={report}/>
              </ColReport>
            ))}
            {this.state.loading ? <Ionicon fontSize="100px" style={{margin: '0 auto'}} rotate={true} color={colors.main} icon="ion-load-c"/> : ''}
            {!this.state.lastReports.length && !this.state.loading ? <Alert className="col-xs-12"> <Ionicon icon="ion-sad-outline"/> <br/> Last reports not found.</Alert> : ''}
        </div>
      </HomePageContainer>
    )
  }
}

export default HomePage
