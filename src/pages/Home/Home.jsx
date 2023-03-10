import { createUseStyles } from 'react-jss'
import Navbar from './../../common/Navbar.jsx'
import LogoImage from './../../assets/logoImage.png'

// firebase SDK
import { collection, getDocs, query, where } from "firebase/firestore";
import {db} from './../../firebase.js';


const Home = (props) => {

    const useStyles = createUseStyles({
        App: {
            width: "100%",
            height: "100%"
        },
        LogoImage: {
            width: "100%"
        }
    })

    const classes = useStyles();

    return (
        <>
            <Navbar/>
            {/* <img src={LogoImage} alt="logo image" className={classes.LogoImage}/> */}
        </>
    )
}

export default Home
