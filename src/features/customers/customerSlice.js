const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// reducer:
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

export default customerReducer;

// Action function creator:
export const createCustomer = (fullName, nationalID) => {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
};

export const updateName = (fullName) => {
  return { type: "customer/updateName", payload: fullName };
};
