import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAppData } from '../actions/root'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

class App extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.actions.fetchAppData()
  }

  render() {
    const { main } = this.props

    return (
      <div>
        {main}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    app
  } = state

  return {
    data: app
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ fetchAppData }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
