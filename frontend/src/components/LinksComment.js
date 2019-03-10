import React, { Component } from "react"
import { Link } from "react-router-dom"
import { reduxForm, Field } from "redux-form"
import styled from "styled-components"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deleteComment, editComment } from "../actions"
import _ from "lodash"

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
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
class LinksComment extends Component {
  state = { 
    show: false 
  }

  handleInitialize() {
    const { commentId, comments, initialize } = this.props
    let initData = {}

    _.map(comments, item => {
      if (item.id === commentId) {
        initData = {
          body: item.body
        }
      }
      initialize(initData)
    })
  }

  onDeleteClick = () => {
    const { category, post_id } = this.props.match.params
    const { commentId } = this.props

    this.props.deleteComment(commentId, () => {
      this.props.history.push(`/${category}/${post_id}`)
    })
  }

  onEditClick = () => {
    this.setState({ show: !this.state.show })
    this.handleInitialize()
  }

  handleFormSubmit = values => {
    const { commentId } = this.props

    this.props.editComment(commentId, values)
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

LinksComment = reduxForm({
  form: "edit_comment"
})(LinksComment)

const mapStateToProps = ({ comments }) => ({ comments })

export default withRouter(
  connect(
    mapStateToProps,
    { deleteComment, editComment }
  )(LinksComment)
)
