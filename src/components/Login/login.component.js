import React, { Component } from "react";
import "./login.component.css";
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ ...controls }) => {
  let valid = true;
  let data = {
    email: controls.email,
    password: controls.password,
  };
  // validate form errors being empty
  Object.values(data).forEach((val) => {
    val === "" && (valid = false);
  });
  return valid;
};
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      checked: "",
      isSubmitted: false,
      formErrors: {
        email: "",
        password: "",
      },
    };
  }
  handleUserInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    //validaitions for email and password
    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Minimum 6 characaters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    if (formValid(this.state)) {
      this.setState({ isSubmitted: false });
    } else {
      this.setState({ isSubmitted: true });
    }

    //dummy api integration
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  render() {
    const { formErrors, isSubmitted, email, password } = this.state;
    return (
      <div className="login__wrapper">
        <form className="login__form" onSubmit={this.handleSubmit} action="#">
          <h3 className="text-center sign__in__header">Sign in</h3>
          <div className="mb-20">
            <label className="login__form__label">Email</label>
            <input
              type="email"
              name="email"
              className="login__form__input "
              onChange={this.handleUserInput}
              value={this.state.email}
            />
            {formErrors.email.length > 0 && (
              <span className="field__error">{formErrors.email}</span>
            )}
            <br />
            {isSubmitted && email.length < 1 && formErrors.email.length < 1 && (
              <span className="field__error">Email is required</span>
            )}
          </div>

          <div className="mb-20">
            <label className="login__form__label">Password</label>
            <input
              type="password"
              name="password"
              className="login__form__input"
              onChange={this.handleUserInput}
              value={this.state.password}
            />
            {formErrors.password.length > 0 && (
              <span className="field__error">{formErrors.password}</span>
            )}
            {isSubmitted &&
              password.length < 1 &&
              formErrors.password.length < 1 && (
                <span className="field__error">Password is required</span>
              )}
          </div>

          <div className="mb-20">
            <div className="remember__me__wrapper">
              <input
                type="checkbox"
                className="login__checkbox cursor-pointer"
                id="customCheck1"
                name="checkbox"
                onChange={() => {
                  this.setState({ checked: !this.state.checked });
                }}
              />
              <label className="ml-10 remember__me_text" htmlFor="customCheck1">
                Remember me?
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="login__submit__btn mb-20 cursor-pointer"
          >
            Sign in
          </button>
          <div className="login__footer text-center">
            <p className="mb-10">
              <a>Forgot your password?</a>
            </p>
            <p className="mb-10">
              Don't have an account?<a style={{paddingLeft: `4px`}}>Sign up</a>
            </p>
            <p className="">
              <a>Resend email confirmation</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
