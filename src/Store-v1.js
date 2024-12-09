import { combineReducers, legacy_createStore as createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// reducer for account
const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
};

// reducer for customer
const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer": {
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    }
    case "customer/updateName": {
      return { ...state, fullName: action.payload };
    }
    default:
      return state;
  }
};

// creating store
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// console.log("Hey Redux");

// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "To buy a car" },
// });
// console.log(store.getState());

// store.dispatch({
//   type: "account/payLoan",
// });
// console.log(store.getState());

// action creators:

const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};
const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};
const requestLoan = (amount, purpose) => {
  return { type: "account/requestLoan", payload: { amount, purpose } };
};
const payLoan = () => {
  return { type: "account/payLoan" };
};

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "To buy a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

// Action for customer
const createCustomer = (fullName, nationalID) => {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
};

const updateName = (fullName) => {
  return { type: "customer/updateName", payload: fullName };
};

// creating store for customer
store.dispatch(createCustomer("Angela Mavoolumma", "16011996"));
console.log(store.getState());

store.dispatch(updateName("Angela Peters"));
console.log(store.getState());

// this method works just fine as well
// const deposit = amount => {
//     return store.dispatch({ type: 'account/deposit', payload: amount });
//   }

//   deposit(500);

// WITHOUT ACTION CREATOR FUNCTIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!