import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [currentState, setCurrentState] = useState('Sign Up');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (e) {
      toast.error(e.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%]">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none w-8" />
      </div>
      {currentState === 'Login' ? '' :
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="name" required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
      <div className="w-full flex justify-between">
        <p className="cursor-pointer">Forgot your password?</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">Create account</p>
            : <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Login Here</p>
        }
      </div>
      <button className="bg-black text-white">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
