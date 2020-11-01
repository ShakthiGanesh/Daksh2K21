import React , {Component} from 'react';
import {BaseURL} from '../public/baseURL';
import {Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

class UserForm extends Component{

    constructor(props) {
        super(props);

        this.state={

            // User data
            name:'',
            email:'',
            password:'',
            group:'',
            staff_id:'',
            department:'',
            mobile:null,

            // Response fields
            success:false,
            error:false,
            toastMessage:'',

            // Fetched data
            departments:[]
        }

        this.postContent = this.postContent.bind(this);
        this.getData = this.getData.bind(this);

    }

    postContent(){
        fetch(BaseURL+'/admin/createUser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:this.state.name,
                email:this.state.email,
                password:this.state.password,
                group:this.state.group,
                staff_id:this.state.staff_id,
                department:this.state.department,
                mobile:this.state.mobile
            })
        })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                else throw new Error({messge:response.json().message});
            })
            .then(response => {
                this.setState({success:true,toastMessage:response.message})
            })
            .catch(error => {
                this.setState({error:true,toastMessage:error.message})
            });
    }

    getData(){
        fetch(BaseURL + '/admin/userForm',{
            method:"GET"
        })
            .then (response => {
                if (response.ok)
                    return response.json();
                else throw new Error({message:response.json().message});
            })
            .then ( data => this.setState( { departments : data } ) )
            .catch( error => this.setState( { error : true, toastMessage : error.message } ) );
    }

    render(){
        return(
            <>
                <Snackbar
                    // anchorOrigin="top"
                    autoHideDuration={ 10000 }
                    open={ this.state.error || this.state. success}
                    onClose={ () => this.setState( { success : false, error : false, toastMessage : '' } ) }
                    >
                    <Alert severity={ this.state.error ? "error" : "success" }>{ this.state.toastMessage }</Alert>
                </Snackbar>
                <Dialog open={this.props.open} onClose={this.props.onCloseHandler}>
                    <DialogTitle> Create a new staff or user</DialogTitle>
                    <Divider/>
                    <DialogContent>
                        <Grid container alignItems="center" justify="center" spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Name" value={this.state.name} onChange={e => this.setState({ name : e.target.value })}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email" type="email" value={ this.state.email } onChange={ e => this.setState({ email : e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Password" type="password" value={ this.state.password } onChange={ e => this.setState({ password : e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField select fullWidth label="Group" value={ this.state.group } onChange={ e => this.setState({ group : e.target.value })}>
                                    <MenuItem value={"staff"}>
                                        Staff
                                    </MenuItem>
                                    <MenuItem value={"Customer"}>
                                        Customer
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField disabled={this.state.group !== "staff"} value={ this.state.staff_id } onChange={e => this.setState({ staff_id : e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField select disabled={this.state.group !== "staff"} value = { this.state.department } onChange={e => this.setState({ department : e.target.value })}>
                                    {this.state.departments.map( department => {
                                        <MenuItem value={ department._id }>
                                            {department.name}
                                        </MenuItem>
                                    })}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="tel" value={ this.state.mobile } onChange={ e=> this.setState({ mobile : e.target.value})}/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Divider/>
                    <DialogActions>
                        <Button color="primary" onClick={ () => this.postContent() }>
                            Create
                        </Button>
                        <Button onClick={ () => this.props.onCloseHandler }>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

export default UserForm;