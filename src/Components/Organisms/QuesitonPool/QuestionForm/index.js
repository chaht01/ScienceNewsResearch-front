import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import styled from "styled-components";
import Autosuggest from "react-autosuggest";
import QuestionCRUDModal from "../../QuestionCRUDModal";
import { takeMark, takeCreateRequest } from "../../../../Actions/take";

import "./style.css";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  column-gap: 0.5em;
  margin-top: 0.5em;
`;
const mapStateToProps = (state, ownProps) => {
  return {
    article: state.articleReducer.data,
    suggestions: state.questionReducer.suggestions,
    page: state.pageReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _markTake: (article_id, phase, question_id) =>
      dispatch(takeMark(article_id, question_id, phase)),
    _reqeustTake: (article_id, phase, question_id) =>
      dispatch(takeCreateRequest(article_id, question_id, phase))
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    article: { id: article_id },
    page
  } = stateProps;
  const { _markTake, _reqeustTake } = dispatchProps;
  return {
    ...stateProps,
    ...ownProps,
    markTake: _markTake.bind(null, article_id, page),
    reqeustTake: _reqeustTake.bind(null, article_id, page)
  };
};

const QuestionFormView = ({
  handleSubmit,
  handleTyped,
  typed,
  clearType,
  page,
  questions,
  suggestions,
  markTake,
  reqeustTake,
  ...rest
}) => {
  const onChange = event => {
    event.persist();
    handleTyped(event.target.value);
  };

  return (
    <Form {...rest}>
      <FormGrid>
        <Input value={typed} onChange={onChange} />
        <QuestionCRUDModal
          question={{ typed, intention: "", code: "", id: -1 }}
          trigger={
            <Button positive type="submit">
              add
            </Button>
          }
        />
      </FormGrid>
    </Form>
  );
};

const QuestionForm = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(QuestionFormView);

export default QuestionForm;
