import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'qalDI7M4tHq5Ag28aYclWicEtaeg6CJP';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

export default class SearchableMovieReviewsContainer extends Component {
    state = {
        searchTerm: "",
        reviews: []
    }

    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(URL + `&query=${this.state.searchTerm}`)
            .then(resp => resp.json())
            .then(json => this.setState({reviews: json.results}))
    }

    render() {
        return (
            <div className="searchable-movie-reviews">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="search" value={this.state.searchTerm} onChange={this.handleChange} />
                    <input type="submit" value="Search!" />
                </form>
                <MovieReviews reviews={this.state.reviews} />
            </div>
        )
    }
}
