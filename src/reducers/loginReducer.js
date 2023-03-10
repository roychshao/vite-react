const initialState = {
    isLogin: false,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LoggedIn':
            return {
                ...state,
                isLogin: true,
            }
        case 'LoggedOut':
            return {
                ...state,
                isLogin: false,
            }
        default:
            return state;
    }
};

export default loginReducer;
