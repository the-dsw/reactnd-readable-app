import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { voteComment } from "../actions"

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`
const WrapVotes = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Button = styled.button`
  cursor: pointer;
  margin: 0 0.5rem;
  &:hover {
    opacity: 0.7;
    background-color: ${({ bgc }) => (bgc ? bgc : "")};
    border-radius: 5px;
    font-weight: 800;
  }
`
class VotesComment extends Component {

  handlerVote = (id, option) => {
    this.props.voteComment(id, option)
  }

  render() {
    const { idVote, voteScore } = this.props
    
    return (
      <Block>
        <WrapVotes>
          votes:{" "}
          <Button
            bgc="green"
            onClick={() => this.handlerVote(idVote, "upVote")}
          >
            +
          </Button>{" "}
          {voteScore}
          <Button
            bgc="red"
            onClick={() => this.handlerVote(idVote, "downVote")}
          >
            -
          </Button>
        </WrapVotes>
      </Block>
    )
  }
}

const mapStateToProps = ({ comments }) => ({ comments })
export default connect(
  mapStateToProps,
  { voteComment }
)(VotesComment)
