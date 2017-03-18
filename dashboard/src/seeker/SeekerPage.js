import React from 'react'
import styled from 'styled-components'

import SeekerForm from './SeekerForm'
import usersMock from './users.mock'
import SeekerResults from './SeekerResults'
import reportsMock from './../home/lastReports.mock'


const SeekerPageContainer = styled.div`
  padding: 20px;
`

class SeekerPage extends React.Component {

  constructor() {
    super()
    this.state = {
      results: []
    }
  }

  render() {
    return (
      <SeekerPageContainer className="row">
        <div className="col-xs-12 col-sm-4 col-md-3">
          <SeekerForm users={usersMock} onSearch={this._search.bind(this)}/>
        </div>
        <div className="col-xs-12 col-sm-8 col-md-9">
          <SeekerResults results={this.state.results}></SeekerResults>
        </div>
      </SeekerPageContainer>
    )
  }

  _search(searchInfo) {
    this.setState({ results: reportsMock })
  }

}

export default SeekerPage
