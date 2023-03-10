import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createUseStyles } from 'react-jss'

const AlertBox = (props) => {
    
    const useStyles = createUseStyles({
        AlertBox: {
            marginTop: '2rem'
        }
    })

    const classes = useStyles();

    const handleClose = () => {
        props.setShowAlert(false);
    }

    return (
        <div className={classes.AlertBox}>
            <Alert severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }
            >Login Failed, user not exist or password invalid.
            </Alert>
        </div>
    )
}

export default AlertBox
