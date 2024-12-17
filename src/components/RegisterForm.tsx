// src/components/Register.tsx
import React, { useState } from "react";
import "../assets/scss/login-form.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
// import { useAuth } from "../contexts/authContext";
// import { AuthActionKind } from "../types/auth";
import { useAppDispatch } from "../redux/store";
import { setAuthuser } from "../redux/auth/authSlice";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  // const { dispatch } = useAuth();
  const dispatchX = useAppDispatch();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        role,
      });
      // dispatch({ type: AuthActionKind.LOGIN, payload: { user: userCredential.user, role } });
      const userData = {
        first_name: "",
        last_name: "",
        contact_number: "",
        role,
        uid: userCredential.user.uid,
        email:userCredential.user.email,
      }
      dispatchX(setAuthuser(userData));
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="input-unit">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div className="input-unit">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <div className="input-unit">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="input-unit">
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
