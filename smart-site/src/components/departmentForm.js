import React, {useState} from 'react';
import {
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider,
    Snackbar,
    Grid,
    Typography,
    Container
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import {BaseURL} from '../public/baseURL';

export default function CreateDepartment(props){
    const [name,setName] = useState('');
    const [open,setOpen] = useState(props.open);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [toast,setToast] = useState(false);

    const handleClose = ()=>setOpen(false);
    function handleSubmit(){
        fetch(BaseURL+'/admin/department',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:name
            }),
            credentials:"same-origin"
        })
        .then(res=>{
            if(res.ok){
                setSuccess(true);
                setToast(`Created new department ${name}`);
                setOpen(false);
            }
            else throw new Error({message:res.json().error});
        })
        .catch(err=>{
            setToast(err.message);
            setError(true);
        });
    }
    function toastClose(){
        setError(false);
        setSuccess(false);
    }

    return(
        <>
            <Snackbar
                open={error || success}
                anchorOrigin={{vertical:"top",horizontal:"center"}}
                autoHideDuration={5000}
                onClose={()=>toastClose}
                >
                    <Alert severity={error? "error" : "success"}>{toast}</Alert>
            </Snackbar>
            <Dialog
                onClose={handleClose}
                open={open}
                fullWidth={true}
                maxWidth="xs"
                >
                <DialogTitle>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        >
                        <Grid item>
                            <Typography>
                                Create new department
                            </Typography>                            
                        </Grid>
                        <Grid item>
                            <Button onClick={handleClose}>
                                <CloseIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Divider light/>
                <DialogContent>
                    <Container>
                        <TextField
                            label={"Department Name"}
                            value={name}
                            onChange={e=>setName(e.target.value)}
                            variant="outlined"
                            fullWidth={true}
                            />
                    </Container>
                </DialogContent>
                <Divider light/>
                <DialogActions>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}