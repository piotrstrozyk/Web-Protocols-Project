import { useFormik } from 'formik';
//import registrationSchema from '../schemas/RegistrationSchema';
import { useState } from 'react';

const onSubmit = async (values, actions) => {
    fetch("http://localhost:3000/register", {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((data) => {
      if(data.status===201) {
        alert('Registered, please log in');
        return data
        
      } else if (data.status===500) {
        alert('Email already in use');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    actions.resetForm()
}

const RegistrationForm = () => {
    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            name: "",
            surname: "",
            nick: "",
            email: "",
            password: "",
        },
        onSubmit,
    });
    console.log(errors);
    return (
        <form onSubmit={handleSubmit} autoComplete='off'>
            <label htmlFor='name'>Name</label>
            <input
                id='name' 
                type='name' 
                placeholder='Enter your name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name && touched.name ? "input-error" : ""}
                 />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}            
            <label htmlFor='surname'>Surname</label>
            <input
                id='surname' 
                type='surname' 
                placeholder='Enter your surname'
                value={values.surname}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.surname && touched.surname ? "input-error" : ""}
                 />
            {errors.surname && touched.surname && <p className="error">{errors.surname}</p>}
            <label htmlFor='nick'>Nick</label>
            <input
                id='nick' 
                type='nick' 
                placeholder='Enter your nick'
                value={values.nick}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.nick && touched.nick ? "input-error" : ""}
                 />
            {errors.nick && touched.nick && <p className="error">{errors.nick}</p>}
            <label htmlFor='email'>Email</label>
            <input
                id='email' 
                type='email' 
                placeholder='Enter your email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""}
                 />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
            <label htmlFor='password'>Password</label>
            <input
                id='password' 
                type='password' 
                placeholder='Enter your password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password && touched.password ? "input-error" : ""}
             />
             {errors.password && touched.password && <p className="error">{errors.password}</p>}
             <button disabled={isSubmitting} type='submit'>Submit</button>
        </form>

    );
};
export default RegistrationForm;