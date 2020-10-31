import React, { Component} from 'react';
import {AuthContext} from '../public/authContext';
import {Hidden,Grid,Container,Card,CardContent,Typography,CardActions} from '@material-ui/core';
import {BaseURL} from '../public/baseURL';

import {Link} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {ProgressCircular} from './progres';

function AdminNav(props){
    return(
        <div className="admin-nav">
            <Link to="/"><div>Back to Home</div></Link>
            <Link to="/signout"><div className='signout'><div><AccountCircleIcon/></div><div>Signout</div></div></Link>
        </div>
    );
}

function ProjectCard(props){
    return(
        <Card variant="outlined">
            <Link to={`/admin/project/${props.project._id}`}>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <ProgressCircular progress={props.project.progress}/>
                    </Grid>

                    <Grid item xs={8}>
                        <CardContent>
                            <Typography component="h6">
                                {props.project.projectid}
                            </Typography>
                            <Typography component="p">
                                Customer : {props.project.customer}
                            </Typography>                    
                        </CardContent>
                    </Grid>
                </Grid>
            </Link>
        </Card>
    )
}

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects:[],
            departments:[],
            error:''
        }
        this.contentFetch = this.contentFetch.bind(this);
    }
    contentFetch(){
        fetch(BaseURL + '/admin/projects',{method:'GET'})
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else throw new Error({message:response.json().error});
        })
        .then(projects => this.setState({projects:projects}))
        .catch(err=>this.setState({error:err}));
        fetch(BaseURL + '/admin/departments',{method:'GET'})
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else throw new Error({message:response.json().error});
        })
        .then(departments => this.setState({departments:departments}))
        .catch(err=>this.setState({error:err}));
    }
    componentWillMount() {
        this.contentFetch();
    }
    render(){
        function progCalc(){
            let stats = this.projects.map(project=>project.status);
            let total = stats.reduce((prev,curr)=>prev+curr);
            return total/stats.length;
        }
        var progres = progCalc();
        return(
        <>
            <nav>
                <AdminNav/>             
            </nav>
            <main>
                <section className="header">
                    <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
                        <Grid item xs={12} md={5}>
                            <ProgressCircular progress={progres}/>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Container p={4}>
                                {this.projects.map(project=>{
                                    <ProjectCard project={project}/>
                                })}
                            </Container>
                        </Grid>
                    </Grid>
                </section>
            </main>
        </>
        );
    }
}

export default AdminPage;
