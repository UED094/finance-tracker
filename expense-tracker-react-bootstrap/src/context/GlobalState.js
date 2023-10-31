

// Initial state
import {createContext, useReducer} from "react";
import AppReducer from "./AppReducer";

const initialState = {
    "transactions": [
        {
            "id": 51722789,
            "description": "Versace",
            "amount": -120,
            "category": "Clothing"
        },
        {
            "id": 53450693,
            "description": "ResMed Salary",
            "amount": 3500,
            "category": "Income"
        },
        {
            "id": 45417528,
            "description": "BMW Gas ",
            "amount": -80,
            "category": "Transportation"
        }
    ],
    "categories": ['Food', 'Transportation', 'Housing', 'Entertainment']
}

export const GlobalContext= createContext(initialState);

export const GlobalProvider = ( { children}) => {
    const [ state, dispatch] = useReducer(AppReducer, initialState);

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }


    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        });
    }

    // Add a new category and save it to local storage
    const addCategory = (category) => {
        dispatch({
            type: 'ADD_CATEGORY',
            payload: category
        });
    };

    return (<GlobalContext.Provider value={ {
        transactions: state.transactions,
        categories: state.categories,
        deleteTransaction,
        addTransaction,
        addCategory
    }}>
        {children}
        </GlobalContext.Provider> );
}