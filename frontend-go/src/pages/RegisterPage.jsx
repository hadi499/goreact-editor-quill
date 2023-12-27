import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = () => {};
  return (
    <div className="mt-14 w-[440px] mx-auto">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2 bg-blue-200 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-center text-2xl font-bold mb-2">Register Form</h1>
        <label htmlFor="username" className="font-semibold text-lg">
          Username
        </label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 py-1 rounded-lg"
        />
        <label htmlFor="email" className="font-semibold text-lg">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-1 rounded-lg"
        />

        <label htmlFor="password" className="font-semibold text-lg">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-1 rounded-lg"
        />

        <label htmlFor="confirmPassword" className="font-semibold text-lg">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-3 py-1 rounded-lg"
        />

        <div className="mt-3">
          <button className="px-3 py-1 bg-slate-700 hover:opacity-90 text-white rounded-lg">
            submit
          </button>
        </div>
        <div className="flex gap-2 items-baseline">
          <span className="text-sm text-slate-700 font-semibold">
            Already have account?
          </span>
          <span>
            <Link to="/login" className="text-[16px] font-bold text-blue-800">
              login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
