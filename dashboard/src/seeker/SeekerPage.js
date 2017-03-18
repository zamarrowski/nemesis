import React from 'react'
import styled from 'styled-components'

import SeekerForm from './SeekerForm'

const SeekerPageContainer = styled.div`
  padding: 20px;
`

class SeekerPage extends React.Component {
  render() {
    return (
      <SeekerPageContainer className="row">
        <div className="col-xs-3">
          <SeekerForm/>
        </div>
        <div className="col-xs-9">
          <h1>Resultados</h1>
        </div>
      </SeekerPageContainer>
    )
  }
}

export default SeekerPage
