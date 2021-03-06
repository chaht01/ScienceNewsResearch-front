import React from "react";
import styled from "styled-components";
import { colors } from "../../Configs/var";
import { Button } from "semantic-ui-react";
import { isFunction as _isFunction } from "lodash";
import StyledLink from "../../Atoms/StyledLink";
import tinycolor from "tinycolor2";

const QuestionAnsweredButton = styled(Button)`
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  ${props =>
    props.answered &&
    `
    background: transparent !important;
    &:hover{
      background: #fff !important;
    }
  `};
`;

const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px;
  grid-row-gap: 0.4em;
  margin-bottom: 0.4em;
  align-items: center;
`;

const StyledQuestion = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.2s;
  margin-bottom: 1em;
  &:last-child {
    margin-bottom: 0;
  }
  ${props =>
    props.expanded &&
    `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);`} &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  ${props =>
    props.answered &&
    `
    background: transparent;
    `};
`;
StyledQuestion.Inner = styled.div`
  padding: 0.6em 1em 0.4em;
`;

StyledQuestion.Text = styled.div`
  flex: 1;
  padding-left: 1.4em;
  padding-right: 0.4em;
  position: relative;
  &:before {
    position: absolute;
    content: "Q.";
    font-size: 14px;
    margin-left: -1.4em;
  }
`;

StyledQuestion.DescriptionRow = styled.div`
position: relative;
  padding: 1em 0.4em;
  margin-top: 1em;
  margin-bottom: 0em;
  font-size: 1em;
  font-style: italic;
  &:before {
    display: block;
    position: absolute;
    top: 1em;
    transform: translateY(-80%);
    content: "${props => props.content}";
    font-family: initial;
    font-style: normal;
    font-size: 0.8em;
    left: 0;
  }
`;

const StyledLabelGroup = styled.div`
  display: flex;
  font-size: 0.8em;
`;

const StyledLabel = styled.span`
  position: relative;
  border-radius: 4px;
  padding: 0.2em 0.8em;
  border-radius: 16px;
  background: #ddd;
  margin-left: 1em;
  &:before {
    content: "";
    background: #ddd;
    display: block;
    position: absolute;
    width: 1em;
    height: 2px;
    left: 0;
    margin-left: -1em;
    top: 50%;
  }
  &:first-child {
    margin-left: 0;
  }
  &:first-child:before {
    display: none;
    margin: 0;
  }
`;

const AnswererQuestion = ({
  question,
  answered,
  expanded,
  startHighlight,
  onExpandChange
}) => {
  if (question === undefined) {
    return <StyledQuestion>loading...</StyledQuestion>;
  }
  const {
    id,
    text,
    intention,
    created_step,
    code_first,
    code_second,
    article_title,
    article_publisher,
    reftexts
  } = question;
  if (created_step > 3) {
    //when question is based on the body
    return (
      <StyledQuestion expanded={expanded} answered={answered}>
        <StyledQuestion.Inner>
          <QuestionGrid>
            <StyledQuestion.Text>{text}</StyledQuestion.Text>
          </QuestionGrid>

          <QuestionGrid>
            <StyledLabelGroup>
              <StyledLabel>{code_first.text}</StyledLabel>
              {code_second && <StyledLabel>{code_second.text}</StyledLabel>}
            </StyledLabelGroup>
            <StyledLink
              color={colors.gray_font}
              style={{ textAlign: "center" }}
              onClick={onExpandChange}
            >
              {expanded ? "fold" : "see more"}
            </StyledLink>
          </QuestionGrid>
          <StyledQuestion.DescriptionRow
            content={`This question was asked from ${article_publisher}.`}
          />
          {expanded && (
            <StyledQuestion.DescriptionRow
              content={`Answer to this question will help readers to`}
            >
              {intention}
            </StyledQuestion.DescriptionRow>
          )}
          {expanded && (
            <React.Fragment>
              <StyledQuestion.DescriptionRow
                content={`The title of the article is `}
              >
                {article_title}
              </StyledQuestion.DescriptionRow>
              <StyledQuestion.DescriptionRow
                content={`Raised on below sentence(s)`}
              >
                {reftexts.map(reftext => <div>{reftext.sentence.text}</div>)}
              </StyledQuestion.DescriptionRow>
            </React.Fragment>
          )}
        </StyledQuestion.Inner>

        {startHighlight &&
          _isFunction(startHighlight) && (
            <QuestionAnsweredButton
              fluid
              compact
              content={answered ? `See my answer` : `Add your answer`}
              basic={!answered}
              answered={answered}
              onClick={() => startHighlight()}
            />
          )}
      </StyledQuestion>
    );
  } else {
    //when question is based on title.
    return (
      <StyledQuestion expanded={expanded} answered={answered}>
        <StyledQuestion.Inner>
          <QuestionGrid>
            <StyledQuestion.Text>{text}</StyledQuestion.Text>
          </QuestionGrid>

          <QuestionGrid>
            <StyledLabelGroup>
              <StyledLabel>{code_first.text}</StyledLabel>
              {code_second && <StyledLabel>{code_second.text}</StyledLabel>}
            </StyledLabelGroup>
            <StyledLink
              color={colors.gray_font}
              style={{ textAlign: "center" }}
              onClick={onExpandChange}
            >
              {expanded ? "fold" : "see more"}
            </StyledLink>
          </QuestionGrid>
          <StyledQuestion.DescriptionRow
            content={`This question was asked from ${article_publisher}.`}
          />
          {expanded && (
            <StyledQuestion.DescriptionRow
              content={`Answer to this question will help readers to`}
            >
              {intention}
            </StyledQuestion.DescriptionRow>
          )}
          {expanded && (
            <React.Fragment>
              <StyledQuestion.DescriptionRow
                content={`The title of the article is `}
              >
                {article_title}
              </StyledQuestion.DescriptionRow>
              {reftexts.length > 0 && (
                <StyledQuestion.DescriptionRow
                  content={`Raised on below sentence(s)`}
                >
                  {reftexts.map(reftext => <div>{reftext.sentence.text}</div>)}
                </StyledQuestion.DescriptionRow>
              )}
            </React.Fragment>
          )}
        </StyledQuestion.Inner>

        {startHighlight &&
          _isFunction(startHighlight) && (
            <QuestionAnsweredButton
              fluid
              compact
              content={answered ? `See my answer` : `Add your answer`}
              basic={!answered}
              answered={answered}
              onClick={() => startHighlight()}
            />
          )}
      </StyledQuestion>
    );
  }
};

export default AnswererQuestion;
