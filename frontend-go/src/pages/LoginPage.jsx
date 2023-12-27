import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-14 w-[400px] mx-auto">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2 bg-blue-200 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-3">Login</h1>
        <label htmlFor="email" className="text-lg font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-1 rounded-lg"
        />
        <label htmlFor="password" className="text-lg font-semibold">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-1 rounded-lg"
        />
        <div className="mt-3">
          <button className="px-3 py-1 bg-slate-700 hover:opacity-90 text-white rounded-lg">
            submit
          </button>
        </div>
        <span>
          Not a member?{" "}
          <Link to="/register" className="font-semibold text-blue-800">
            register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
