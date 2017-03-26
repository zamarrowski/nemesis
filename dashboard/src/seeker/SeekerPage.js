import React from 'react'
import styled from 'styled-components'
import Ionicon from 'react-ionicons'

import SeekerForm from './SeekerForm'
import SeekerResults from './SeekerResults'
import reportServices from './../reports/reportServices'
import userServices from './../common/userServices'
import colors from './../common/colors'

const SeekerPageContainer = styled.div`
  padding: 20px;
`

class SeekerPage extends React.Component {

  constructor() {
    super()
    this.state = {
      results: [],
      users: [],
      loading: false
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
          {this.state.loading ? <Ionicon fontSize="100px" style={{marginLeft: '40%'}} rotate={true} color={colors.main} icon="ion-load-c"/> : <SeekerResults results={this.state.results}/>}
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

    this.setState({ loading: true })

    reportServices.searchReports(parseInfo).then(response => {
      let reports = this._parseResponse(response.data)
      this.setState({ results: reports, loading: false })
    })

  }

  _parseDate(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }

  _parseResponse(response) {
    let userReports = response.users_reports
    let reports = []
    for (let userReport of userReports) {
      for (let report of userReport.reports) {
        report.user = userReport.user
        reports.push(report)
      }
    }
    return reports
  }

}

export default SeekerPage
