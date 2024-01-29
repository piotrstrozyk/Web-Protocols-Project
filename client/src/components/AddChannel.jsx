import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';


const AddChannel = () => {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    fetch("https://localhost:3000/addchannel", {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' 
    })
    .then((data) => {
      if(data.status===201) {
        alert('Channel created');
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

    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            title: ""
        },
        onSubmit,
    });
    console.log(errors);
    return (
        <form onSubmit={handleSubmit} autoComplete='off'>
            <label htmlFor='text'>Server name</label>
            <input
                id='title' 
                type='text' 
                placeholder='Enter your server name'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""}
                 />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
             <button disabled={isSubmitting} type='submit'>Submit</button>
        </form>
    );
};
export default AddChannel;