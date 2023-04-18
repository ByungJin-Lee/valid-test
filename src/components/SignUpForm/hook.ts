import { Validator, useMemo, useReducer, useState } from "react";

export interface SignUpFormState {
  name: string;
  id: string;
  email: string;
  password: string;
  passwordForVerify: string;
  isValid: boolean;
  invalidFieldNames: Set<
    keyof Omit<SignUpFormState, "invalidFieldNames" | "isValid">
  >;
}

export type SignUpValidator = {
  [Key in keyof Omit<
    SignUpFormState,
    "invalidFieldNames" | "isValid"
  > as `validate${Capitalize<Key>}`]: (
    value: SignUpFormState[Key],
    context?: SignUpFormState
  ) => boolean;
};

const defaultSignUpFormState: SignUpFormState = {
  name: "",
  id: "",
  email: "",
  password: "",
  passwordForVerify: "",
  isValid: false,
  invalidFieldNames: new Set(),
};

export type SignUpStatePriority = {
  [key in keyof Omit<SignUpFormState, "isValid" | "invalidFieldNames">]: number;
};
export default function useSignUpForm(
  validator: SignUpValidator,
  priority: SignUpStatePriority
) {
  const [state, dispatch] = useReducer(
    reducer(validator),
    defaultSignUpFormState
  );
  const [count, setCount] = useState(0);

  const firstInvalidField = useMemo(
    () =>
      [...state.invalidFieldNames]
        .sort((lhs, rhs) => priority[lhs] - priority[rhs])
        .at(0),
    [state, count]
  );

  console.log(firstInvalidField);

  return {
    state,
    dispatch,
    firstInvalidField,
    check: () => {
      const isValid = validate(state, state, validator);
      if (!isValid) setCount((p) => p + 1);
      return isValid;
    },
  };
}

const reducer =
  (validator: SignUpValidator) =>
  (prev: SignUpFormState, updated: Partial<SignUpFormState>) => {
    const updatedState: SignUpFormState = {
      ...prev,
      ...updated,
    };

    validate(updatedState, updated, validator);

    return updatedState;
  };

const validate = (
  stored: SignUpFormState,
  updated: Partial<SignUpFormState>,
  validator: SignUpValidator
) => {
  stored.invalidFieldNames = new Set();

  (Object.keys(updated) as (keyof SignUpFormState)[]).forEach((key) => {
    switch (key) {
      case "invalidFieldNames":
      case "isValid":
        break;
      default:
        if (
          !validator[
            `validate${
              (key.charAt(0).toUpperCase() + key.slice(1)) as Capitalize<
                typeof key
              >
            }`
          ](stored[key], stored)
        )
          stored.invalidFieldNames.add(key);
    }
  });

  return (stored.isValid = stored.invalidFieldNames.size === 0);
};
