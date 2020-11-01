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

const styles =  () => ({
    appBar : {
        position : 'relative'
    },
    title : {
        flex : 1
    }
});

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages : [],
            message : ''
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
            .then ( response => this.setState({ messages : response.messages }))
            .catch( error => console.log(error.message) );
    }

    messageUpdater (id) {
        this.socket.emit('message',{ message : this.state.message , user_id : id});
        this.setState( { message : ''} );
    }

    componentWillMount(){
        this.dataFetch();
        this.socket = io("http://localhost:3000");
        this.socket.on('connect', () => console.log("Socket connected"));
        this.socket.on('message', message => this.messageUpdater( message ));
        this.socket.on( 'disconnect', () => console.log("Disconnected from server"));
    }

    static contextType = AuthContext;

    render() {

        const { isAuthenticated, user_id } = this.context;
        const { classes } = this.props;
        return(
            <>
                <Dialog
                    fullScreen
                    onClose={ this.props.onCloseHandler }
                    open = { this.props.open }
                    >
                    <AppBar className={ classes.appBar }>
                        <IconButton edge={"start"} onClick={ this.props.onCloseHandler }>
                            <CloseIcon />
                        </IconButton>
                        <Typography component={"h6"} classNames={ classes.title }>Messages</Typography>
                    </AppBar>
                    <Container>
                        {this.state.messages.map( message => (
                            <div className={ message.from._id === user_id ? 'message-right' : 'message-left'}>
                                <Grid container justify={"flex-start"}>
                                    <Typography component={"p"} >
                                        {message.from.name}
                                    </Typography>
                                    <Typography component={"div"}>
                                        {message.message}
                                    </Typography>
                                </Grid>
                            </div>
                        ))}
                    </Container>
                    <Box width={"100%"}>
                        <Box width={"80%"}>
                            <Input type={"text"} placeholder={"message"} value={this.state.message} onChange={e => this.setState({ message : e.target.value})}/>
                        </Box>
                        <IconButton onClick={()=>this.messageUpdater(user_id)}>
                            <SendRoundedIcon/>
                        </IconButton>
                    </Box>
                </Dialog>
            </>
        )
    }
}

export default withStyles(styles)(Message);