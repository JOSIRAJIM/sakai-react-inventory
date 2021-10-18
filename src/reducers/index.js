
const Reducer = (state, action) => {
    switch (action.type) {
    case 'SET_USER_LOGGED':{
        if (state.user?.id === action.user.id && state.user?.role.id === action.user.role.id){
            return state
        }
        return {
            ...state,
            user: action.user
        }
    }
        default: {
            return state
        }
    }
}
export default Reducer