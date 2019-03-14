import React, { Component } from "react"
import Layout from "../layouts/Layout"
import styled from "styled-components"
import { connect } from "react-redux"
import { fetchDetailsPost } from "../actions"
import LinksFooter from "./Votes"
import Comments from "./Comments"
import LinksDetailsPost from "./LinksDetailsPost"
import AddNewComment from "./AddNewComment"
import Section from "./Section"
import NoPost from "./404"

const Content = styled.div`
  margin-top: 5rem;
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
const Item = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled(Item)`
  font-size: 1.5rem;
`
class DetailsPost extends Component {
 
  componentDidMount() {
    const { post_id } = this.props.match.params

    this.props.fetchDetailsPost(post_id)

  }

  render() {
    const { posts } = this.props
    const { post_id } = this.props.match.params
    const post = posts[post_id]

    if (post) {
      return (
        <Layout {...this.props}>
          <Section>
            <Content>
              <Block>
                <Title>
                  <Item>{post.title}</Item>
                </Title>
                <Item>comment: {post.body}</Item>
                <Item>author: {post.author}</Item>  
                <LinksDetailsPost postId={post_id} />
                <LinksFooter
                  idVote={post_id}
                  voteScore={post.voteScore}
                  {...this.props}
                />
              </Block>
              <h3>Add a new comment:</h3>
              <AddNewComment idComment={post_id} />
              <Comments idComment={post_id} />
            </Content>
          </Section>
        </Layout>
      )
    } else {
      return (
        <NoPost />
      )
    }
    
  }
}
const mapStateToProps = ({ posts }) => ({ 
  posts
})

export default connect(
  mapStateToProps,
  { fetchDetailsPost }
)(DetailsPost)
