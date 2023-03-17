import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loggedout, loggedoutwithgoogle } from './../actions/loginAction.js'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { GiBeerStein } from 'react-icons/gi'
import { createUseStyles } from 'react-jss'
import { getAuth, signOut } from 'firebase/auth'
import Sidebar from './Sidebar.jsx'


const Navbar = () => {

    const dispatcher = useDispatch();
    const isLogin = useSelector(state => state.loginReducer.isLogin);
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);
    const [isExpanded, setIsExpanded] = useState(false);

    const useStyles = createUseStyles({
        NavbarBody: {
            backgroundColor: "#150E03",
            padding: "0px",
            width: "100%",
            height: "auto",
            position: "fixed"
        },
        NavbarUl: {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "2rem",
            padding: "1rem",
            paddingLeft: "0px",
            '@media (max-width: 700px)': {
                flexDirection: 'column',
                '& $NavbarItem': {
                    display: 'none',
                },
                '& $RightField, $AccountField': {
                    display: 'none',
                },
            },
        },
        NavbarItem: {
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: "space-around",
            alignItems: 'center',
            borderRadius: '10px',
            '&:hover': {
                backgroundColor: '#BEBEBE',
                cursor: 'pointer',
                '& > a': {
                    color: '#000000',
                },
            },
        },
        Font: {
            color: "#FFFFFF",
            fontSize: "1.2rem"
        },
        AccountField: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginRight: '3%',
        },
        AccountText: {
            display: 'inline',
            color: '#FFFFFF',
            '&:hover': {
                cursor: 'pointer',
            }
        },
        ShoppingSVG: {
            '&:hover': {
                cursor: 'pointer'
            }
        },
        Link: {
            all: "unset"
        },
        RightField: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginRight: '10px'
        },
        LogoField: {
            width: '60%',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer'
        },
        NavToggle: {
            display: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            position: 'absolute',
            top: '38%',
            left: '6%',
            '@media (max-width: 700px)': {
                display: 'block',
            },
        }
    });
    
    const classes = useStyles();
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    }

    const BtnField = () => {
        if(isLogin) {
            return (
                <div className={classes.RightField}>
                    <RiShoppingCart2Line className={classes.ShoppingSVG} size="1.5rem" color="#FFFFFF"/>
                    <p className={classes.AccountText} onClick={() => {
                        if(loginWithGoogle) {
                            dispatcher(loggedoutwithgoogle());
                            const auth = getAuth();
                            signOut(auth).then(() => {
                                console.log('successfully logout from google');
                                navigate('/');
                            }).catch((error) => {
                                console.log('something wrong happend when google logout');
                                console.log(error.message);
                            })
                        }
                        else {
                            dispatcher(loggedout());
                            navigate('/');
                        }
                    }}>Logout</p>
                </div>
            )
        } else {
            return (
                <div className={classes.AccountField}>
                    <Link to="/login" className={classes.Link}><p className={classes.AccountText}>Login</p></Link>
                    <Link to="/register" className={classes.Link}><p className={classes.AccountText}>Register</p></Link>
                </div>
            )
        }
    }

    return (
        <div className={classes.NavbarBody}>
            <div className={classes.NavbarUl}>
                <div className={classes.LogoField}>
                    <Link to="/" className={classes.Link}>
                        <GiBeerStein size="3rem" color="#FF8000" />
                    </Link>
                </div>
                {/* use NavLink to know where is the location and render the navbarItem */}
                <div className={classes.NavbarItem}><a className={classes.Font}>ABOUT</a></div>
                <div className={classes.NavbarItem}><a className={classes.Font}>PRODUCT</a></div>
                <div className={classes.NavbarItem}><a className={classes.Font}>COMPANY</a></div>
                <div className={classes.NavbarItem}><a className={classes.Font}>CONTACT</a></div>
                <div className={classes.NavbarItem}><a className={classes.Font}>MORE</a></div>
                {/* if is logged in: show the shopping svg, else show the accountField */}
                <BtnField/>
            </div>
            <div className={classes.NavToggle} onClick={handleToggle}>
                    {isExpanded ? 'Close' : 'Menu'}
            </div>
        </div>
    )
}

export default Navbar;
