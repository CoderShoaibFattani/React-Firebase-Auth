import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import "./Signup.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

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
        // console.log(user);
        addData(); // Add user data to Firestore
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

  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), { name, email });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getData = async () => {
    try {
      let arr = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setUsers(arr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const handleEdit = async (id) => {
  //   let updatedName = prompt("Edit you name")
  //   let updatedObj = {
  //     name: updatedName
  //   }
  //   const data = doc(db, "users", updatedObj )
  //   const updatedData = await updateDoc(data);
  // };

  return (
    <div>
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
      <div>
        {users.map((e, i) => {
          return (<div key={i}>
            <span>{e.name}</span>
            <button onClick={() => handleEdit(e.id)}>Edit</button>
            <button onClick={() => handleDelete(e.id)}>Delete</button>
          </div>)
        })}
      </div>
    </div>
  );
};

export default Signup;
