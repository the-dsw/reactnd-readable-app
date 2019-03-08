import React, { Component } from "react"
import Layout from "../layouts/Layout"
import styled from "styled-components"
import { connect } from "react-redux"
import { fetchPosts } from "../actions"
import Section from "./Section"
import AddFormPost from "./AddPost"
import Post from "./Post"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 1.5rem;
`
class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
      <Layout {...this.props}>
        <Content>
          <Section>
            <h3>Posts</h3>
            {this.props.postsIds.map(id => <Post id={id} key={id}/>)}
            <AddFormPost {...this.props} />
          </Section>
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    postsIds: Object.keys(posts)
      .sort((a, b) => posts[b].timestamp - posts[a].timestamp)
  }
}

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts)
