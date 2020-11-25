import firebase, { database } from '../../firebase';

export const actionUserName = () => (dispatch) => {
  setTimeout(() => {
    return dispatch({type: 'CHANGE_USER', value: 'Tegar Putra Arvi'}) 
  }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({type: 'CHANGE_LOADING', value: true})
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      console.log("Success Register: ", user)
      dispatch({type: 'CHANGE_LOADING', value: false})
      resolve(true)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("ErrorCode: " , errorCode);
      console.log("ErrorMessage: " , errorMessage);
      dispatch({type: 'CHANGE_LOADING', value: false})
      reject(false)
    })
  })
}

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({type: 'CHANGE_LOADING', value: true})
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      console.log("Success Login: ", user)
      const userLogin = {
        email: user.user.email,
        uid: user.user.uid,
        emailVerified: user.user.emailVerified,
        refreshToken: user.user.refreshToken,
      }
      dispatch({type: 'CHANGE_LOADING', value: false})
      dispatch({type: 'CHANGE_ISLOGGINGIN', value: true})
      dispatch({type: 'CHANGE_USER', value: userLogin})
      resolve(userLogin)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("ErrorCode: " , errorCode);
      console.log("ErrorMessage: " , errorMessage);
      dispatch({type: 'CHANGE_LOADING', value: false})
      dispatch({type: 'CHANGE_ISLOGGINGIN', value: false})
      reject(false)
    })
  })
}

export const addDataToAPI = (data) => (dispatch) => {
  database.ref("notes/" + data.userId).push({
    title: data.title,
    content: data.content,
    date: data.date,
  })
}

export const getDataFromAPI = (userId) => (dispatch) => {
  var urlNotes = database.ref("notes/" + userId);

  return new Promise((resolve, reject) => {
    urlNotes.on("value", function(snapshot) {
      console.log("Get Data: ", snapshot.val())
      const data = []
      Object.keys(snapshot.val()).map(key => {
        data.push({
          id: key,
          data: snapshot.val()[key],
        })
      })
      dispatch({type: "SET_NOTES", value: data})
      resolve(snapshot.val())
    });
  })
}

export const updateDataAPI = (data) => (dispatch) => {
  var urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);

  return new Promise((resolve, reject) => {
    urlNotes.set({
      title: data.title,
      content: data.content,
      date: data.date
    }, (err) => {
        if (err) {
          reject(false)
        }
        else {
          resolve(true)
        }
      } 
    );
  })
}

export const deleteDataAPI = (data) => (dispatch) => {
  var urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);

  return new Promise((resolve, reject) => {
    urlNotes.remove();
  })
}