import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import UserProfileTable from './UserProfileTable';

const Profile = () => {
  const navigate = useNavigate();
  const [nick, setNick] = useState(null);
  const mail = Cookies.get('user')
  console.log(mail)
  const postData = async () => {
    try {
      const response = await axios.post('https://localhost:3000/profile', {
        email: 'admin@a'
      }, {withCredentials: true});
      const { nick: userNick } = response.data;
      setNick(userNick)
      
    } catch (error) {
      console.error('Błąd wysyłania danych:', error);
    }
  };
  const onSubmit = async (values, actions) => {
    fetch("https://localhost:3000/profile", {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' 
    })
    .then((data) => {
      if(data.status===201) {
        alert('Data updated');
        navigate('/')
      } else if (data.status===500) {
        alert('Error')
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    actions.resetForm()
}
    const onDelete = async () => {
        fetch("https://localhost:3000/profile", {
            method: 'DELETE',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include' 
        })
        .then((data) => {
          if(data.status===201) {
            alert('Profile Deleted');
            navigate('/register')
          } else if (data.status===500) {
            alert('Error')
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: Cookies.get('user'),
            nick: ""
        },
        onSubmit,
    });
    const userEmail = Cookies.get('user')
    const data = postData()
    console.log(errors);
    return (
        <>
        {nick && <p>Nick: {nick}</p>}
        <form onSubmit={handleSubmit} autoComplete='off'>
            <label htmlFor='text'>Change nick</label>
            <input
                id='nick' 
                type='text' 
                placeholder='Enter your new nick'
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""}
                 />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
             <button disabled={isSubmitting} type='submit'>Submit</button>
        </form>
        <button onClick={() => onDelete()} disabled={isSubmitting} type='submit' style={{backgroundColor: 'red'}}>Delete Account</button>
        </>
    );
};
export default Profile;