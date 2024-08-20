import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  // const [userName, setUserName] = useState("");
  // const [userPassword, setUserPassword] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState("");

  const [signUpData, setSignUpData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });

  // const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Check if passwords match
    if (signUpData.userPassword !== signUpData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // // Get existing users from local storage or initialize an empty array
    // const users = JSON.parse(localStorage.getItem("users")) || [];

    // // Create a new user object
    // const newUser = { userName, userEmail, userPassword };

    // // Add the new user to the array
    // users.push(newUser);

    // // Save the updated users array back to local storage
    // localStorage.setItem("users", JSON.stringify(users));

    // setIsSignedUp(true);

    alert("Signup successfull");
    setError("");
    setSignUpData({
      userName: "",
      userEmail: "",
      userPassword: "",
      confirmPassword: "",
    });
    console.log(
      "userName: ",
      signUpData.userName,
      "userEmail: ",
      signUpData.userEmail,
      "userPassword: ",
      signUpData.userPassword
    );
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="input-div">
            <FaUser />
            <input
              type="text"
              placeholder="Username"
              className="input-box"
              value={signUpData.userName}
              onChange={(e) =>
                setSignUpData({ ...signUpData, userName: e.target.value })
              }
              required
            />
          </div>
          <div className="input-div">
            <MdOutlineMailOutline />
            <input
              type="email"
              placeholder="Your Email"
              className="input-box"
              value={signUpData.userEmail}
              onChange={(e) =>
                setSignUpData({ ...signUpData, userEmail: e.target.value })
              }
              required
            />
          </div>
          <div className="input-div">
            <RiLockPasswordLine />
            <input
              type="password"
              placeholder="Password"
              className="input-box"
              value={signUpData.userPassword}
              onChange={(e) =>
                setSignUpData({ ...signUpData, userPassword: e.target.value })
              }
              required
            />
          </div>
          <div className="input-div">
            <RiLockPasswordLine />
            <input
              type="password"
              placeholder="Repeat Your Password"
              className="input-box"
              value={signUpData.confirmPassword}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <button className="signup-btn">Register</button>
        </form>
        <div className="signin-div">
          <p>I am already a member</p>
          <button className="login-btn">
            <Link to="/login" className="login-link">
              Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
