import { useDispatch, useSelector } from 'react-redux'
import { loggedout } from './../actions/loginAction.js'
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { GiBeerStein } from 'react-icons/gi'
import { createUseStyles } from 'react-jss';


const Navbar = () => {

    const dispatcher = useDispatch();
    const isLogin = useSelector(state => state.loginReducer.isLogin);

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
            padding: "1rem"
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
        }
    });
    
    const classes = useStyles();

    const BtnField = () => {
        if(isLogin) {
            return (
                <div className={classes.RightField}>
                    <RiShoppingCart2Line className={classes.ShoppingSVG} size="1.5rem" color="#FFFFFF"/>
                    <p className={classes.AccountText} onClick={() => {
                        dispatcher(loggedout());
                        navigate('/');
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
        </div>
    )
}

export default Navbar;
