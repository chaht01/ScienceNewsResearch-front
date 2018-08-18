import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import Pool from "./Pool";
import SuggestionPreview from "./SuggestionPreview";
import { quesitonType, poolFoldingOpen } from "../../../Actions/question";
import { connect } from "react-redux";
import QuestionForm from "./QuestionForm";
import { StyledAside, StyledSticky } from "../../Atoms/StyledAside";
import styled from "styled-components";
import { StyledSegment } from "../../Atoms/StyledSegment";

const PoolSegment = styled(StyledSegment)`
  margin-top: 1.5em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const mapStateToProps = (state, ownProps) => {
  return {
    typed: state.questionReducer.typed,
    folding: state.questionReducer.folding,
    takeInProgress: state.takeReducer.inProgress.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    questionTyping: typed => dispatch(quesitonType(typed)),
    spreadPool: () => dispatch(poolFoldingOpen())
  };
};

const QuestionPoolView = ({
  typed,
  folding,
  questionTyping,
  spreadPool,
  addQuestion,
  page,
  article: { title, sentences: content },
  done,
  highlightMode,
  toggleHighlight,
  highlightQuestionId,
  highlightActive,
  confirmTakes,
  cancelHighlight,
  confirmHighlight,
  hoveredQuestionIds,
  hoverEnter,
  hoverLeave,

  questions
}) => {
  const handleTyped = value => {
    questionTyping(value);
  };
  const clearType = () => {
    questionTyping("");
  };
  const handleSubmit = e => {
    addQuestion(typed, page);
    clearType();
    e.preventDefault();
  };

  if (highlightMode) {
    const targetQuestion = questions.filter(
      q => q.id === highlightQuestionId
    )[0];
    const highlightedSentences = content
      .filter(s => highlightActive.indexOf(s.id) >= 0)
      .sort((a, b) => (a.order < b.order ? -1 : 1))
      .map(s => s.text);
    return (
      <StyledAside>
        <StyledSticky>
          <StyledSticky.Content>
            <SuggestionPreview
              targetQuestion={targetQuestion}
              highlightedSentences={highlightedSentences}
            />
          </StyledSticky.Content>
          <StyledSticky.Footer>
            <Button onClick={cancelHighlight}>Cancel</Button>
            <Button
              onClick={confirmHighlight}
              disabled={highlightedSentences.length === 0}
            >
              Confirm
            </Button>
          </StyledSticky.Footer>
        </StyledSticky>
      </StyledAside>
    );
  } else {
    return (
      <StyledAside>
        <StyledSticky>
          <h3>Questions that you made.</h3>
          <StyledSticky.Scrollable style={{ background: "#eeeeee" }}>
            <Pool questions={questions} />
          </StyledSticky.Scrollable>

          {folding && (
            <PoolSegment>
              <PoolSegment.Header>
                Based on the title of news article, what do you expect to read
                from the content?
              </PoolSegment.Header>
              <span>
                (Please write a wh-question, starting with who, where, when,
                what, why, how or so.)
              </span>
              <QuestionForm
                handleSubmit={handleSubmit}
                handleTyped={handleTyped}
                typed={typed}
                questions={questions}
                clearType={clearType}
                style={{ marginBottom: "1em" }}
              />
            </PoolSegment>
          )}

          {!folding && (
            <PoolSegment>
              <PoolSegment.Header>
                After seeing others’ questions, what do you expect to read from
                the content?
              </PoolSegment.Header>
              <span>
                (Please write a wh-question, starting with who, where, when,
                what, why, how or so.)
              </span>
              <QuestionForm
                handleSubmit={handleSubmit}
                handleTyped={handleTyped}
                typed={typed}
                questions={questions}
                clearType={clearType}
                style={{ marginBottom: "1em" }}
              />
            </PoolSegment>
          )}
          <StyledSticky.Footer>
            {page === 1 ? (
              <React.Fragment>
                {folding ? (
                  <StyledSticky.Action
                    onClick={spreadPool}
                    disabled={page.loading}
                    loading={page.loading}
                    content="I Can't think of question anymore"
                  />
                ) : (
                  <StyledSticky.Action
                    onClick={confirmTakes}
                    disabled={page.loading}
                    loading={page.loading}
                    content="Next"
                  />
                )}
              </React.Fragment>
            ) : page === 2 ? (
              <React.Fragment>
                <StyledSticky.Action
                  onClick={done}
                  disabled={page.loading}
                  loading={page.loading}
                  content="Done"
                />
              </React.Fragment>
            ) : null}
          </StyledSticky.Footer>
        </StyledSticky>
      </StyledAside>
    );
  }
};

const QuestionPool = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionPoolView);
export default QuestionPool;
