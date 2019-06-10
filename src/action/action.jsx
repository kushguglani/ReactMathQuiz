export function active_quiz(data) {
    return {
        type: "CHANGE_ACTIVE_QUIZ",
        payload: data
    }
}
export function initialState() {
    return {
        type: "INITIAL_STATE",
    }
}
export function exitQuiz(no) {
    console.log(no);

    function firstQuiz(data) {
        return {
            type: "EXIT_QUIZ_FIRST",
        }
    }
    function secondQuiz(data) {
        return {
            type: "EXIT_QUIZ_SECOND",
        }
    }
    return function (dispatch) {
        if (no === "1") dispatch(firstQuiz());
        else dispatch(secondQuiz());
        return no;
    }

}
export function addQuizData(data, no) {
    function firstQuiz(data) {
        return {
            type: "ADD_QUESTION_FIRST",
            payload: data,
        }
    }
    function secondQuiz(data) {
        return {
            type: "ADD_QUESTION_SECOND",
            payload: data,
        }
    }
    return function (dispatch) {
        if (no === "1") dispatch(firstQuiz(data));
        else dispatch(secondQuiz(data));
        return data;
    }

}