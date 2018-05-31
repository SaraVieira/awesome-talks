import React from 'react'
import { graphql, compose } from 'react-apollo'
import remcalc from 'remcalc'
import randomID from 'random-id'

import ADD_WATCHED from '../Queries/ADD_WATCHED'
import REMOVE_WATCHED from '../Queries/REMOVE_WATCHED'
import GET_WATCHED from '../Queries/GET_WATCHED'
import Query from './Query'
import Heart from './Styling/Heart'

const Favorite = ({ id, removeWatched, addWatched }) => (
    <Query query={GET_WATCHED}>
        {({ data: { watched } }) => {
            const inputId = randomID()
            return (
                <Heart watched>
                    <input
                        checked={watched.includes(id)}
                        type="checkbox"
                        id={inputId}
                        onClick={() =>
                            watched.includes(id)
                                ? removeWatched(id)
                                : addWatched(id)
                        }
                    />
                    <label htmlFor={inputId}>
                        <svg
                            width={remcalc(90)}
                            height={remcalc(24)}
                            viewBox="0 0 90 82"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            >
                                <g fillRule="nonzero">
                                    <path d="M88.937,1.152 C87.571,-0.221 85.181,-0.223 83.81,1.152 L60.393,24.569 L50.026,14.198 C48.652,12.822 46.261,12.828 44.899,14.194 C44.211,14.878 43.833,15.788 43.832,16.757 C43.832,17.727 44.209,18.64 44.897,19.326 L49.988,24.417 C49.988,24.417 56.527,30.732 57.94,32.146 C59.312,33.518 61.697,33.518 63.069,32.146 L73.438,21.777 L78.568,16.649 L88.935,6.279 C89.623,5.593 89.999,4.679 89.999,3.71 C89.999,2.742 89.621,1.832 88.937,1.152 Z" />
                                    <path d="M36.656,33.607 C20.668,33.607 6.81,43.416 0,57.744 C6.81,72.072 20.668,81.879 36.656,81.879 C52.643,81.879 66.501,72.072 73.312,57.744 C66.501,43.416 52.644,33.607 36.656,33.607 Z M54.729,69.08 C49.316,72.717 43.067,74.641 36.656,74.641 C30.244,74.641 23.995,72.717 18.582,69.08 C14.274,66.186 10.625,62.309 7.884,57.744 C10.625,53.179 14.275,49.301 18.581,46.406 C23.994,42.769 30.243,40.847 36.655,40.847 C43.067,40.847 49.316,42.768 54.729,46.406 C59.037,49.301 62.688,53.178 65.428,57.744 C62.688,62.309 59.037,66.187 54.729,69.08 Z" />
                                    <circle
                                        cx="36.656"
                                        cy="57.744"
                                        r="14.907"
                                    />
                                </g>
                            </g>
                        </svg>
                    </label>
                </Heart>
            )
        }}
    </Query>
)

export default compose(
    graphql(REMOVE_WATCHED, {
        props: ({ mutate }) => ({
            removeWatched: id => mutate({ variables: { id } })
        })
    }),
    graphql(ADD_WATCHED, {
        props: ({ mutate }) => ({
            addWatched: id => mutate({ variables: { id } })
        })
    })
)(Favorite)
