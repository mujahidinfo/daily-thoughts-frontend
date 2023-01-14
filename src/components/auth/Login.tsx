import React, { FormEvent, FormEventHandler } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  // TODO: add login logic
  const login = async (e: any) => {
    // prevent default form submission
    e.preventDefault();
    try {
      // get form data
      const { email, password } = e.target.elements;
      // send login request
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
      // get response data
      const data = await res.json();
      // if login is successful
      if (res.status === 200) {
        // show success toast
        toast.success(data.message);
      }
      // if login is not successful
      else {
        // show error toast
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" p-4 m-3 rounded-md w-full">
      <h1 className="text-center text-2xl font-bold">Login</h1>

      <form onSubmit={login} className="form-control  flex flex-col gap-5">
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            className="input w-full"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className="input w-full"
            type="password"
            name="password"
            id="password"
          />
        </div>
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
