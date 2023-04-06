import styles from '../styles/styles.module.scss';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SET_LOGIN, SET_NAME } from '../redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'




const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const submitFrom = async (e) => {
    e.preventDefault({ passive: false })

    if(!email || !password){
      return toast.error('All fields Are required', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }

    const userCredentials = {
      email,
      password
    }

    setLoading(true)

    try {
      const response = await axios.post('/api/v1/users/login', userCredentials)
      toast.success('Successfully logged in', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(response.data.data.user.name))
      navigate('/inventory')
      
    } catch (error) {
      setLoading(false)
      console.log(error.message);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  return (
    <>
      <div className={styles['login-form']}>
        
          <h1>Login</h1>
          <form onSubmit={submitFrom} className={styles['login-register-form']} >
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="current-email"></input>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} autoComplete="current-password"></input>
              <button type="submit">Log in</button>
          </form>
          
      </div>
    </>  
      
  )
}

export default Login