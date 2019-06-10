import React from 'react';

class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            classNames: ['', '', '', '']
        }
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    checkAnswer=(e)=> { 
        let { isAnswered } = this.props;
        if(!isAnswered) {
            let elem = e.currentTarget;
            let { correct, showSubmitButton } = this.props;
            let answer = Number(elem.dataset.id);
            let number = Number(elem.dataset.no);
            let updatedClassNames = this.state.classNames;
            if(answer === correct){
                updatedClassNames[number-1] = 'right';
                showSubmitButton(answer,1);
            }
            else {
                updatedClassNames[number - 1] = 'wrong'; 
                showSubmitButton(answer,0);
            }
            
            this.setState({
                classNames: updatedClassNames
            })
        }
    }
   
    resetState=()=> {
        this.setState({
            classNames: ['', '', '', ''],
            isAnswered: false,
        });
    }
    render() {
        let { answers } = this.props;
        let { classNames } = this.state;
        return (
            <div id="answers">
                <ul>
                    <li onClick={this.checkAnswer} className={classNames[0]} data-id={answers[0]}data-no="1"><span>A</span> <p>{answers[0]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[1]} data-id={answers[1]} data-no="2"><span>B</span> <p>{answers[1]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[2]} data-id={answers[2]} data-no="3"><span>C</span> <p>{answers[2]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[3]} data-id={answers[3]} data-no="4"><span>D</span> <p>{answers[3]}</p></li>
                </ul>
            </div>
        );
    }
}

export default Answers