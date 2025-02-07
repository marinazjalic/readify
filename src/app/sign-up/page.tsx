"use client";

import { createUser } from "@/actions/users/createUser";
import { useState } from "react";

export default function SignUp() {
  const [passwordConf, setPasswordConf] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileImageUrl: "tests",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const comparePasswords = () => {
    //may need to do this differently since state does not update right away
    setPasswordMatch(userData.password === passwordConf);
    if (!passwordMatch) {
      //display error message
    }
  };

  const createNewUser = async () => {
    await createUser(userData);
    // try {
    //   const response = await fetch("/api/users/create", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userData),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log("User created: ", data);
    //   } else {
    //     console.log("Error: Failed to create user. ");
    //   }
    // } catch (error) {
    //   console.log("Error creating user: ", error);
    // }
  };

  return (
    <div>
      <form>
        <label>
          First name:
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            // required
          />
        </label>
        <label>
          Last name:
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
            onBlur={comparePasswords}
          />
        </label>
        <button onClick={createNewUser}>Submit</button>
      </form>
    </div>
  );
}
