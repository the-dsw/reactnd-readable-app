import _ from "lodash"

import { FETCH_CATEGORIES } from "../actions/types"

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return _.mapKeys(action.payload.categories, "name")

    default:
      return state
  }
}
