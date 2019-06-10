const InitialState = {
    firstQuizStart: false,
    secondQuizStart: false,
    firstQuiz: [],
    secondQuiz: []
}
export default function storedState(state = InitialState, action) {
    switch (action.type) {
        case "CHANGE_ACTIVE_QUIZ":
            return {
                ...state,
                firstQuizStart: action.payload.active === 1 ? action.payload.status : state.firstQuizStart,
                secondQuizStart: action.payload.active === 2 ? action.payload.status : state.secondQuizStart,
            }
        case "ADD_QUESTION_FIRST":
            return {
                ...state,
                firstQuiz: [...state.firstQuiz, action.payload],

            }

        case "ADD_QUESTION_SECOND":
            return {
                ...state,
                secondQuiz: [...state.secondQuiz, action.payload],

            }
        case "EXIT_QUIZ_FIRST":
            return {
                ...state,
                firstQuizStart: false,
                firstQuiz: [],

            }

        case "EXIT_QUIZ_SECOND":
            return {
                ...state,
                secondQuizStart: false,
                secondQuiz: [],

            }

        case "INITIAL_STATE":
            return {
                firstQuizStart: false,
                secondQuizStart: false,
                firstQuiz: [],
                secondQuiz: []

            }
        default:
            return state;
    }
}