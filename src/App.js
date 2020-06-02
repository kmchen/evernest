import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

const GreenCheck = () => (
  <span style={{ color: "green", paddingRight: "5px" }}>&#10003;</span>
);
const RedCross = () => (
  <span style={{ color: "red", paddingRight: "5px" }}>&#x2717;</span>
);

const StyledRule = styled.div`
  padding: 5px 2px;
`;

const validationRules = (isValid, ruleName) => {
  if (isValid === null) {
    return <StyledRule>{ruleName}</StyledRule>;
  }
  return isValid ? (
    <StyledRule>
      <GreenCheck />
      {ruleName}
    </StyledRule>
  ) : (
    <StyledRule>
      <RedCross style={{ padding: 5 }} />
      {ruleName}
    </StyledRule>
  );
};

const validationRuleNames = [
  {
    id: "eightPlusChars",
    name: "8+ characters",
  },
  {
    id: "lowercaseLetter",
    name: "lowercase letter",
  },
  {
    id: "uppercaseLetter",
    name: "uppercase letter",
  },
  {
    id: "number",
    name: "number",
  },
  {
    id: "specialCharacter",
    name: "special character",
  },
];

const eightPlusChars = (input) => input.length >= 8;
const lowercaseLetter = (input) =>
  [...input].reduce((acc, curr) => acc || /[a-z]/.test(curr), false);
const uppercaseLetter = (input) =>
  [...input].reduce((acc, curr) => acc || /[A-Z]/.test(curr), false);
const number = (input) =>
  [...input].reduce((acc, curr) => acc || /\d/.test(curr), false);
const specialCharacter = (input) =>
  [...input].reduce(
    (acc, curr) => acc || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(curr),
    false
  );

function App() {
  const [state, setState] = useState({
    eightPlusChars: null,
    lowercaseLetter: null,
    uppercaseLetter: null,
    number: null,
    specialCharacter: null,
  });

  const validateInputChange = (event) => {
    const { value } = event.target;
    if (eightPlusChars(value)) {
      setState((state) => ({ ...state, eightPlusChars: true }));
    } else {
      setState((state) => ({ ...state, eightPlusChars: false }));
    }
    if (lowercaseLetter(value)) {
      setState((state) => ({ ...state, lowercaseLetter: true }));
    } else {
      setState((state) => ({ ...state, lowercaseLetter: false }));
    }
    if (uppercaseLetter(value)) {
      setState((state) => ({ ...state, uppercaseLetter: true }));
    } else {
      setState((state) => ({ ...state, uppercaseLetter: false }));
    }
    if (number(value)) {
      setState((state) => ({ ...state, number: true }));
    } else {
      setState((state) => ({ ...state, number: false }));
    }
    if (specialCharacter(value)) {
      setState((state) => ({ ...state, specialCharacter: true }));
    } else {
      setState((state) => ({ ...state, specialCharacter: false }));
    }
  };
  return (
    <main className="wrapper">
      <section className="hero" />
      <section className="middle" id="middle">
        <ul>
          <li>
            <input onChange={validateInputChange} />
          </li>
          <li>
            <input />
            {validationRuleNames.map((ruleName) =>
              validationRules(state[ruleName.id], ruleName.name)
            )}
            <button
              style={{
                width: "100%",
                padding: "10px",
                color: "white",
                backgroundColor: "black",
              }}
            >
              Submit
            </button>
          </li>
        </ul>
      </section>
      <section className="hero" />
    </main>
  );
}

export default App;
