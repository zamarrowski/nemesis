import React from 'react'
import styled from 'styled-components'

import SeekerForm from './SeekerForm'
import SeekerResults from './SeekerResults'
import reportServices from './../reports/reportServices'
import userServices from './../common/userServices'

const SeekerPageContainer = styled.div`
  padding: 20px;
`

class SeekerPage extends React.Component {

  constructor() {
    super()
    this.state = {
      results: [],
      users: []
    }
  }

  componentDidMount() {
    userServices.getUsers().then(response => {
      this.setState({ users: response.data })
    })
  }

  render() {
    return (
      <SeekerPageContainer className="row">
        <div className="col-xs-12 col-sm-4 col-md-3">
          <SeekerForm users={this.state.users} onSearch={this._search.bind(this)}/>
        </div>
        <div className="col-xs-12 col-sm-8 col-md-9">
          <SeekerResults results={this.state.results}></SeekerResults>
        </div>
      </SeekerPageContainer>
    )
  }

  _search(searchInfo) {
    let parseInfo = {
      start_date: this._parseDate(searchInfo.minDate),
      end_date: this._parseDate(searchInfo.maxDate),
      users: searchInfo.users.map(user => user.slack_id).join(',')
    }
    console.log(parseInfo)
    reportServices.searchReports(parseInfo).then(response => {
      console.log(response.data)
    })
    //this.setState({ results: reportsMock })
  }

  _parseDate(date) {
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }

}

export default SeekerPage
