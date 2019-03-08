import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import postsReducer from "./posts_reducer"
import categoriesReducer from "./categories_reducer"
import detailsReducer from "./details_reducer"
import commentsReducer from "./comments_reducer"

const rootReducer = combineReducers({
  form: formReducer,
  posts: postsReducer,
  categories: categoriesReducer,
  details: detailsReducer,
  comments: commentsReducer
})

export default rootReducer
