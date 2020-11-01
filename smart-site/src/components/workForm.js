import { 
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    Grid,
    Typography,
    Button,
    IconButton,
    Box,
    Snackbar
    } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import React, {useState, useEffect, useRef} from 'react';
import {BaseURL} from '../public/baseURL';
import DialogContentText from "@material-ui/core/DialogContentText";

export default function CreateWork(props){
    const [name,setName] = useState('');
    const [dept,setDept] = useState('');
    const [duration, setduration] = useState('');
    const [expense, setExpense] = useState('');
    const [open, setOpen] = useState(props.open);
    const [error,setError] = useState(false);
    const depts = useRef([]);

    useEffect(()=>{
        fetch(BaseURL + 'admin/getDepartmantBasic',{
            method:'GET',
            credentials : 'same-origin'
        })
        .then(res=>{
            if(res.ok)
                return res.json();
            else throw new Error({message:res.message});
        })
        .then(data=>depts.current = data)
        .catch(err=>console.log(err.message));
    },[name,dept,duration,expense,open])

    const handleSubmit = ()=>{
        fetch(BaseURL + '/admin/workTemplate',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name : name,
                department : dept,
                duration : duration,
                cost : expense
            }),
            credentials : 'same-origin'
        })
        .then(res=>{
            
            if(res.ok){
                setOpen(true);
            }
            else{
                throw new Error(res.json().then(data=>data.message));
            }
        })
        .catch(err=>setError("Cannot connect to server"));
    }

    const deptItems = depts.current.map(dep=>{
                            return(<MenuItem key={dep._id} value={dep.name}>{dep.name}</MenuItem>)
                        });
    
    return(
        <>
        <Snackbar
            anchorOrigin={{vertical:'top',horizontal:'center'}}
            autoHideDuration={10000}
            open={error}
            onClose={()=>setError(false)}
        >
            <Alert severity="warning">Error {error}</Alert>
        </Snackbar>
        <Dialog 
            onClose={props.onCloseHandler}
            open={props.open}
            fullWidth={true}
            maxWidth="xs"
            >

            <DialogContent>
                <IconButton
                    aria-label="close"
                    onClick={props.onCloseHandler}
                >
                    <CloseIcon />
                </IconButton>
                Create a new Work
            </DialogContent>

            <DialogContent
                fullWidth={true}
                maxWidth='xl'
                >
                <form>
                    <Box width="100%">
                    <Grid container
                        direction="column"
                        spacing={2}
                    >
                        <Grid item spacing={5}>
                            <TextField
                                label = "Name"
                                value = {name}
                                onChange = {e=>setName(e.target.value)}
                                variant = "outlined"
                                fullWidth={true}
                                />
                        </Grid>
                        <Grid item spacing={5}>
                            <Select
                                label="Department"
                                value={dept}
                                onChange = {e=>setDept(e.target.value)}
                                variant = "outlined"
                                fullWidth={true}
                            >
                                {deptItems}    
                            </Select>
                        </Grid>
                        <Grid item spacing={5}>
                            <TextField
                                label="Work Duration"
                                value = {duration}
                                onChange = {e=>setduration(e.target.value)}
                                variant ="outlined"
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item spacing={5}>
                            <TextField
                                label = "Cost of work"
                                value = {expense}
                                onChange = {e=>setExpense(e.target.value)}
                                variant = "outlined"
                                fullWidth={true}
                            />
                        </Grid>
                    </Grid>
                    </Box>
                </form>
                <DialogActions>
                    <Grid container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                        >                            
                            <Button 
                                variant="contained"
                                onClick={handleSubmit}
                                color="primary"
                                >
                                Create
                            </Button>                            
                    </Grid>
                </DialogActions>
            </DialogContent>      
        </Dialog>
        </>
    )
}
