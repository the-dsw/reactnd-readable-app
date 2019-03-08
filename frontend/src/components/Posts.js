import React, { Component } from "react"
import { Link } from "react-router-dom"
import Layout from "../layouts/Layout"
import styled from "styled-components"
import { connect } from "react-redux"
import { fetchPosts } from "../actions"
import LinksPost from "./LinksPost"
import Section from "./Section"
import AddFormPost from "./AddPost"
import _ from "lodash"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 1.5rem;
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
class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  renderPosts() {
    const { posts } = this.props
    return _.map(posts, post => {
      const { category, id, title } = post
      return (
        <Block key={post.id}>
          <Title>
            <Links to={`/${category}/${id}`}>{title}</Links>
          </Title>

          <Item>author: {post.author}</Item>
          <Item>comments: {post.commentCount}</Item>
          <Item>votes: {post.voteScore}</Item>
          <LinksPost postId={post.id} />
        </Block>
      )
    })
  }
  render() {
    return (
      <Layout {...this.props}>
        <Content>
          <Section>
            <h3>Posts</h3>
            {this.renderPosts()}
            <AddFormPost {...this.props} />
          </Section>
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })
export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts)
