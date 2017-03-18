import React from 'react'
import styled from 'styled-components'
import Ionicon from 'react-ionicons'

import Alert from './../common/Alert'
import ReportCard from './../home/ReportCard'

const ColReport = styled.div`
  margin-bottom: 10px;
`

class SeekerResults extends React.Component {
  render() {
    return(
      <div className="row">
        {!this.props.results.length ? <Alert className="col-xs-12"> <Ionicon color="white" icon="ion-sad-outline"/> <br/>  Results not found.</Alert> : this._getNodeResults()}
      </div>
    )
  }

  _getNodeResults() {
    return this.props.results.map((result, key) => (
      <ColReport className="col-xs-12 col-md-6 col-lg-4" key={key}>
        <ReportCard report={result}></ReportCard>
      </ColReport>
    ))
  }
}

export default SeekerResults
