import React , {Component, useState} from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    IconButton,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Collapse,
    CardActions,
    Container,
    Hidden,
    CardMedia,
    Button,
    Box
} from '@material-ui/core';
import {BaseURL} from '../public/baseURL';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ProgressCircular} from './progress';
import {withStyles} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import '../css/project.css';
const defaultTheme = createMuiTheme();


const styles = theme=>({
    drawer:{
        backgroundColor:'black'
    }
});

const Update = props=>{
    return(        
        <img src={props.data.image}/>        
    );
}

const Work = props=>{
    const [open,setOpen] = useState(false);
    function handleToggle(){
        setOpen(!open);
    }
    return(
        <>        
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
                </CardActions>
            </Card>
        </>
    );
}

class Project extends Component{
    constructor(props){
        super(props);
        this.state={
            works:[{
                _id:'dgfsdf',
                work:{
                    _id:'adsf',
                    name:'KJEJKJR',
                    department:{
                        id:'asdf',
                        name:"KMKNJLHAD"
                    }
                },
                project:{
                    _id:'oaihf'
                },
                updates:[{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                }],
                expectedDuration: 23,
                status:false,
                expense: 23
            },{
                _id:'sdfd',
                work:{
                    _id:'adsf',
                    name:'fgdgd',
                    department:{
                        id:'jfghjfghj',
                        name:"gfhjghfjf"
                    }
                },
                project:{
                    _id:'oaihf'
                },
                updates:[{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                }],
                expectedDuration: 23,
                status:false,
                expense: 23
            },{
                _id:'sdfhsdfg',
                work:{
                    _id:'kyuoyu',
                    name:'jfgjfyjgfh',
                    department:{
                        id:'ghjfyjfgh',
                        name:"fgfhgnfghn"
                    }
                },
                project:{
                    _id:'oaihf'
                },
                updates:[{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                }],
                expectedDuration: 23,
                status:false,
                expense: 23
            },{
                _id:'fgkfghjfgh',
                work:{
                    _id:'hj',
                    name:'hfjhfngfghhnfgh',
                    department:{
                        id:'fnfghnfgh',
                        name:"fhjfghjfnghffghjfghjf"
                    }
                },
                project:{
                    _id:'oaihf'
                },
                updates:[{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                },{
                    message:"NONKLSDNFKJSd",
                    image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                }],
                expectedDuration: 23,
                status:false,
                expense: 23
            }],
            departments:[],
            drawerOpen:false,
            selectedDept: 0,
            mobileOpen:false
        }
        this.depSetter = this.depSetter.bind(this);
        this.drawerToggler = this.drawerToggler.bind(this);
    }

    drawerToggler(){
        this.setState({drawerOpen:!this.state.drawerOpen});
    }

    departmentShifter(id){
        this.setState({selectedDept:id});
    }

    dataFetcher(){
        fetch(BaseURL + '/common/works?projectid=' + this.props.project_id,{
            method:'GET'
        })
        .then(res=>{
            if(res.ok)
                return res.json();
            else throw new Error({message:res.error});
        })
        .then(data=>{
            this.setState({works:data});
            this.setState({departments:[...new Set(data.map(work=>work.work.department.name))]});
        })
        .catch(err=>console.log(err.message));
    }
    depSetter(){
        this.setState({departments:[...new Set(this.state.works.map(work=>work.work.department.name))]});
    }

    componentDidMount(){
        this.depSetter();
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
        const container = window?()=>window().document.body:undefined;
        const {classes} = this.props;
        
        return(
            <Box>
                <Grid container direction="row" spacing={4}>
                <Grid className='drawer' item xs={12} md={3}>
                    <Hidden smUp>
                        
                            {drawer}
                    
                    </Hidden>
                    <Hidden smDown>
                        
                                <ProgressCircular percent={10}/>
                            {drawer}
                        
                    </Hidden>
                    </Grid>
                <Grid item xs={12} md={8}>
                    <main>
                        <div  className='contents'>
                            <Container p={3}>
                            {this.state.works.filter(work=>work.work.department.name===this.state.departments[this.state.selectedDept]).map(work=>(
                                <Work key={work._id} work={work} />
                                ))}
                            </Container>
                        </div>
                    </main>
                </Grid>
                </Grid>
            </Box>
        );
    }

}

export default withStyles(styles)(Project);



