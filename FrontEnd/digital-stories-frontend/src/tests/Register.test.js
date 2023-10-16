import React from "react";
import { screen, render, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Register from '../components/register/SignUp'
import {userRegister} from "../components/utilities/userRegister";
import { BrowserRouter as Router } from "react-router-dom";

describe("Registration page",()=>{
    it("Register button",()=>{
        const {getByText} = render(
            <Router>
            <Register/>
            </Router>
        )
        expect(getByText("Digital Stories")).toBeInTheDocument()
        expect(screen.getByRole("button").textContent).toBe("Sign Up")
    })
})