import React, { Component }  from 'react';
import {connect} from "react-redux";
import {Glyphicon, Panel, ListGroup, ListGroupItem, ControlLabel, Col, FormControl, Form, FormGroup, Button} from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";
import {submitLogin} from "../actions/authActions";
import { submitReview } from '../actions/movieActions';
import Reviewform from "./reviewform";

//support routing by creating a new component

class Movie extends Component {

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
                        <ListGroupItem><h4><Glyphicon glyph={'star'} /> {currentMovie.avg_rating.toFixed(2)} </h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Heading>Reviews</Panel.Heading>
                    <Panel.Body>
                        Write a review
                        <Reviewform></Reviewform>

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