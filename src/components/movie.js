import React, { Component }  from 'react';
import {connect} from "react-redux";
import {Glyphicon, Panel, ListGroup, ListGroupItem, ControlLabel, Col, FormControl, Form, FormGroup, Button} from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";
import {submitLogin} from "../actions/authActions";
import { submitReview } from '../actions/movieActions';

//support routing by creating a new component

class Movie extends Component {
    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            details:{
                review: '',
                rating: 0
            }
        };
    }

    submit() {
        const {dispatch} = this.props;
        let review = {
            username: localStorage.getItem('username'),
            review: this.state.details.review,
            rating: parseFloat(this.state.details.rating),
            title: this.props.selectedMovie.title
        };
        console.log("-----------------------------------------------", review);
        dispatch(submitReview(review));
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null)
            dispatch(fetchMovie(this.props.movieTitle));
    }

    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.name}</b> {actor.character}
                </p>
            );
        };

        const ReviewInfo = ({reviews}) => {
            return reviews.map((review, i) =>
                <p key={i} className="review">
                <b>{review.username}</b>&nbsp;&nbsp;<Glyphicon glyph={'star'} /> {review.rating}<br/> {review.review}

                </p>
            );
        };

        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Panel.Heading>Movie Detail</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentMovie.image} thumbnail /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentMovie.title}</ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.actors} /></ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'} /> {currentMovie.avg_rating} </h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Heading>Reviews</Panel.Heading>
                    <Panel.Body>
                        Write a review
                        <Form horizontal>
                            <FormGroup controlId="review">
                                <Col sm={2}>
                                    Review
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" onChange={this.updateDetails} value={this.state.details.review} placeholder="Review" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="rating">
                                <Col sm={2}>
                                    Rating
                                </Col>
                                <Col sm={2}>
                                    <FormControl onChange={this.updateDetails} value={this.state.details.rating} placeholder="5" type="number" min="0" max="5" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button onClick={this.submit}>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>

                        <ReviewInfo reviews={currentMovie.movie_reviews} />
                    </Panel.Body>
                </Panel>
            );
        };
        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        username: state.username,
        selectedMovie: state.movie.selectedMovie,
        movieTitle: ownProps.match.params.movieTitle
    }
}

export default withRouter(connect(mapStateToProps)(Movie));