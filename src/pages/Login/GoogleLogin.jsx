import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, provide } from '../../firebase.js'
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { loggedinwithgoogle } from './../../actions/loginAction.js'
import { FcGoogle } from 'react-icons/fc'
import { createUseStyles } from 'react-jss'


const GoogleLogin = () => {
    
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const useStyles = createUseStyles({
        GoogleLogin: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '200%',
            backgroundColor: 'white',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#444',
            borderRadius: '5px',
            border: 'thin solid #888',
            boxShadow: '1px 1px 1px grey',
            cursor: 'pointer',
        },
        Wrapper: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }
    })

    const classes = useStyles();

    const [onLogin, setOnLogin] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const loginUser = await getRedirectResult(auth)
                console.log(loginUser);
                if(loginUser) {
                    dispatcher(loggedinwithgoogle());
                    navigate('/');
                }
            } catch (err) {
                console.log(err);
            }
        };
        getData();
        setOnLogin(false);
    }, [onLogin])

    const googleLogin = async () => {
        signInWithRedirect(auth, provide);
        setOnLogin(true);

        // below is the way how to signin with popup
        /*
        const result = await signInWithPopup(auth, provide);
        
        if(result) {
            console.log(result);
            dispatcher(loggedinwithgoogle());
            navigate('/');
        }
        */
    }

    return (
        <div className={classes.Wrapper}>
            <button className={classes.GoogleLogin} onClick={googleLogin}>
                <FcGoogle size='1.5rem'/>
                Login with Google
            </button>
        </div>
    );
};

export default GoogleLogin
