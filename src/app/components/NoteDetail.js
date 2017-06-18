import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAppData } from 'base/actions/root'
import style from 'app/styles/note-detail.scss'

class NoteDetail extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    note: PropTypes.object
  }

  componentWillMount() {
    this.props.actions.fetchAppData()
  }

  getNoteDetail = () => {
    return <div>
      <date>{this.props.note.date}</date>
      <h2>{this.props.note.title}</h2>
      <p>{this.props.note.detail}</p>
    </div>
  }

  render() {
    return(
      <div className={style['note-detail-wrapper']}>
        {this.getNoteDetail()}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const {
    app
  } = state

  const nid = props.params.nid

  return {
    note: app.get('data')[nid]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ fetchAppData }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail)
