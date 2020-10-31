import { 
    TextField,
    Dialog,
    DialogTitle,
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

export default function CreateWork(props){
    const [name,setName] = useState('');
    const [dept,setDept] = useState('');
    const [duration, setduration] = useState('');
    const [expense, setExpense] = useState('');
    const [open, setOpen] = useState(props.open);
    const [error,setError] = useState(false);
    const depts = useRef([{_id:1,name:'one'},{_id:2,name:'two'},{_id:3,name:'tre'}]);

    useEffect(()=>{
        fetch(BaseURL + 'admin/getDept',{
            method:'GET',
            credentials : 'same-origin'
        })
        .then(res=>{
            if(res.ok)
                return res.json();
            else throw new Error({message:res.error});
        })
        .then(data=>depts.current = data.depts)
        .catch(err=>console.log(err.message));
    },[name,dept,duration,expense,open])

    const handleSubmit = ()=>{
        fetch(BaseURL + '/admin/postWork',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name : name,
                dept : dept,
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
                throw new Error(res.json().then(data=>data.error));
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
            onClose={()=>setOpen(false)}
            open={open}
            fullWidth={true}
            maxWidth="xs"
            >
            <DialogTitle>
                <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center">
                        <Typography variant="h5" component="h5">
                            Create a new Work
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={()=>setOpen(false)}
                            >
                            <CloseIcon />
                        </IconButton>
                </Grid>
            </DialogTitle>
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
