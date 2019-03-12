import axios from "axios";
import { reset } from "redux-form";
import {
  FETCH_POSTS,
  FETCH_CATEGORIES,
  FETCH_POST_CATEGORY,
  GET_DETAILS_POST,
  FETCH_COMMENTS,
  FETCH_VOTE,
  ADD_NEW_POST,
  ADD_NEW_COMMENT,
  DELETE_POST,
  EDIT_POST,
  DELETE_COMMENT,
  EDIT_COMMENT
} from "./types";

const API_URL = "http://localhost:3001"
const uuidv4 = require("uuid/v4")
const headers = {
  "Conten-Type": "application/json",
  Authorization: "test"
}
/**
 * Fetch All Posts
 */
export const fetchPosts = () => async dispatch => {
  const res = await axios.get(`${API_URL}/posts`, {
    headers: { ...headers }
  })

  dispatch({
    type: FETCH_POSTS,
    payload: res.data
  })
}

/**
 * Fetch Detail Post
 */
export const fetchDetailsPost = (id) => async dispatch => {
  const res = await axios.get(`${API_URL}/posts/${id}`, {
    headers: { ...headers }
  })

  dispatch({
    type: GET_DETAILS_POST,
    payload: res.data
  })
}

/**
 * Fetch All Categories
 */
export const fetchCategories = () => async dispatch => {
  const res = await axios.get(`${API_URL}/categories`, {
    headers: { ...headers }
  })

  dispatch({
    type: FETCH_CATEGORIES,
    payload: res.data
  })
}

/**
 * Fetch Post Category
 */
export const fetchPostCategory = category => async dispatch => {
  const res = await axios.get(`${API_URL}/${category}/posts`, {
    headers: { ...headers }
  })

  dispatch({
    type: FETCH_POST_CATEGORY,
    payload: res.data
  })
}

/**
 * Fetch All Comments
 */
export const fetchComments = id => async dispatch => {
  const res = await axios.get(`${API_URL}/posts/${id}/comments`, {
    headers: { ...headers }
  })

  dispatch({
    type: FETCH_COMMENTS,
    payload: res.data
  })
}

/**
 * Fetch Post Vote
 */
export const fetchVote = (id, option) => async dispatch => {
  const res = await axios.post(
    `${API_URL}/posts/${id}`,
    { option },
    {
      headers: { ...headers }
    }
  )

  dispatch({
    type: FETCH_VOTE,
    payload: res.data
  })
}

/**
 * Add new Post
 */
export const addNewPost = (values, callback) => async dispatch => {
  const id = uuidv4()
  const post = {
    id: id,
    timestamp: +new Date(),
    title: values.title,
    body: values.comment,
    author: values.author,
    category: values.categoryName
  }

  const res = await axios.post(`${API_URL}/posts`, post, {
    headers: { ...headers }
  })

  dispatch({
    type: ADD_NEW_POST,
    payload: res.data
  })

  dispatch(reset("add_new_post"))

  await callback()
}

/**
 * Add new Comment
 */
export const addNewComment = (values, idComment) => async dispatch => {
  const id = uuidv4()
  const comment = {
    id,
    timestamp: +new Date(),
    author: values.author,
    body: values.comment,
    parentId: idComment
  }

  const res = await axios.post(`${API_URL}/comments`, comment, {
    headers: { ...headers }
  })

  dispatch({
    type: ADD_NEW_COMMENT,
    payload: res.data
  })

  dispatch(reset("add_new_comment"))
}

/**
 * Delete a Post
 */
export const deletePost = (id, callback) => async dispatch => {
  await axios.delete(`${API_URL}/posts/${id}`, {
    headers: { ...headers }
  })

  dispatch({
    type: DELETE_POST,
    payload: id
  })

  await callback()
}

/**
 * Delete a Comment
 */
export const deleteComment = (id, callback) => async dispatch => {
  await axios.delete(`${API_URL}/comments/${id}`, {
    headers: { ...headers }
  })

  dispatch({
    type: DELETE_COMMENT,
    payload: id
  })

  await callback()
}

/**
 * Edit a Comment
 */
export const editComment = (id, values) => async dispatch => {
  const comment = {
    timestamp: +new Date(),
    body: values.body
  }
  const res = await axios.put(`${API_URL}/comments/${id}`, comment, {
    headers: { ...headers }
  })

  dispatch({
    type: EDIT_COMMENT,
    payload: res.data
  })
}

/**
 * Edit a Post
 */
export const editPost = (id, values) => async dispatch => {
  const post = {
    title: values.title,
    body: values.body
  }
  const res = await axios.put(`${API_URL}/posts/${id}`, post, {
    headers: { ...headers }
  })

  dispatch({
    type: EDIT_POST,
    payload: res.data
  })
}
