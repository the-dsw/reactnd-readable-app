import { GET_DETAILS_POST, FETCH_VOTE } from "../actions/types"

export default function(state = {}, action) {
  switch (action.type) {
    case GET_DETAILS_POST:
      return action.payload
    case FETCH_VOTE:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
