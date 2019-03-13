import _ from "lodash"
import {
  FETCH_COMMENTS,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT
} from "../actions/types"

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return _.mapKeys(action.payload, "id")
    case ADD_NEW_COMMENT:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_COMMENT:
      return _.omit(state, action.payload)
    case EDIT_COMMENT:
      return { ...state, [action.payload.id]: action.payload }
    case VOTE_COMMENT:
      return { ...state, [action.payload.id]: action.payload  }
    default:
      return state
  }
}
