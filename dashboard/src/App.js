import React, { Component } from 'react'
import Header from './Header'

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="row">
          <div className="col-xs-12">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default App
