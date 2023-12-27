import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="flex items-center justify-evenly bg-blue-500 text-lg 
            text-white h-14"
    >
      <span className="hover:text-red-300">
        <Link to="/">Home</Link>
      </span>
      {userInfo ? (
        <>
          <span className="hover:text-red-300">
            <Link to="/posts">Posts</Link>
          </span>

          <span className="hover:text-red-300">
            <Link to="/create">Create Post</Link>
          </span>

          <span className="hover:text-red-300">
            <button onClick={logoutHandler}>Logout</button>
          </span>
        </>
      ) : (
        <>
          <span className="hover:text-red-300">
            <Link to="/login">Login</Link>
          </span>
        </>
      )}
    </div>
  );
};

export default Navbar;
