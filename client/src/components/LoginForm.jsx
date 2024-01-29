import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react'





const LoginForm = () => {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    fetch("https://localhost:3000/login", {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' 
    })
    .then((data) => {
      if(data.status===201) {
        alert('Log In successful');
        navigate('/')
      } else if (data.status===404) {
        alert('Incorrect login');
      } else if (data.status===500) {
        alert('Incorrect Password')
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    actions.resetForm()
}

    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
    });
    console.log(errors);
    return (
        <form onSubmit={handleSubmit} autoComplete='off'>
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
export default LoginForm;