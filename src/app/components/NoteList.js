import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { fetchAppData } from 'base/actions/root'
import style from 'app/styles/note-list.scss'

class NoteList extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.actions.fetchAppData()
  }

  getNoteList = () => {
    return this.props.notes.map((note, index) => {
      return <li key={index}>
        <Link to={{ pathname: `/note/${index}` }}>
          <date>{note.date}</date>
          <h3>{note.title}</h3>
          <p>{note.detail}</p>
        </Link>
      </li>
    })
  }

  render() {
    return(
      <div className={style['note-list-wrapper']}>
        <ul>
          {this.getNoteList()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    app
  } = state

  return {
    notes: app.get('data')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ fetchAppData }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList)
