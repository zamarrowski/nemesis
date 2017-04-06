import React from 'react'
import Ionicon from 'react-ionicons'

import Alert from './../common/Alert'
import ReportCard from './../home/ReportCard'


class SeekerResults extends React.Component {
  render() {
    return(
      <div style={{ marginTop: '10px' }} className="row">
        {!this.props.results.length ? this._getResultsNotFound()  : this._getNodeResults()}
      </div>
    )
  }

  _getResultsNotFound() {
    return (
      <Alert className="col-xs-12">
         <Ionicon color="white" icon="ion-sad-outline"/> <br/>  Results not found.
      </Alert>
    )
  }

  _getNodeResults() {
    return this.props.results.map((result, key) => (
      <div style={{ marginBottom: '10px' }} className="col-xs-12 col-md-6" key={key}>
        <ReportCard report={result}></ReportCard>
      </div>
    ))
  }
}

SeekerResults.propTypes = {
  results: React.PropTypes.array.isRequired
}

export default SeekerResults
