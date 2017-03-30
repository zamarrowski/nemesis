import React from 'react'
import styled from 'styled-components'
import Ionicon from 'react-ionicons'

import Alert from './../common/Alert'
import ReportCard from './../home/ReportCard'

const ColReport = styled.div`
  margin-bottom: 10px;
`

const SeekerResultsContainer = styled.div`
  margin-top: 10px;
`

class SeekerResults extends React.Component {
  render() {
    return(
      <SeekerResultsContainer className="row">
        {!this.props.results.length ? <Alert className="col-xs-12"> <Ionicon color="white" icon="ion-sad-outline"/> <br/>  Results not found.</Alert> : this._getNodeResults()}
      </SeekerResultsContainer>
    )
  }

  _getNodeResults() {
    return this.props.results.map((result, key) => (
      <ColReport className="col-xs-12 col-md-6" key={key}>
        <ReportCard report={result}></ReportCard>
      </ColReport>
    ))
  }
}

SeekerResults.propTypes = {
  results: React.PropTypes.array.isRequired
}

export default SeekerResults
