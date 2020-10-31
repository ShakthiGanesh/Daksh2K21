import React,{Component,useState} from 'react';
import {BaseURL} from '../public/baseURL';
import {Link} from 'react-router-dom';
import {Button,Snackbar,Hidden,Dialog,DialogTitle,DialogContent,DialogContentText,Grid,Container,TextField,IconButton,List,ListItem,CardActions,ListItemText,Box,CardContent,Card,CardHeader,Typography,Collapse} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Alert} from '@material-ui/lab';


function AdminNav(props){
    return(
        <div className="admin-nav">
            <Button>
                <ArrowBackIcon/>
            </Button>
            <Link to="/"><div>Back to Home</div></Link>
            <Link to="/signout"><div className='signout'><div><AccountCircleIcon/></div><div>Signout</div></div></Link>
        </div>
    );
}
const Update = props=>{
    return(
        <Typography>            
            <img src={props.data.image} alt={props.data.message}/>
            {props.data.message}
        </Typography>
    );
}
const Work = props=>{
    const [open,setOpen] = useState(false);
    const [uplo,setuplo] = useState(false);
    const [mes,setMes] = useState('');
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const [stat,setStat] = useState(false);
    const [image,setImage] = useState(null);
    function handleToggle(){
        setOpen(!open);
    }
    function uploadial(){
        setuplo(!uplo);
    }
    function imager(e){
        setImage(e.targe.files[0]);
    }
    function uploader(){
        let formData = new FormData();
        formData.append("file",image);
        fetch(BaseURL + '/admin/upload',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:{image:image,message:mes}
        })
        .then(response=>{
            if(response.ok){
                setSuccess(true);
            }
            else throw new Error({message:response.json()});
        })
        .catch(err=>setError(err.message))
    }
    function statuser(){
        fetch(BaseURL + '/staff/status',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                body:{
                    status : props.work.status?'1':'0'
                }
            }
        })
        .then(response=>{
            if(response.ok){
                setSuccess(true);
            }
            else throw new Error({message:response.json()});
        })
        .catch(err=>setError(err.message))     
    }
    function handleStatusToggle(){
        setStat(!stat);
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
                    <Alert severity={error? "error" : "success"}>{error?`An error occured ${error}` : "Completed successfully"}</Alert>
            </Snackbar>
            <Dialog open={uplo} onClose={()=>uploadial}>
                <DialogTitle>
                    Upload 
                </DialogTitle>
                <DialogContent>
                    <TextField fullwidth={true} label="Message" value={mes} onChange={e=>setMes(e.target.value)}/>
                    <input type="file" onChange={e=>imager(e)}/>
                    <Button onClick={()=>uploader}>Upload</Button>
                </DialogContent>
            </Dialog>
            <Dialog open={stat} onClose={()=>setStat(!stat)}>
                <DialogTitle>
                Mark as complete ?  
                </DialogTitle>
                <DialogContent>
                    <Button onClick={statuser} color="primary">Yes</Button>
                    <Button onClick={()=>setStat(!stat)} color="primary">Cancel</Button>
                </DialogContent>
            </Dialog> 
            <Card>
                <CardHeader title={props.work.work.name}/>
                <CardContent>
                    <Grid container direction="row" spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography>
                                Expected duration : {props.work.expectedDuration}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography>
                                Expense : {props.work.expense}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Grid container direction="row" spacing={4}>
                            {props.work.updates.map((update,id)=>(
                                <Grid key={id} item xs={12} md={6}>
                                    <Update data={update}/>
                                </Grid>)
                                )}
                            </Grid>
                        </CardContent>
                    </Collapse>
                </CardContent>
                <CardActions>
                    <IconButton>
                        <ExpandMoreIcon className={open?'expandopp':''}onClick={handleToggle} aria-expanded={open}/>
                    </IconButton>
                    <Button onClick={handleStatusToggle}>
                        Mark as Completed
                    </Button>
                    <Button onClick={uploadial} color="primary">
                        Upload an update
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
class AdminProject extends Component {
    constructor(props){
        super(props);
        this.state={
            works : [],
            staffs:[],
            color:'',
            flooring:'',
            customer:{},
            progress:'',
            error:null,
            departments:[],
            selectedDepartment:0
        }

        this.dataFetcher = this.dataFetcher.bind(this);
    }

    dataFetcher(){
        fetch(BaseURL + `/admin/porject/${this.props.match.params.projectid}`,{method:'GET'})
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else throw new Error({message:response.json()});
        })
        .then(data=>{
            this.setState({
                color:data.color,
                flooring:data.flooring,
                works:data.works,
                staffs:data.staffs,
                customer:data.customer,
                progress:data.progress,
                departments:data.departments
            })
        })
        .catch(err => this.setState({error:err.message}));
    }

    render(){
        const drawer = (
            <Container>
                <List>
                    {
                        this.state.departments.map((department,id)=>{
                            return(
                                <ListItem key={department}>
                                    <Button onClick={()=>this.departmentShifter(id)}>
                                        <ListItemText primary={department}/>
                                    </Button>
                                </ListItem> 
                            );
                        })
                    }                    
                </List>
            </Container>
        );
        return(
        <Box>
            <nav>
                <AdminNav/>
            </nav>
            <main>
                <Grid container>
                    <Grid className="drawer" item xs={0} md={3}>
                        {drawer}
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Container p={3}>
                            {this.state.works
                                .filter(work=>work.work.department.name===this.state.departments[this.state.selectedDepartment])
                                .map(work=>(
                                    <Work key={work._id} work={work}/>
                                ))
                                }
                        </Container>
                    </Grid>
                </Grid>
            </main>
        </Box>
            );
    }
}

export default AdminProject;