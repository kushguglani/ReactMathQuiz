import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Quiz from './quiz'
import { active_quiz, initialState } from '../action/action';

class Home extends React.Component {
    componentDidMount() {
        this.props.initialState();
    }
    render() {
        let btnChange = { active: 1, status: true };
        let btnChange2 = { active: 2, status: true };
        return (
            <React.Fragment>
                <div className="jumbotron text-center noMarginBtm" >
                    <h1>Online Quiz</h1>
                    <p>Practice Arithmetic</p>
                </div>
                <div className="quizSection">
                    <div className="row">
                        <div className="col quiz ">
                            {
                                this.props.firstQuiz ? (
                                    <Quiz quizNo="1" />) :
                                    (<button type="button" className="btn btn-danger btn-circle btn-xl" onClick={() => this.props.active_quiz(btnChange)}>
                                        Start Quiz 1
							    </button>)
                            }

                        </div>
                        <div className="quizFirst"></div>
                        <div className="col quiz ">
                            {
                                this.props.secondQuiz ? (
                                    <Quiz quizNo="2" />) :
                                    (<button type="button" className="btn btn-danger btn-circle btn-xl" onClick={() => this.props.active_quiz(btnChange2)}>
                                        Start Quiz 2
							    </button>)
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function initMapStateToProps(state) {
    return {
        firstQuiz: state.storedState.firstQuizStart,
        secondQuiz: state.storedState.secondQuizStart
    }
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        active_quiz,
        initialState
    }, dispatch)
}

export default connect(initMapStateToProps, initMapDispatchToProps)(Home);