// Store creation
import {combineReducers, createStore} from "redux";
import statsReducer from '../reducers/stats';
// import expensesReducer from '../reducers/expenses';
// import filtersReducer from '../reducers/filters';

export default () => {
    const store = createStore(
        combineReducers({
            stats: statsReducer,
        })
    );

    return store;
};


