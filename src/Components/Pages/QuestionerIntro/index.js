import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

import beforeQ from "../../../static/beforeQ.png";
import duringQ from "../../../static/duringQ.png";
import step1question from "../../../static/step1-question.gif";
import modalintention from "../../../static/modal-intention.gif";
import modalcategorize from "../../../static/modal-categorize.gif";
import modalsimilarity from "../../../static/modal-similarity.gif";
import step2explore from "../../../static/step2-explore.gif";
import step3selection from "../../../static/step3-selection.gif";
import step3question from "../../../static/step3-question.gif";
import step4explore from "../../../static/step4-explore.gif";

const StyledContainer = styled.div`
  padding-top: 3em;
`;

const StyledIntro = styled.div`
  max-width: 800px;
  margin: auto;
  margin-top: 3em;
  & img {
    display: block;
    max-width: 80%;
  }
`;
const StyledActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

class IntroView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: 0
    };
    this.threshold = 3;
    this.nextPos = this.nextPos.bind(this);
    this.prevPos = this.prevPos.bind(this);
  }
  nextPos() {
    this.setState(prevState => ({
      pos: Math.min(prevState.pos + 1, this.threshold)
    }));
  }
  prevPos() {
    this.setState(prevState => ({ pos: Math.max(prevState.pos - 1, 0) }));
  }
  render() {
    const { nextPage } = this.props;
    const listing = ["1", "a", "i"];
    const before_instructions = [
      {
        text: "In the first phase,",
        children: [
          {
            text: "We expect you to raise questions by yourself."
          },
          {
            text:
              "If you cannot think of questions anymore, then you can proceed to the next phase."
          }
        ]
      },
      {
        text: "In the second phase,",
        children: [
          { text: "You can see questions made by other readers." },
          {
            text:
              "Raise more questions after getting inspired by others question."
          }
        ]
      }
    ];

    const phase1_instructions = [
      {
        text: "Type in your question and click ‘add’ button.",
        image: step1question
      },
      {
        text: "Fill in additional information about your question.",
        children: [
          {
            text: "Intention: How your question helps other readers.",
            image: modalintention,
            children: [
              { text: "E.g., better evaluate the validity of the research" },
              {
                text:
                  "E.g., know how to use this finding in their everyday life. "
              }
            ]
          },
          {
            text: "Categorize",
            image: modalcategorize,
            children: [
              {
                text:
                  "Categorize your question into one of the following group. ",
                children: [
                  {
                    text:
                      "Background - if your question asks about background knowledge related to the topic. "
                  },
                  {
                    text:
                      "Research - if your question asks about the research itself. "
                  },
                  {
                    text:
                      "Application - if your question asks about how the research is applied to people’s decision or behavior. "
                  }
                ]
              },
              {
                text:
                  "After you select one of the group, you can choose lower level categories. "
              }
            ]
          }
        ]
      },
      {
        text:
          "Evaluate the similarity between your question and others’ question.",
        image: modalsimilarity,
        children: [
          { text: "You will see 10 of others’ questions. " },
          {
            text:
              "For each question, judge whether the question is same/similar/different to your question. ",
            children: [
              {
                text:
                  "Same - if the question asks exactly the same information that your question asks. ",
                children: [
                  {
                    text:
                      "“How many participants did they study?” and “How many people participated in the research?”"
                  }
                ]
              },
              {
                text:
                  "Similar - if the question is not exactly same as your question, but is closely related to your question. ",
                children: [
                  {
                    text:
                      "E.g, “How many participants did they observe?” and “How old were the participants?”"
                  }
                ]
              },
              {
                text:
                  "Different - if the question asks about the totally different information. ",
                children: [
                  {
                    text:
                      "E.g., “How many participants did the observe?” and “What kind of fish is helpful?” "
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        text: "Generate questions as many as you can. "
      },
      {
        text: "If you cannot think of new question anymore, proceed to Phase 2."
      }
    ];

    const phase2_instructions = [
      {
        text:
          "Discover questions generated by other readers. We hope seeing others’ questions will inspire you to come up with new questions.",
        image: step2explore
      },
      { text: "Generate your questions as before.  " }
    ];

    const during_instructions = [
      {
        text: "In the first phase,",
        children: [
          { text: "We expect you to raise questions by yourself." },
          {
            text: `
              <b>If you cannot think of questions anymore</b>
            , then you can proceed to the next phase. `
          }
        ]
      },
      {
        text: "In the second phase, ",
        children: [
          { text: "You can see questions made by other readers. " },
          {
            text:
              "Raise more questions after getting inspired by others question. "
          }
        ]
      }
    ];
    const phase3_instructions = [
      {
        text:
          "Click pen button and select sentence(s) that your question is related to. ",
        image: step3selection
      },
      {
        text: "Type in your question and click ‘add’ button.",
        image: step3question
      },
      {
        text: "Fill in additional information about your question, as before."
      },
      {
        text:
          "Evaluate the similarity between your question and others’ question, as before."
      },
      {
        text:
          "You can see your questions and the sentence(s) that you raised the question will be highlighted. "
      },
      { text: "Generate questions as many as you can. " },
      {
        text: "If you cannot think of new question anymore, proceed to Phase 2."
      }
    ];
    const phase4_instructions = [
      {
        text:
          "Discover questions generated by other readers. We hope seeing others’ questions will inspire you to come up with new questions.",
        image: step4explore,
        children: [
          {
            text:
              "The sentence(s) that others’ questions are made on will be highlighted. "
          },
          {
            text:
              "If you hover on highlighted sentence, you can see questions made on that sentence."
          }
        ]
      },
      {
        text: "Generate your questions as before. "
      }
    ];
    const recursive_listing = (depth, data) => {
      return (
        <ol type={listing[depth % 3]}>
          {data.map(item => {
            return (
              <React.Fragment>
                <li>
                  <span dangerouslySetInnerHTML={{ __html: item.text }} />
                  <br />
                  <br />
                  {item.image && <img src={item.image} />}
                  <br />
                </li>
                {item.children &&
                  item.children.length > 0 &&
                  recursive_listing(depth + 1, item.children)}
              </React.Fragment>
            );
          })}
        </ol>
      );
    };

    return (
      <StyledIntro>
        {(this.state.pos === 0 || this.state.pos === 1) && (
          <React.Fragment>
            <h1>Instruction - (1) Question Before Reading</h1>
            <img src={beforeQ} style={{ margin: "0 auto" }} />
          </React.Fragment>
        )}
        {this.state.pos === 0 && (
          <React.Fragment>
            In this step, you are going to read the title of a news story about
            a scientific research. Based on the title, raise questions on what
            you expect to read from the content. You have to raise 3 or more
            questions. Please raise many questions as you can.
            <br />
            <br />
            You can generate questions in two different phase.
            {recursive_listing(0, before_instructions)}
          </React.Fragment>
        )}

        {this.state.pos === 1 && (
          <React.Fragment>
            <p>
              Phase 1 - Generate questions by yourself.
              {recursive_listing(0, phase1_instructions)}
            </p>
            <p>
              Phase 2 - Generate questions after seeing others’ question.
              {recursive_listing(0, phase2_instructions)}
            </p>
          </React.Fragment>
        )}

        {(this.state.pos === 2 || this.state.pos === 3) && (
          <React.Fragment>
            <h1>Instruction - (2) Question During Reading</h1>
            <img src={duringQ} style={{ margin: "0 auto" }} />
          </React.Fragment>
        )}

        {this.state.pos === 2 && (
          <React.Fragment>
            In this step, you are going to read the article. Based on the
            article, raise questions on what you want to know but the article
            DOES NOT COVER. You have to raise 3 or more questions.{" "}
            <b>Please raise many questions as you can.</b>
            <br />
            <br />
            As before, you can generate questions in two different phase.
            {recursive_listing(0, during_instructions)}
          </React.Fragment>
        )}

        {this.state.pos === 3 && (
          <React.Fragment>
            <p>
              Phase 1 - Generate questions by yourself.
              {recursive_listing(0, phase3_instructions)}
            </p>
            <p>
              Phase 2 - Generate questions after seeing others’ question.
              {recursive_listing(0, phase4_instructions)}
            </p>
          </React.Fragment>
        )}
        <StyledActionBar>
          <Button.Group>
            <Button onClick={this.prevPos} disabled={this.state.pos === 0}>
              Prev
            </Button>
            <Button
              onClick={
                this.state.pos === this.threshold ? nextPage : this.nextPos
              }
              positive={this.state.pos === this.threshold}
            >
              {this.state.pos === this.threshold ? "Start" : "Next"}
            </Button>
          </Button.Group>
        </StyledActionBar>
      </StyledIntro>
    );
  }
}

const QuestionerIntro = connect(
  null,
  null
)(IntroView);

export default QuestionerIntro;
