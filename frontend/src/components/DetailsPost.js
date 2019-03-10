import React, { Component } from "react"
import Layout from "../layouts/Layout"
import styled from "styled-components"
import { connect } from "react-redux"
import { fetchDetailsPost } from "../actions"
import LinksFooter from "./Votes"
import Comments from "./Comments"
import AddNewComment from "./AddNewComment"
import Section from "./Section"

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
`
const Title = styled(Item)`
  font-size: 1.5rem;
`
class DetailsPost extends Component {
 
  componentDidMount() {
    const { category, post_id } = this.props.match.params

    this.props.fetchDetailsPost(post_id, () => {
      this.props.history.push(`/${category}/${post_id}`)
    })
  }

  render() {
    const { details } = this.props
    const { post_id } = this.props.match.params

    return (
      <Layout {...this.props}>
        <Section>
          <Content>
            <Block>
              <Title>
                <Item>{details.title}</Item>
              </Title>
              <Item>comment: {details.body}</Item>
              <Item>author: {details.author}</Item>

              <LinksFooter
                idVote={post_id}
                voteScore={details.voteScore}
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
  }
}
const mapStateToProps = ({ details }) => ({ details })

export default connect(
  mapStateToProps,
  { fetchDetailsPost }
)(DetailsPost)
