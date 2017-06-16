import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

class NoteList extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    notes: []
  }

  componentWillMount = () => {
    let notes = JSON.parse(localStorage.getItem('notes'))
    if (notes) {
      this.setState({
        notes: notes
      }, () => {
        console.log('notes have been retrieved')
      })
    }
  }

  getNoteList = () => {
    return this.state.notes.map((note) => {
      return <li>
        <h3>{note.title}</h3>
        <p>{note.description}</p>
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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setSelected
    }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(NoteList)
