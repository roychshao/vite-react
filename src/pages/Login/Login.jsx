import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loggedin, loggedout } from './../../actions/loginAction.js'
import { Formik, Form, useField, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { MdReportGmailerrorred } from 'react-icons/md'
import { createUseStyles } from 'react-jss'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../../common/Navbar.jsx'
import AlertBox from './AlertBox.jsx'

// firebase SDK
import { collection, getDocs, query, where } from "firebase/firestore";
import {db} from './../../firebase.js';


const Login = () => {

    const dispatcher = useDispatch();
    
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
        RegisterLink: {
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

    const [showAlert, setShowAlert] = useState(false);
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
        email: yup.string().email("Invalid email format").required("The field must not be empty"),
        password: yup.string().min(8, "password length must longer than eight").required("The field must not be empty"),
    })

    return (
        <>
            <Navbar />
            <div className={classes.CenterField}>
                <h1>Login</h1>
                <div className={classes.RegretField}>
                    <p>Don't have an account yet?</p>
                    <Link className={classes.Link} to='/register'><b className={classes.RegisterLink}>Register now</b></Link>
                </div>
                <Formik initialValues={{
                    email: "",
                    password: "",
                }}
                    onSubmit={ async (value) => {
                        const userCollectionRef = collection(db, "Users");
                        const userQuery = query(userCollectionRef, where("email", "==", value.email));
                        const userDocsSnapshot = await getDocs(userQuery);
                        
                        if (userDocsSnapshot.docs.length > 0) {
                            const userDoc = userDocsSnapshot.docs[0];
                            const password = userDoc.data().password;

                            if(password === value.password) {
                                console.log("Authentication passed.");
                                dispatcher(loggedin());
                                navigate('/');
                            } else {
                                console.log("Authentication failed.");
                                setShowAlert(true);
                            }
                        }
                    }}
                    validationSchema={validate}
                >
                    <Form className={classes.Form}>
                        <InputField type="text" placeholder="Email" name="email" />
                        <InputField type="password" placeholder="Password" name="password" />
                        <button className={classes.SubmitBtn} type="submit">login</button>
                    </Form>
                </Formik>
                {showAlert && (
                    <AlertBox setShowAlert={setShowAlert}/>
                )}
            </div>
        </>
    );
}

export default Login
