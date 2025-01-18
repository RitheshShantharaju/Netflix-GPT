import React, {useRef, useState} from "react";
import Header from "./Header";
import {CheckValidData} from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {auth} from "../utils/firebase";

import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";
import {USER_AVATAR} from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //validate form Data
    //CheckVaildData(email,password)

    //the below 2 are the user entered input field values(form data) which is validated when the CheckValidData function
    // is called from Validate.js
    // console.log(email.current.value);
    // console.log(password.current.value);

    const message = CheckValidData(
      //name.current.value,
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      //Sign up users
      createUserWithEmailAndPassword(
        auth,
        //name.current.value,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          //We can update a user's basic profile information—the user's display name
          // and profile photo URL—with the updateProfile method
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const {uid, email, displayName, photoURL} = auth.currentUser;

              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          //console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(errorCode + "_" + errorMessage);
        });
    } else {
      //Sign in users

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "_" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_large.jpg"
          alt="background"
        />
      </div>
      <form
        onClick={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 mx-auto my-36 right-0 left-0 bg-black text-white bg-opacity-80 rounded-lg "
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full  bg-gray-700"
          />
        )}
        <input
          //ref is basicially reference to input box; so here it captures the email value
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full  bg-gray-700"
        />
        <input
          //ref is bascially reference to input box; so here it captures the password value
          ref={password}
          type="text"
          placeholder="Password"
          className="p-4 my-4 w-full  bg-gray-700"
        />

        <p className="text-red-500 font-bold text-xl py-2">{errorMessage}</p>

        <button
          onClick={handleButtonClick}
          className="  p-4 my-6 bg-red-700 w-full rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={toggleSignInForm} className="py-4 cursor-pointer">
          {isSignInForm
            ? "New to Netflix? Signup now"
            : "Already a user? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
