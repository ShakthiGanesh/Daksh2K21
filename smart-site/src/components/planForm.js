import React, {Component} from "react";
import {BaseURL} from "../public/baseURL";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {Button, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {CheckBox} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";

const styles =  () => ({
    appBar : {
        position : 'relative'
    },
    title : {
        flex : 1
    },
    paper : {
        width : "100%",
        height : "50vh",
        overflow : "auto"
    }
});

class PlanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {

            // Fetched data
            availableWorks : [],

            // Data to post
            selectedWorks : new Set(),
            images : [],
            name : '',

            // Form control
            checkedLeft : [],
            checkedRight : [],

            // Connection control
            error : false,
            success : false,
            toastMessage : null

        }

        this.dataFetcher = this.dataFetcher.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

    }

    dataFetcher() {
        fetch(BaseURL + '/admin/workBasic')
            .then ( response => {
                if ( response.ok )
                    return response.json();
                else throw new Error( { message : response.json().message } )
            })
            .then ( data => this.setState( { availableWorks : data } ))
            .catch ( error => {
                this.setState( { error : true, toastMessage : error.message } )
            })
    }

    handleSelect ( id ) {
        let newList = this.state.selectedWorks;
        if ( this.state.selectedWorks.has( id ) )
            newList.delete( id );
        else
            newList.add( id );
        this.setState({ selectedWorks: newList});
    }

    handleSubmit () {
        let formData = new FormData();
        formData.append( "name" , this.state.name );
        formData.append( "works" , [...this.state.selectedWorks] );
        formData.append( "imgNo" , this.state.images.length );
        formData.append( "images" , this.state.images );

        fetch( BaseURL + '/admin/plan' , {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : formData
        })
            .then( response => response.ok ? response.json() : throw new Error( { message : response.json }))
            .then( response => this.setState( { success : true, toastMessage : response.message }))
            .catch( error => this.setState( { error : true, toastMessage : error.message } ) )
    }

    render() {

        const { classes } = this.props;

        return(
            <>
               <Dialog fullScreen open={ this.props.open } onClose={ this.props.onCloseHandler }>
                   <AppBar className={ classes.appBar }>
                       <IconButton edge={"start"} onClick={ this.props.onCloseHandler }>
                           <CloseIcon />
                       </IconButton>
                       <Typography component={"h6"} classNames={ classes.title }>Create a new plan</Typography>
                   </AppBar>
                   <Grid container m={3} justify={"flex-start"} alignItems={"center"} direction={"row"} spacing={4}>
                       <Grid item xs={12} md={6}>
                           <TextField label = "Name" value={ this.state.name } onChange={ e => this.setState( { name : e.target.name } ) } fullWidth={true}/>
                       </Grid>
                       <Grid item xs={12} md={6}>
                           <Input label={"Images"} value={ this.state.images } type = "file" onChange={ e => this.setState( {images : e.target.files } ) }/>
                       </Grid>
                       <Grid item container spacing={4} xs={12}>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                    <List component={"div"} role={"list"}>
                                        { this.state.availableWorks.map ( work => (
                                            <ListItem key={work._id} button onClick={ this.handleSelect(work._id) }>
                                                <ListItemIcon>
                                                    <CheckBox
                                                        checked={ this.state.selectedWorks.has( work._id ) }
                                                        tabIndex={-1}
                                                        />
                                                </ListItemIcon>
                                                <ListItemText primary={ work.name }/>
                                            </ListItem>
                                        ))}
                                   </List>
                               </Paper>
                           </Grid>
                       </Grid>
                       <Divider/>
                       <Grid item >
                           <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                               <Button onClick={ this.handleSubmit } color={"primary"} variant={"filled"}>
                                   Submit
                               </Button>
                           </Box>
                       </Grid>
                   </Grid>
               </Dialog>
            </>
        )
    }
}

export default withStyles(styles)(PlanForm);