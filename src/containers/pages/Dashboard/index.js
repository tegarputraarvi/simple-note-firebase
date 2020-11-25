import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addDataToAPI, getDataFromAPI, updateDataAPI, deleteDataAPI } from '../../../config/redux/action';
import './Dashboard.scss';

class Dashboard extends Component {

  state = {
    title: '',
    content: '',
    date: '',
    textButton: 'Simpan',
    noteId: '',
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.props.getNotes(userData.uid);
  }

  handleSaveNote = () => {
    const { title, content, date, textButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem('userData'));

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    }

    if (textButton === "Simpan") {
      saveNotes(data)
      this.setState({
        title: '',
        content: '', 
        textButton: "Simpan",
      })
    }
    else {
      data.noteId = noteId;
      updateNotes(data)
    }
    
    console.log("Data Note: ", data);
  }

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    })
  }

  updateNotes = (note) => {
    console.log("Data Note: ", note);
    this.setState({
      title: note.data.title,
      content: note.data.content, 
      textButton: "Update",
      noteId: note.id
    })
  }

  cancelUpdate = () => {
    this.setState({
      title: '',
      content: '', 
      textButton: "Simpan",
    })
  }

  deleteNote = (e, note) => {
    e.stopPropagation();

    const { deleteNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    }
    deleteNotes(data);
  }

  render() {
    const { title, content, date, textButton } = this.state;
    const { notes } = this.props;
    const { updateNotes, cancelUpdate, deleteNote } = this;

    console.log("Ini notes: ", notes);

    return (
      <Fragment>
        <div className="container">
          <div className="input-form">
            <input placeholder="Title..." className="input-title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
            <textarea placeholder="Content..." className="input-content" value={content} onChange={(e) => this.onInputChange(e, 'content')}>

            </textarea>

            <div className="action-wrapper">
              {
                textButton === "Update" ? (
                  <button className="save-btn cancel" onClick={cancelUpdate}>Cancel</button>
                ) : <div />
              }
              <button className="save-btn" onClick={this.handleSaveNote}>{textButton}</button>
            </div>
          </div>
          <hr />

          {
            notes.length > 0 ? (
              <Fragment>
                {
                  notes.map(note => {
                    return (
                      <div className="card-content" key={note.id} onClick={() => updateNotes(note)}>
                        <p className="title">{note.data.title}</p>
                        <p className="date">{note.data.date}</p>
                        <p className="content">{note.data.content}</p>
                        <div className="delete-btn" onClick={(e) => deleteNote(e, note)}>x</div>
                      </div>
                    )
                  })
                }
              </Fragment>
            ) : null
          }


        </div>
      </Fragment>
    )
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispacth = (dispacth) => ({
  saveNotes: (data) => dispacth(addDataToAPI(data)),
  getNotes: (data) => dispacth(getDataFromAPI(data)),
  updateNotes: (data) => dispacth(updateDataAPI(data)),
  deleteNotes: (data) => dispacth(deleteDataAPI(data)),
});

export default connect(reduxState, reduxDispacth)(Dashboard);