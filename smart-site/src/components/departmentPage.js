import React,{Component} from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Grid,
    Container,
    Hidden,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {BaseURL} from '../pubic/baseURL';
import CreateWork from './workForm';


const Works = props=>{
    return(
        <>
        {props.works.filter(work=>work.department.name===props.department.name).map(work=>(
            <Card>
                <CardHeader title={work.name}/>
                <CardContent>
                    <Typography>
                        Duration : {work.duration} days
                    </Typography>
                    <Typography>
                        Cost : {work.cost} Rs
                    </Typography>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button color="secondary" onClick={()=>props.deleteWork(work._id)}>Delete</Button>
                        </Grid>
                        <Grid item>
                            <Button color="primary" onClick={()=>props.editWork(work._id)}>Edit</Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        ))}
        </>
    )
}

class DepartmentPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            departments: [],
            works: [],
            mobileOpen: false,
            selectedDept: 0,
            toast : false,
            toastSeverity : '',
            toastMessage : '',
            createWork:false
        }
        this.handleClose = this.handleClose.bind(this);
        this.departmentShifter = this.departmentShifter.bind(this);
        this.deleteWork = this.deleteWork.bind(this);
        this.editWork = this.editWork.bind(this);
    }

    fetchDepartment(){
        fetch(BaseURL + '/admin/getDepartments',{
            method:'GET'
        })
        .then(res=>{
            if(res.ok)
                return res.json();
            else throw new Error({message:res.error});
        })
        .then(data=>this.setState({departments:data}))
        .catch(err=>console.log(err.message));
    }

    fetchWork(){
        fetch(BaseURL + '/admin/getWorkTemplate',{
            method:'GET'
        })
        .then(res=>{
            if(res.ok)
                return res.json()
                else throw new Error({message:res.error});
        })
        .then(data=>this.setState({works:data}))
        .catch(err=>console.log(err.message));
    }

    componentWillMount(){
        this.fetchDepartment();
        this.fetchWork();
    }

    handleClose(){
        this.setState({mobileOpen:false});
    }

    departmentShifter(id){
        this.setState({selectedDept:id});
    }

    deleteWork(id){
        fetch(BaseURL + `admin/deleteWork`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id : id
            })
        })
        .then(res=>{
            if(res.ok)
                return res.json();
            else throw new Error({message:res.error});
        })
        .then(msg=>{
            this.setState({
                toast:true,
                toastSeverity:'success',
                toastMessage:"Successfully deleted" + msg.message
            })
        })
        .catch(err=>{
            this.setState({
                toast:true,
                toastSeverity:'error',
                toastMessage:err.message
            })
        });
    }

    editWork(id){
        console.log(id);
    }

    createWork(){
        this.setState({createWork:true})
    }

    render(){

        const drawer = (
            <Container>
                <List>
                    {this.state.departments.map((department,id)=>(
                        <ListItem key={department.name} onClick={()=>this.departmentShifter(id)}>
                            <ListItemText primary={department.name}/>
                        </ListItem>                    
                    ))}
                </List>
            </Container>
        );

        const container = window !== undefined ? window().document.body : undefined;

        return(
        <>
            <nav>
                <Hidden smUp>
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor="left"
                        open={this.state.mobileOpen}
                        onClose={this.handleClose}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <Drawer
                        variant="permanent"
                        open
                        >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main>
                <Container>
                    <Works department={this.state.departments[this.state.selectedDept]} works={this.state.works} deleteWork={this.deleteWork} editWork={this.editWork}/>
                    <Button color="primary" onClick={this.createWork}>
                        Create New Work
                    </Button>
                </Container>
            </main>
            <CreateWork open={this.state.createWork}/>
        </>
        )
    }
}

export default DepartmentPage;

