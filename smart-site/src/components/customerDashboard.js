import React, {Component} from "react";
import {BaseURL} from "../public/baseURL";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import {Button, Typography} from "@material-ui/core";
import Message from "./message";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {ProgressCircular} from "./progress";
import Container from "@material-ui/core/Container";

class CustomerDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {

            messageOpen : false,

            // Data
            projects : [],

            //connection control
            error : false,
            success : false,
            toastMessage : ''

        }

        this.dataFetch = this.dataFetch.bind(this);
        this.messageToggler = this.messageToggler.bind(this);
    }

    dataFetch() {
        fetch( BaseURL + '/common/projects', {
            method : "GET"
        })
            .then ( response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error({ message : response.json().message });
            })
            .then ( data => this.setState( { projects : data } ) )
            .catch ( err => this.setState( { error : true, toasrMessage : err.message }))
    }

    messageToggler() {
        this.setState({messageOpen : !this.state.messageOpen});
    }

    render(){
        return (
            <>
                <Message open={this.state.messageOpen} onCloseHandler={this.messageToggler}/>
                <AppBar color={"primary"} position={"static"}>
                    <Box width={"100vw"} display={"flex"} p={2} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                       <Typography component={"h4"}>Welcome</Typography>
                        <Box display={"flex"} p={3} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} >
                            <Button variant={"outlined"} color={"inherit"} onClick={this.messageToggler}>
                                Messages
                            </Button>
                        </Box>
                    </Box>
                </AppBar>
                <Container>
                    { this.state.projects.map( project => (
                        <Link key={"project._id"} to={`/project/${project._id}`}>
                            <Card variant={"outlined"}>
                                <Grid
                                    container
                                    direction={"row"}
                                    spacing={4}
                                    justify={"center"}
                                    alignItems={"center"}
                                    >
                                   <Grid item xs={12} md={4}>
                                       <ProgressCircular progress={project.progress}/>
                                   </Grid>
                                    <Grid item xs={12} md={8}>
                                        {project._id}
                                    </Grid>
                                </Grid>
                            </Card>
                        </Link>
                    ))}
                </Container>
            </>
        );
    }
}

export default CustomerDashboard;