const initialState = {
    date: '2018-12-17',
    creater: 'baishu',
    place: '杭州',
    pageNum: 1,
    tag:'',
};
export const actionTypes = {
    CREATE_LOG_OPERATE: 'CREATE_LOG_OPERATE',
    CREATE_LOG_RESPONSE: 'CREATE_LOG_RESPONSE',
    ADD_LOG_NOTE: 'ADD_LOG_NOTE',
    ADD_LOG_NOTE_RESPONSE: 'ADD_LOG_NOTE_RESPONSE',
};

export const actions = {
    create_log_operate: function (text, pageNum=1) {
        return {
            type: actionTypes.CREATE_LOG_OPERATE,
            text,
            pageNum
        }
    },
    add_log_note: function (context) {
        return {
            type: actionTypes.ADD_LOG_NOTE,
            context,
            pageNum:2,
            tag:'JavaScript',
        }
    }
};

/**
* @param {Object} state - Default application state
* @param {Object} action - Action from action creator
* @returns {Object} New state
*/
export function reducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.CREATE_LOG_RESPONSE:
            return {
                ...state,
                creater: action.data.total
            };
        case actionTypes.ADD_LOG_NOTE_RESPONSE:
        return {
            ...state,
            creater: action.data.list[0].title
        };
        default: return state;
    }
};