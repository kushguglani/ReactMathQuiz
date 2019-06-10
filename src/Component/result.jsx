import React from 'react';

const result = (props) => {
	console.log(props);
	let result = props.quizData.map((curr) =>
		<div id="question" key={curr.quesNo} style={props.style} >
			<h4>Question {curr.quesNo}/{20}</h4>
			<p className={curr.userAnsw !== curr.correctAnswer ? 'red' : ''}>{curr.question} ?</p>
			<div id="answers">
				<ul>
					<li
						className={curr.answerList[0] === curr.correctAnswer ? 'right' : '' 
							+ curr.answerList[0] == curr.userAnsw ? 'wrong' : ''}
						data-no="1"><span>A</span> <p>{curr.answerList[0]}</p></li>
					<li
						className={curr.answerList[1] === curr.correctAnswer ? 'right' : '' 
							+ curr.answerList[1] == curr.userAnsw ? 'wrong' : ''}
						data-no="2"><span>B</span> <p>{curr.answerList[1]}</p></li>
					<li
						className={curr.answerList[2] === curr.correctAnswer ? 'right' : '' 
							+ curr.answerList[2] == curr.userAnsw ? 'wrong' : ''}
						data-no="3"><span>C</span> <p>{curr.answerList[2]}</p></li>
					<li
						className={curr.answerList[3] === curr.correctAnswer ? 'right' : '' + curr.answerList[3] == curr.userAnsw ? 'wrong' : ''}
						data-no="4"><span>D</span> <p>{curr.answerList[3]}</p></li>
				</ul>
			</div>
		</div>
	)
	return (
		result
	);
};

export default result;
