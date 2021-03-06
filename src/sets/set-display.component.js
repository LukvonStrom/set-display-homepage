import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import {DataProvider} from "../data/data-provider";
import {SetDetailComponent} from "./set-detail.component";
import {CardDeck, Container} from "react-bootstrap";
import {SetFilterComponent} from "./set-filter.component";

export class SetDisplayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sets: null,
            isFetching: true,
            genres: []
        };

        this.selectGenre = this.selectGenre.bind(this);
    }

    /*
    See: https://stackoverflow.com/a/6274381
     */
    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    /*
    See: https://stackoverflow.com/a/24782004
     */
    chunk(arr, chunkSize) {
        let R = [];
        for (let i = 0, len = arr.length; i < len; i += chunkSize)
            R.push(arr.slice(i, i + chunkSize));
        return R;
    }

    updateSets() {
        this.setState({isFetching: true});
        DataProvider.getSets()
            .then(sets => {
                let genreOccurrence = {};
                let genres = [...new Set(sets.map(({genre}) => {
                    if (!genreOccurrence[genre]) {
                        genreOccurrence[genre] = 1;
                    } else {
                        genreOccurrence[genre] += 1;
                    }

                    return genre;
                }))].sort();
                this.setState({sets, isFetching: false, genres, genreOccurrence, filteredSets: this.chunk(sets, 3)})
            })
            .catch(error => this.setState({isFetching: false, error}))
    }

    selectGenre(selectedGenre) {
        this.setState((state) => {
            let filteredSetsPlain = (!!selectedGenre && state.sets.filter(({genre}) => genre === selectedGenre)) || state.sets;
            return {
                selectedGenre,
                filteredSets: this.chunk(filteredSetsPlain, 3)
            }
        })


    }

    componentDidMount() {
        this.updateSets();
    }

    render() {
        return (<Container>

            <Row>
                <SetFilterComponent genres={this.state.genres} genreOccurrence={this.state.genreOccurrence}
                                    selectGenre={this.selectGenre}/>
            </Row>

            {this.state.filteredSets && this.state.filteredSets.length > 0 && this.state.filteredSets.map((partition, index) =>
                <Row key={index}>
                    <CardDeck className="my-2" key={index}>
                        {partition.map(set => <SetDetailComponent set={set}
                                                                  key={Object.values(set).join(',') + "-" + this.state.selectedGenre}
                                                                  selectedGenre={this.state.selectedGenre}/>)}
                    </CardDeck>
                </Row>)
            }


        </Container>)
    }
}
