import InputWithValidation from "./InputWithValidation";
import { Container, Error, Title } from "./SignUpForm.style";
import useSignUpForm, { SignUpFormState, SignUpValidator } from "./hook";
import { SignUpStatePriority } from "./hook";

const validator: SignUpValidator = {
  validateEmail(value) {
    // email 정규식
    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value);
  },
  validateId(value) {
    // 8자 이상
    return typeof value === "string" && value.length >= 8;
  },
  validateName(value) {
    return typeof value === "string" && value.length >= 5;
  },
  validatePassword(value) {
    // 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자 정규식
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      value
    );
  },
  validatePasswordForVerify(value, context) {
    return value === context?.password;
  },
};

const priority: SignUpStatePriority = {
  name: 1,
  email: 2,
  id: 3,
  password: 4,
  passwordForVerify: 5,
};

const inputOptions: {
  key: keyof Omit<SignUpFormState, "invalidFieldNames" | "isValid">;
  error: JSX.Element;
}[] = [
  {
    key: "name",
    error: <Error text="5자 이상" />,
  },
  {
    key: "email",
    error: <Error text="이메일 형식이 아님" />,
  },
  {
    key: "id",
    error: <Error text="8자 이상" />,
  },
  {
    key: "password",
    error: <Error text="8자 이상, 특수문자 + 영문 + 숫자 포함" />,
  },
  {
    key: "passwordForVerify",
    error: <Error text="password와 다름니다." />,
  },
];

export function SignUpForm() {
  const {
    state,
    dispatch: update,
    firstInvalidField,
    check,
  } = useSignUpForm(validator, priority);

  const handleSubmit = () => {
    if (check()) {
      alert("통과");
    } else {
      alert("실패");
    }
  };

  return (
    <Container>
      <Title text="Sign Up" />
      {inputOptions.map(({ key, error }) => (
        <InputWithValidation
          key={key}
          value={state[key] as string}
          ComponentOnInvalid={error}
          onChange={(v) => update({ [key]: v })}
          focused={firstInvalidField === key}
          isInvalid={state.invalidFieldNames.has(key)}
        />
      ))}
      <button onClick={handleSubmit}>Check</button>
    </Container>
  );
}

export default SignUpForm;
