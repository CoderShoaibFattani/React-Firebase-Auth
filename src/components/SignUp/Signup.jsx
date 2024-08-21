import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../config/firebase";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // Get existing users from local storage or initialize an empty array
        const users = JSON.parse(localStorage.getItem("users")) || [];
        // Create a new user object
        const newUser = { name, email };
        // Add the new user to the array
        users.push(newUser);
        // Save the updated users array back to local storage
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup successfull");
        navigate("/login"); // Redirect to login page
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });

    setError("");
    console.log(
      "userName: ",
      name,
      "userEmail: ",
      email,
      "userPassword: ",
      password
    );

    setName("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
   
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <MdOutlineMailOutline />
            <input
              type="email"
              placeholder="Your Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <RiLockPasswordLine />
            <input
              type="password"
              placeholder="Password"
              className="input-box"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <RiLockPasswordLine />
            <input
              type="password"
              placeholder="Repeat Your Password"
              className="input-box"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
