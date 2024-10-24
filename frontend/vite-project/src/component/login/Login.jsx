import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { UserLogin } from "../store/slices/userSlice";
import { addAccessToken } from "../../Api/Api";
import { ValidateLogin } from "../../utils/Validate";
import { toast } from "react-toastify";

const Login = () => {
  const [inp, setInp] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({ isValid: false });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(p => {
        const obj = { ...p }
        obj && delete obj[name]
        return obj
      })
    setInp((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClick = () => {
    const check = ValidateLogin(inp)
    setError(check)
    if(!check.isValid) {
        dispatch(UserLogin(inp))
    }
  }

  const userData = useSelector((store)=>store.user.userData)
  
  useEffect(() => {
    console.log(userData.data)
    if (userData.data) {
        toast.success("login successful")
      addAccessToken(userData.data.token)
      navigate('/')
    }
  }, [userData.data])

  useEffect(() => {
    console.log(userData.data)
    if (userData.error) {
      toast.error(userData.error)
      setInp({
        email: "",
        password: "",
      })
    }
  }, [userData.error])

  console.log(error)

  return (
    <div>
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        value={inp.email}
        name="email"
        type="text"
        placeholder="enter email"
      ></input>
      {error ? error?.email : ""}
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        value={inp.password}
        name="password"
        type="text"
        placeholder="enter password"
      ></input>
      {error ? error?.password : ""}

      <button onClick={handleClick} >submit</button>
    </div>
  );
};

export default Login;
