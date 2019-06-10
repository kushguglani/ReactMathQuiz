import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Result from "../Component/result";
import Popup from '../Component/modal'
import Answers from "../Component/Answers";
import '../Component/quiz.css'
import { addQuizData,exitQuiz } from '../action/action';

class Quiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quesNo: 1,
			total: 20,
			question: '',
			answerList: [],
			userAnsw: null,
			correctAnswer: null,
			questionAnswered: false,
			score: 0,
			displayPopup: 'none',
			displayResult: 'none',
			displayQuestion: 'initial'
		}
	}

	componentWillMount() {
		this.questionAnswered();
	}
	handleShowButton = (ans, score) => {
		this.setState({
			score: this.state.score + score,
			userAnsw: ans,
			questionAnswered: true

		});
	}
	nextQuestion = () => {
		this.child.resetState();
		let { quesNo, total } = this.state;
		if (quesNo === total) {
			this.addDataInStore();
			this.setState({
				displayPopup: 'flex'
			});

		} else {
			this.addDataInStore();
			this.setState({
				quesNo: this.state.quesNo + 1,
				questionAnswered: false,
			}, this.questionAnswered())

		}

	}
	showQuestions = () => {
		this.setState({
			displayResult: 'initial',
			displayQuestion: 'none',
			displayPopup: 'none',
		})
	}
	addDataInStore = () => {
		let quesData = {
			quesNo: this.state.quesNo,
			question: this.state.question,
			answerList: this.state.answerList,
			correctAnswer: this.state.correctAnswer,
			userAnsw: this.state.userAnsw,
			score: this.state.score
		}
		this.props.addQuizData(quesData, this.props.quizNo)

	}
	questionAnswered = () => {
		let firsNo = Math.floor(Math.random() * 10);
		let secondNo = Math.floor(Math.random() * 10);
		let operator = ["plus", "minus", "multiply", "divide"];
		let selectedOperator = operator[Math.floor(Math.random() * operator.length)];
		let result = Math.round(this.fetchResult(firsNo, secondNo, selectedOperator) * 100) / 100;
		console.log(result);
		let resultList = [];
		if (result === Infinity || result === undefined || Number.isNaN(result)) {
			resultList = [result, 1, 0, -1].sort(function () { return 0.5 - Math.random() })
		} else if (result === 0) {
			resultList = [result, 1, Infinity, -1].sort(function () { return 0.5 - Math.random() })
		}
		else {
			resultList = [result, Math.round(result + 1 * 100) / 100, Math.round(result - 1 * 100) / 100, Math.round(result / 2 * 100) / 100].sort(function () { return 0.5 - Math.random() })
		}
		this.setState({
			question: `${firsNo} ${selectedOperator} ${secondNo}`,
			answerList: resultList,
			correctAnswer: result
		})
	}
	exitQuiz(quizNo){
		this.props.exitQuiz(quizNo);
	}
	fetchResult = (firsNo, secondNo, selectedOperator) => {
		let result;
		switch (selectedOperator) {
			case "plus":
				result = firsNo + secondNo;
				break;
			case "minus":
				result = firsNo - secondNo;
				break;
			case "multiply":
				result = firsNo * secondNo;
				break;
			case "divide":
				result = firsNo / secondNo;
				break;
			default:
				break;
		}
		return result;

	}
	render() {
		let { quesNo, total, question, answerList, displayPopup, score, correctAnswer, questionAnswered, displayResult, displayQuestion } = this.state;
		let body = `You have completed the quiz. <br /> You got: <strong> ${score}</strong> out of <strong> ${total}  </strong> questions right.`
		return (
			<div className="row">
				<div className="col-1"></div>
				<div className="col-10" style={{ display: displayQuestion }}>
					<div id="question">
						<h4>Question {quesNo}/{total}</h4>
						<p>{question} ?</p>
					</div>
					<Answers
						answers={answerList}
						correct={correctAnswer}
						showSubmitButton={this.handleShowButton}
						isAnswered={questionAnswered}
						userAnswer={this.handleUserAnswer}
						onRef={ref => (this.child = ref)} />
					<div id="submit">
						{<button className="fancy-btn" onClick={this.nextQuestion} >{quesNo === total ? 'Finish quiz' : 'Next question'}</button>}
					</div>
					<p className="bottomScore">Score : {score}</p>
				</div>
				<div className="col-1 exitIcon"><i title="Exit" onClick={()=>this.exitQuiz(this.props.quizNo)} className="fa fa-times" aria-hidden="true"></i></div>

				<Popup style={{ display: displayPopup }} heading="Arithmetic Quiz Result" body={body} score={score} total={total} popupHandle={this.showQuestions} buttonText= 'View Questions' />
				<div className="results" style={{ display: displayResult }}>
					<Result
						quizNo={this.props.quizNo} quizData={this.props.quizNo === "1" ? this.props.firstQuizResult : this.props.secondQuizResult} />
				</div>
			</div>
		);
	}
}
function initMapStateToProps(state) {
	return {
		firstQuiz: state.storedState.firstQuizStart,
		secondQuiz: state.storedState.secondQuizStart,
		firstQuizResult: state.storedState.firstQuiz,
		secondQuizResult: state.storedState.secondQuiz,
	}
}

function initMapDispatchToProps(dispatch) {
	return bindActionCreators({
		addQuizData,
		exitQuiz
	}, dispatch)
}

export default connect(initMapStateToProps, initMapDispatchToProps)(Quiz);