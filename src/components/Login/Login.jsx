import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
// import signup from "../../assets/signup.jpg";
import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../config/firebase";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the 
    
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  });


    // // Get existing users from local storage or initialize an empty array
    // const users = JSON.parse(localStorage.getItem("users")) || [];

    // // Find a user with matching username and password
    // const user = users.find(
    //   (u) => u.userName === userName && u.userPassword === userPassword
    // );

    // if (user) {
    //   // If user is found, save the current user to local storage
    //   localStorage.setItem("currentUser", JSON.stringify(user));
    //   // Redirect to dashboard
    //   navigate("/dashboard");
    // } else {
    //   // If user is not found, set an error message
    //   setError("Invalid username or password");
    // }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <h1>Log In</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignin}>
          <div className="input-div">
            <FaUser />
            <input
              type="email"
              placeholder="Email"
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
          <button className="login-btn1">Log in</button>
        </form>
        <div className="signup-div">
          <p>Create an account</p>
          <button className="signup-btn1">
            <Link to="/" className="signup-link">
              Sign up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
