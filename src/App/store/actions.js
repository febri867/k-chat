export const SEND_CHAT = 'SEND_CHAT'
export const sendChat = (chat) => (dispatch, getState) => {

    if(getState().app.userIdActive !== 0)

    dispatch({
        type: SEND_CHAT,
        payload: chat
    })

}

export const ADD_PERSON = 'ADD_PERSON'
export const addPerson = (name) => (dispatch, getState) => {

    dispatch({
        type: ADD_PERSON,
        payload: name
    })

    dispatch(changePerson(getState().app.person.length))

}

export const CHANGE_PERSON = 'CHANGE_PERSON'
export const changePerson = (id) => dispatch => {

    dispatch({
        type: CHANGE_PERSON,
        payload: id
    })

}

export const DELETE_CHAT = 'DELETE_DELETE'
export const deleteChat = (id) => dispatch => {

    dispatch({
        type: DELETE_CHAT,
        payload: id
    })

}

export default {
    sendChat,
    addPerson,
    changePerson,
    deleteChat
}