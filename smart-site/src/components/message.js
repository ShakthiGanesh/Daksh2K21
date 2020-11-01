import React, {Component} from "react";
import io from 'socket.io-client';
import {IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import {AuthContext} from "../public/authContext";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import {BaseURL} from "../public/baseURL";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuIcon from '@material-ui/icons/Menu';
import '../css/message.css';
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import {TextFields} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import ButtonBase from "@material-ui/core/ButtonBase";
import ListItemText from "@material-ui/core/ListItemText";

const styles =  () => ({
    close : {
        color : "#ffffff"
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    }
});

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages : [],
            message : '',
            projects : [],
            selectedProject : 0
        }

        this.dataFetch = this.dataFetch.bind(this);
        this.messageUpdater = this.messageUpdater.bind(this);
    }

    dataFetch() {
        fetch( BaseURL + '/common/message',{
            method : 'GET'
        })
            .then ( response => {
                if ( response.ok )
                    return response.json();
                else throw new Error({ message : response.json().message });
            })
            .then ( response => this.setState({ messages : response.messages, projects : response.projects }))
            .catch( error => console.log(error.message) );
    }

    messageUpdater (id, name) {
        let message = {
            message : this.state.message,
            from : {
                _id : id,
                name : name
            },
            to : {
                _id : this.state.projects[this.state.selectedProject]._id
            }
        }
        this.socket.emit('message',message);
        this.setState( { messages : [...this.state.messages, message]})
        this.setState( { message : ''} );
    }

    componentWillMount(){
        this.dataFetch();
        this.socket = io("http://localhost:3000");
        this.socket.on('connect', () => console.log("Socket connected"));
        this.socket.on('message', message => this.messageUpdater( message ));
        this.socket.on( 'disconnect', () => console.log("Disconnected from server"));
    }

    projectSwitcher(id) {
        this.setState({selectedProject : id});
    }

    static contextType = AuthContext;

    render() {

        const { isAuthenticated, user_id, name } = this.context;
        const { classes } = this.props;
        return(
            <>
                <Dialog
                    fullScreen
                    onClose={ this.props.onCloseHandler }
                    open = { this.props.open }
                    >

                    <div className={"appBar-chat"}>
                        <Hidden smUp>
                            <MenuIcon/>
                        </Hidden>
                        <Typography component={"h1"} variant={"h5"}>Messages</Typography>
                        <IconButton onClick={this.props.onCloseHandler}>
                            <CloseIcon className={classes.close}/>
                        </IconButton>
                    </div>

                    <div className={"sideNav-chat"}>
                        <List>
                            { this.state.projects.map( (project,id) => (
                                <ButtonBase key={id} onClick={()=>this.projectSwitcher(id)}>
                                    <ListItem>
                                        <ListItemText>
                                            Project : {project._id}
                                        </ListItemText>
                                    </ListItem>
                                </ButtonBase>
                            ))}
                        </List>
                    </div>

                    <div className={"chat-container"}>
                        <div className={"chat-field-container"}>
                            <div className={"chat-field"}>
                                <input placeholder={"Enter message here"} fullWidth className={classes} value={this.state.message} onChange={ e => this.setState({ message : e.target.value } )}/>
                            </div>
                            <IconButton onClick={ () => this.messageUpdater( user_id, name ) }>
                                <SendRoundedIcon/>
                            </IconButton>
                        </div>
                        <div className={"message-container"}>

                            { this.state.messages.filter(message => message.to._id === this.state.projects[this.state.selectedProject])
                                .map(message => (
                                    <div className={ message.from._id === user_id ? "my-message" : "foreign-message"}>
                                        <div>
                                            <p>{message.from.name}</p>
                                            <p>{message.message}</p>
                                        </div>
                                    </div>
                                )
                                )}
                        </div>
                    </div>
                </Dialog>
            </>
        )
    }
}

export default withStyles(styles)(Message);