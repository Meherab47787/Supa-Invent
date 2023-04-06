import styles from '../styles/styles.module.scss';
import { useSelector } from "react-redux";
import { SET_LOGIN, selecName } from "../redux/features/authSlice"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = async () => {
    try {
      await axios.get(
        '/api/v1/users/logout',
      )
      await dispatch(SET_LOGIN(false))
      navigate('/')
    }
    catch (error){
      console.log(error);
    } 
  }

  const userName = useSelector(selecName)

  return (
    <nav className={styles['navbar']}>
      <h1 className={styles['welcome-title']}>Welcome to the Inventory, <span>{userName}</span></h1>
      <button onClick={logoutUser} className={`${styles['simple-button']} ${styles['logout-button']}`}>Log out</button>
    </nav>
  )
}

export default Navbar