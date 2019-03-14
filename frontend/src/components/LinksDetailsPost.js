import React, { Component } from "react"
import { Link } from "react-router-dom"
import { reduxForm, Field } from "redux-form"
import styled from "styled-components"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deletePost, editPost, fetchDetailsPost } from "../actions"
import _ from "lodash"


const renderField = ({
  input,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <InputGroup>
    <input type={type} placeholder={placeholder} {...input} />
    {touched && error && <ErrorForm>{error}</ErrorForm>}
  </InputGroup>
)

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`
const ErrorForm = styled.div`
  color: red;
  margin: 5px;
`
const WrapLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
`
const Linkses = styled(Link)`
  color: black;
  padding: 0 0.2rem;
  &:hover {
    opacity: 0.7;
    color: ${({ color }) => (color ? color : "black")};
  }
`
const StyledButton = styled.button`
  border-radius: 5px;
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0.5rem;
  text-decoration: none;
  background: ${({ bgc }) => (bgc ? bgc : "#0069ed")};
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover {
    opacity: 0.7;
  }
`
const StyledForm = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0;
  border-radius: 5px;
`
const SaveButton = styled.div`
  margin: 1rem;
`
const StyledTextareaField = styled(Field)`
  margin: 1rem 0;
  width: 20rem;
  height: 5rem;
  padding: 1rem;
  resize: none;
  border: solid 1px #ccc;
  border-radius: 5px;
`
const InputGroup = styled.div`
  margin: 1rem 0;
  > input {
    width: 20rem;
    padding: 1rem;
    border: none;
    border: solid 1px #ccc;
    border-radius: 5px;
  }
`

class LinksDetailsPost extends Component {
  state = { 
    show: false 
  }

  handleInitialize() {
    const { postId, posts, initialize } = this.props
    let initData = {}

    _.map(posts, item => {
      if (item.id === postId) {
        initData = {
          title: item.title,
          body: item.body
        }
      }
      initialize(initData)
    })
  }

  onDeleteClick = () => {
    const { postId } = this.props

    this.props.deletePost(postId, () => {
      this.props.history.push("/")
    })
  }

  onEditClick = () => {
    this.setState({ show: !this.state.show })
    this.handleInitialize()

  }

  handleFormSubmit = values => {
    const { postId } = this.props

    this.props.editPost(postId, values)
    this.setState({ show: false })

  }

  render() {
    const { show } = this.state
    const { category, post_id } = this.props.match.params
    const { handleSubmit, submitting, pristine } = this.props

    return (
      <Block>
        <WrapLinks>
          <Linkses
            onClick={this.onEditClick}
            color="green"
            to={`/${category}/${post_id}`}
          >
            Edit
          </Linkses>{" "}
          /{" "}
          <Linkses
            onClick={this.onDeleteClick}
            color="red"
            to={`/${category}/${post_id}`}
          >
            Delete
          </Linkses>
        </WrapLinks>
        {show && (
          <StyledForm>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
             {/* Title */}
             <Field name="title" component={renderField} type="text" />
              {/* Body */}
              <StyledTextareaField name="body" component="textarea" />

              {/* Save button */}
              <SaveButton>
                <StyledButton type="submit" disabled={pristine || submitting}>
                  Save
                </StyledButton>
              </SaveButton>
            </form>
          </StyledForm>
        )}
      </Block>
    )
  }
}

LinksDetailsPost = reduxForm({
  form: "edit_details_post"
})(LinksDetailsPost)

const mapStateToProps = ({ posts }) => ({ posts })

export default withRouter(
  connect(
    mapStateToProps,
    { deletePost, editPost, fetchDetailsPost }
  )(LinksDetailsPost)
)
