import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/login/SignIn";
import { userLogin } from "../components/utilities/userLogin";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";

jest.mock("../components/utilities/userLogin");
jest.mock("react-redux", () => {
  const ActualReactRedux = jest.requireActual("react-redux");
  return {
    ...ActualReactRedux,
    useSelector: jest.fn().mockImplementation(() => {
      return mockState;
    }),
  };
});

describe("Login Faild", () => {
  it("should display error message for incorrect email and password", async () => {
    const errorMessage = "Incorrect email or password";
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.change(emailInput, {
      target: { value: "abc@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    userLogin.mockRejectedValue(errorMessage); // Mock userLogin function to return the error message

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(store.getState().loggedInUser.data).toEqual(undefined);
      expect(getByText(errorMessage)).toBeInTheDocument();
    });
  });
});

describe("Login Successfully", () => {
  const userData = {
    email: "abc@gmail.com",
    name: "Muhammad Sheraz",
  };

  beforeEach(() => {
    userLogin.mockResolvedValue({
      userData,
      token: "token",
    });
  });

  it("renders the form with email and password input fields and a submit button", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    const emailInput = getByText("Email");
    const passwordInput = getByLabelText(/Password/i);
    const submitButton = getByText("Sign In");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("renders the Login form and submits successfully", async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button");

    fireEvent.change(emailInput, {
      target: { value: "abc@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "123" } });

    expect(screen.getByText("Digital Stories")).toBeInTheDocument();
    expect(store.getState().loggedInUser.data).toEqual(undefined);
    expect(screen.getByRole("button").textContent).toBe("Sign In");

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(store.getState().loggedInUser.data).toEqual(userData);
      expect(location.pathname).toBe("/homepage");
    });
    expect(localStorage.getItem("token")).toBe("token");
    expect(localStorage.getItem("user")).toBe(JSON.stringify(userData));
  });
});

