import React from 'react';
import Cookies from 'js-cookie';
import { Container, Pagination, Label, Card, Popup, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)

    }
    //Request for closing a job
    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        var link = 'https://hfytalentappwebappcompetitiontalent.azurewebsites.net/listing/listing/closeJob'
        //url: 'https://hfytalentappwebappcompetitiontalent.azurewebsites.net/listing/listing/closeJob',
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "application/json",
            data: JSON.stringify(id),
            dataType: "json",
            success: function (res) {
                console.log(res.message);
                window.location.reload(false);
                //console.log(res);              
            }.bind(this),
            error: function (res) {
                console.log(res.message);                    
            }
        })
    }



    render() {
        //var a = console.log(this.props.jobs);
        //return Jobsummarycards to its parent(ManageJob.jsx)
        return (
            <React.Fragment>
                <div className="ui container">
                    {this.props.jobs.length > 0 ?
                        <Card.Group itemsPerRow={3} doubling={true}>
                            {this.props.jobs.map((job,id) => (
                                <Card key={id}
                                    header={
                                        <React.Fragment>
                                            <Card.Header>{job.title}</Card.Header>
                                            <Label as='a' color='black' ribbon='right'>
                                                <Icon name="user" /> {job.noOfSuggestions}
                                            </Label>
                                        </React.Fragment>
                                    }

                                    meta={`${job.location.city}, ${job.location.country}`}
                                    description={
                                        <React.Fragment>
                                            {`${job.summary}`}

                                        </React.Fragment>
                                    }
                                    extra={
                                        <React.Fragment>
                                            <Button floated='left' size='mini' color='red'>Expired</Button>
                                            <Button.Group floated='right' size='mini'>
                                                <Button basic color='blue' onClick={() => this.selectJob(job.id)}><Icon name='ban' />Close</Button>
                                                <Button basic color='blue' a href={`/EditJob/${job.id}`}><Icon name='edit' />Edit</Button>
                                                <Button basic color='blue' ><Icon name='copy' />Copy</Button>
                                            </Button.Group>
                                        </React.Fragment>
                                    }
                                />
                                )
                                )}
                        </Card.Group> : <p>No Jobs Found</p>}

                </div>
            </React.Fragment>
        )
    }
}
