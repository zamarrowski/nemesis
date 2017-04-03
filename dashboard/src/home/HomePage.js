import React from 'react'
import Ionicon from 'react-ionicons'

import ReportCard from './ReportCard'
import Alert from './../common/Alert'
import reportServices from './../reports/reportServices'
import colors from './../common/colors'

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
      <div style={{ padding: '20px' }}>
        <div className="row">
            {this.state.lastReports.map((report, index) => (
              <div style={{ marginTop: '20px' }} className="col-xs-12 col-sm-6 col-md-4" key={index}>
                <ReportCard report={report}/>
              </div>
            ))}
            {this.state.loading ? <Ionicon fontSize="100px" style={{margin: '0 auto'}} rotate={true} color={colors.main} icon="ion-load-c"/> : ''}
            {!this.state.lastReports.length && !this.state.loading ? <Alert className="col-xs-12"> <Ionicon icon="ion-sad-outline"/> <br/> Last reports not found.</Alert> : ''}
        </div>
      </div>
    )
  }
}

export default HomePage
