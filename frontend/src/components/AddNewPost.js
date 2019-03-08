import React, { Component } from "react"
import { reduxForm, Field } from "redux-form"
import { addNewPost } from "../actions"
import { connect } from "react-redux"
import styled from "styled-components"
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
const ErrorForm = styled.div`
  color: red;
  margin: 5px;
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
  margin: 2rem 0;
  border-radius: 5px;
`

const InputGroup = styled.div`
  margin: 1rem 0;
  > input {
    width: 20rem;
    padding: 1rem;
    border: solid 1px #ccc;
    border-radius: 5px;
  }
`
const SaveButton = styled.div`
  margin: 1rem;
`
const StyledTextareaField = styled(Field)`
  margin: 1rem 0;
  width: 20rem;
  height: 10rem;
  padding: 1rem;
  resize: none;
  border: solid 1px #ccc;
  border-radius: 5px;
`
const StyledCategories = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 10px 5px;

  > label {
    margin: 5px;
  }
  > select {
    height: 2.75rem;
  }
`

class AddNewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleFormSubmit = values => {
    this.props.addNewPost(values, () => {
      this.props.history.push("/")
    })
  }
  getOptionCategory() {
    return _.map(this.props.categories, category => {
      return (
        <option key={category.name} value={category.path}>
          {category.name}
        </option>
      )
    })
  }

  render() {
    const { handleSubmit, submitting, pristine, reset } = this.props

    return (
      <StyledForm>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          {/* Title */}
          <Field
            name="title"
            component={renderField}
            type="text"
            placeholder="Title"
          />
          {/* Author */}
          <Field
            name="author"
            component={renderField}
            type="text"
            placeholder="Author's name"
          />
          {/* Category */}
          <StyledCategories>
            <label>Categories</label>
            <Field name="categoryName" component="select">
              <option value="">Select a category...</option>
              {this.getOptionCategory()}
            </Field>
          </StyledCategories>
          {/* Body */}
          <StyledTextareaField name="comment" component="textarea" />

          {/* Save button */}
          <SaveButton>
            <StyledButton type="submit" disabled={pristine || submitting}>
              Save
            </StyledButton>
            <StyledButton
              bgc="#ccc"
              onClick={reset}
              disabled={pristine || submitting}
            >
              Clear
            </StyledButton>
          </SaveButton>
        </form>
      </StyledForm>
    )
  }
}
const mapStateToProps = ({ categories }) => {
  return { categories }
}

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = "* Title required"
  }
  if (!values.author) {
    errors.author = "* Name required"
  }

  return errors
}

AddNewPost = reduxForm({ validate, form: "add_new_post" })(AddNewPost)

export default connect(
  mapStateToProps,
  { addNewPost }
)(AddNewPost)
