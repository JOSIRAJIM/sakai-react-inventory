
const Reducer = (state, action) => {
    switch (action.type) {
    case 'SET_USER_LOGGED':
        return {
            ...state,
            user: action.user
        }
        default: {
            return state
        }
    }
}
export default Reducer