import { Formik, Form, useField, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { MdReportGmailerrorred } from 'react-icons/md'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router-dom'
import Navbar from './../../common/Navbar.jsx'


// firebase SDK
import { collection, addDoc } from "firebase/firestore";
import {db} from './../../firebase.js';


const Register = () => {

    const useStyles = createUseStyles({
        CenterField: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        },
        Input: {
            margin: '10px 0',
            padding: '10px',
            width: '100%',
            boxSizing: 'border-box',
        },
        ErrorMessage: {
            color: '#FF0000'
        },
        RegretField: {
            display: 'flex',
        },
        LoginLink: {
            cursor: 'pointer',
            lineHeight: '300%',
            marginLeft: '20px',
        },
        SubmitBtn: {
            backgroundColor: '#4F4F4F',
            borderRadius: '5px',
            color: '#FFFFFF',
            fontSize: '20px',
            width: 'auto',
            height: 'auto',
            padding: '5px',
            marginTop: '2rem'
        },
        Form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '300px',
        },
        Link: {
            all: 'unset'
        }
    })

    const classes = useStyles();
    const navigate = useNavigate();

    const InputField = ({...props}) => {
        const [field, meta] = useField(props);
        return (
            <>
                <input className={classes.Input} 
                    {...props} 
                    {...field}
                />
                <ErrorMessage name={field.name}>
                    {() => (
                        <div>
                            <MdReportGmailerrorred color="#FF0000"/>
                            <span className={classes.ErrorMessage}> {meta.error}</span>
                        </div>
                    )}
                </ErrorMessage>
            </>
        )
    }

    const validate = yup.object({
        username: yup.string().required("The field must not be empty"),
        email: yup.string().email("Invalid email format").required("The field must not be empty"),
        password: yup.string().min(8, "password length must longer than eight").required("The field must not be empty"),
        confirmPassword: yup.string().oneOf([yup.ref("password")], "Wrong confirmed password")
    })

    return (
        <>
            <Navbar />
            <div className={classes.CenterField}>
                <h1>Register Account</h1>
                <div className={classes.RegretField}>
                    <p>Already have an account?</p>
                    <Link className={classes.Link} to='/login'><b className={classes.LoginLink}>Log in now</b></Link>
                </div>
                <Formik initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }}
                    onSubmit={ async (value) => {
                        try {
                            const docRef = await addDoc(collection(db, "Users"), value);
                            console.log("Document written with ID: ", docRef.id);
                            navigate('/');
                        } catch (e) {
                            console.error("Error adding document: ", e);
                        }
                    }}
                    validationSchema={validate}
                >
                    <Form className={classes.Form}>
                        <InputField type="text" placeholder="Username" name="username" />
                        <InputField type="text" placeholder="Email" name="email" />
                        <InputField type="password" placeholder="Password" name="password" />
                        <InputField type="password" placeholder="ConfirmPassword" name="confirmPassword" />
                        <button className={classes.SubmitBtn} type="submit">sign up</button>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

export default Register
