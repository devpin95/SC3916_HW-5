import React, {Component} from 'react';
import {Button, Col, Form, FormControl, FormGroup} from "react-bootstrap";
import {submitReview} from "../actions/movieActions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Reviewform extends Component {
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

    render() {
        return (
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
};

export default withRouter(connect(mapStateToProps)(Reviewform));