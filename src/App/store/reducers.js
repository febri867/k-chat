import initialState from "./state";

import {
    SEND_CHAT,
    ADD_PERSON,
    CHANGE_PERSON,
    DELETE_CHAT
} from './actions'

export default (state = initialState, { type, payload }) => {

    switch (type) {
        case SEND_CHAT:
            let user = state.person.filter( user => user.id === state.userIdActive )
            user = user[0]
            return {...state,
                chat: [...state.chat,
                    {...payload, id: state.chat.length + 1, user_id: state.userIdActive, user_name: user.name, photo_url: user.photo_url}
                ]
            }
        case ADD_PERSON:
            return {...state,
                person: [...state.person,
                    {...payload, id: state.person.length + 1}
                ]
            }
        case CHANGE_PERSON:
            return {...state,
                userIdActive: payload
            }
        case DELETE_CHAT:
            return {...state,
                chat: state.chat.filter( chat => Number(chat.id) !== Number(payload) )
            }
        default:
            return state
    }

}