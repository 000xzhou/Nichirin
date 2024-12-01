import { useState } from "react";

const useGobalVar = () => {
  //sending down object for the navbar
  const [isUser, setIsUser] = useState(null);

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/check-auth", {
  //       credentials: "include", // Ensure cookies are sent
  //     });
  //     const data = await response.json();
  //     if (data.user) {
  //       setIsUser(data.user);
  //     }
  //   } catch (error) {
  //     setIsUser(null);
  //   }
  // };

  return { isUser, setIsUser };
};

export default useGobalVar;
