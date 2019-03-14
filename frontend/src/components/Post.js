import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import styled from "styled-components"
import LinksPost from "./LinksPost"
import LinksFooter from "./Votes"


class Post extends Component {

  render() {
    const { category, id, title, author, commentCount, voteScore } = this.props.post
    
    return (
      <Block>
          <Title>
            <Links to={`/${category}/${id}`}>{title}</Links>
          </Title>

          <Item>author: {author}</Item>
          <Item>comments: {commentCount}</Item>
          <Item>votes: {voteScore}</Item>
          <LinksPost postId={id} />
          <LinksFooter
            idVote={id}
            voteScore={voteScore}
            {...this.props}
          />
        </Block>
    )
  }
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`
const Item = styled.div``

const Links = styled(Link)`
  color: black;
  padding: 0 0.2rem;
  &:hover {
    opacity: 0.7;
  }
`
const Title = styled(Item)`
  font-size: 1.5rem;
  justify-content: center;
`

const mapStateToProps = ({ posts }, {post_id}) => {
  const post = posts[post_id]
  
  return {
    post: post
      ? post
      : null,
  }
}

export default connect(mapStateToProps)(Post)