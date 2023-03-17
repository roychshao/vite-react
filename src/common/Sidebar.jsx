import { createUseStyles } from 'react-jss';

const Sidebar = () => {
    const useStyles = createUseStyles({

    })

    const classes = useStyles();

    return (
        <div>
            <div><a>ABOUT</a></div>
            <div><a>PRODUCT</a></div> 
            <div><a>COMPANY</a></div>
            <div><a>CONTACT</a></div>
            <div><a>MORE</a></div>
            <BtnField/>
        </div>
    )
}
