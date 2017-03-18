import React from 'react'
import styled from 'styled-components'

import SeekerForm from './SeekerForm'
import usersMock from './users.mock'


const SeekerPageContainer = styled.div`
  padding: 20px;
`

class SeekerPage extends React.Component {
  render() {
    return (
      <SeekerPageContainer className="row">
        <div className="col-xs-12 col-sm-4 col-md-3">
          <SeekerForm users={usersMock} onSearch={this._search.bind(this)}/>
        </div>
        <div className="col-xs-12 col-sm-8 col-md-9">
          <h1>Resultados</h1>
        </div>
      </SeekerPageContainer>
    )
  }

  _search(searchInfo) {
    console.log(searchInfo)
  }

}

export default SeekerPage
