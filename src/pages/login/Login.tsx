import { AxiosError } from "axios";
import { FormEvent, FormEventHandler, useState } from "react";
import { toast } from "react-hot-toast";
import { login } from "../../api";
import { NextPage } from "next";
import Router from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // error label for all inputs
  const [error, setError] = useState("");

  // onBlur handler for email input
  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value;
    if (!email) {
      // set error label with emoji
      setError("😢 Email is required");
      return;
    }
    if (!email.includes("@")) {
      setError("😢 Email is not valid");
      return;
    }
    setEmail(email);
  };
  // onBlur handler for password input also validate password
  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value;
    if (!password) {
      setError("😡 Password is required");
      return;
    }
    if (password.length < 6) {
      setError("😡 Password must be at least 6 characters");
      return;
    }
    setPassword(password);
  };

  // form submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate email and password
    if (!email) {
      setError("😢 Email is required");
      return;
    }
    if (!password) {
      setError("😡 Password is required");
      return;
    }
    // call login api with error handling
    try {
      const value = {
        email,
        password,
      };
      const res = await login(value);
      // handle status code
      if (res.status === 200) {
        // clear token from local storage
        localStorage.removeItem("dt-token");
        // set token in local storage
        localStorage.setItem("dt-token", res?.data?.token);
        // show success toast
        toast.success("Login success");
        // redirect to home page
        window.location.href = "/";
      } else if (res.status === 400) {
        // show error toast
        toast.error("😡 Invalid email or password");
      } else {
        // show error toast
        toast.error("😡 Something went wrong");
      }
    } catch (error: any) {
      // check error type and show toast
      console.log("error", error);
      if (error.response.status === 400) {
        toast.error("😡 Invalid email or password");
      } else {
        console.log("Login error", error);
      }
    }
  };

  return (
    <div className=" p-4 m-3 rounded-md w-1/2">
      <h1 className="text-center text-2xl font-bold">Login</h1>

      <form
        className="form-control  flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            className="input input-success w-full"
            type="email"
            name="email"
            id="email"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className="input input-success w-full"
            type="password"
            name="password"
            id="password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        {/* error label */}
        <label htmlFor="error" className="label text-red-500 text-sm">
          {error}
        </label>
        <button type="submit" className="btn">
          Login
        </button>
        {/* register button */}
        <button type="button" className="underline">
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
