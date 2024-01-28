import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    fetch("http://localhost:3000/profile", {
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
        fetch("http://localhost:3000/profile", {
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
            nick: ""
        },
        onSubmit,
    });
    console.log(errors);
    return (
        <>
        <form onSubmit={handleSubmit} autoComplete='off'>
            <label htmlFor='text'>Change nick</label>
            <input
                id='nick' 
                type='text' 
                placeholder='Enter your new nick'
                value={values.email}
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