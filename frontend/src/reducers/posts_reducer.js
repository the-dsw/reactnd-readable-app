import _ from "lodash"
import {
  FETCH_POSTS,
  ADD_NEW_POST,
  DELETE_POST,
  EDIT_POST
} from "../actions/types"

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload, "id")
    case ADD_NEW_POST:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_POST:
      return _.omit(state, action.payload)
    case EDIT_POST:
      return { ...state, [action.payload.id]: action.payload }
    default:
      return state
  }
}
