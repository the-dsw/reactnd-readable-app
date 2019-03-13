import React, { Component } from "react"
import Layout from "../layouts/Layout"
import styled from "styled-components"
import { connect } from "react-redux"
import { fetchComments } from "../actions"
import LinksComment from "./LinksComment"
import LinksFooter from "./VotesComment"
import _ from "lodash"

const Content = styled.div`
  padding: 0.5rem;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`

const Item = styled.div``

class Comments extends Component {
  componentDidMount() {
    const { idComment } = this.props

    this.props.fetchComments(idComment)
  }

  renderComments() {
    const { comments } = this.props

    return Object.keys(comments).map(comment => {
      const { id, author, body, voteScore} = comments[comment]

      return (
        <Block key={id}>
          <Item>author: {author}</Item>
          <Item>comment: {body}</Item>
          <Item>votes: {voteScore}</Item>
          <LinksComment commentId={id} />
          <LinksFooter
            idVote={id}
            voteScore={voteScore}
            {...this.props}
          />
        </Block>
      )
    })
  }

  render() {
    const { comments } = this.props
    const totalComments = Object.keys(comments).length

    return (
      <Layout {...this.props}>
        <Content>
          <h3>{totalComments > 1 ? (`${totalComments} Comments:`) : (`${totalComments} Comment:`)} </h3>
          {_.isEmpty(comments) ? (
            <Block>Not messages yet!</Block>
          ) : (
            this.renderComments()
          )}
        </Content>
      </Layout>
    )
  }
}
const mapStateToProps = ({ comments, posts }, {idComment}) => ({ 
  comments, 
  posts,
  idComment 
})

export default connect(
  mapStateToProps,
  { fetchComments }
)(Comments)
