import React from 'react'
import { Line } from 'react-chartjs-2'

import colors from './../common/colors'

class UserReportChart extends React.Component {

  render() {
    return(
      <div className="col-xs-12 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
        <Line data={this._getData()}/>
      </div>
    )
  }

  _getData() {
    return {
      labels: this._getLabels(),
      datasets: [
        {
          label: 'Happiness',
          data: this._getReporHappiness(),
          fill: false,
          borderColor: colors.main,
          backgroundColor: colors.main,
          pointBackgroundColor: colors.main
        }
      ]
    }
  }

  _getLabels() {
    return this.props.reports.map(report => report.reported_at.split(' ')[0])
  }

  _getReporHappiness() {
    return this.props.reports.map(report => report.status_level)
  }

}

export default UserReportChart
