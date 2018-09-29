import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'

const Section = styled.div`
    display: flex;

    @media (max-width: ${remcalc(768)}) {
        top: ${remcalc(-55)};
        position: relative;
        margin: auto;
        justify-content: center;
    }
`

const Text = styled.div`
    font-size: 22px;
    padding: 4px;
    padding-left: 12px;
    font-weight: 200;
    color: ${props => props.theme.main};
`

const Hide = styled.div`
    .tgl {
        display: none;

        // add default box-sizing for this scope
        &,
        &:after,
        &:before,
        & *,
        & *:after,
        & *:before,
        & + .tgl-btn {
            box-sizing: border-box;
            &::selection {
                background: none;
            }
        }

        + .tgl-btn {
            outline: 0;
            display: block;
            width: 4em;
            height: 2em;
            position: relative;
            cursor: pointer;
            user-select: none;
            &:after,
            &:before {
                position: relative;
                display: block;
                content: '';
                width: 50%;
                height: 100%;
            }

            &:after {
                left: 0;
            }

            &:before {
                display: none;
            }
        }

        &:checked + .tgl-btn:after {
            left: 50%;
        }
    }

    // themes

    .tgl-ios {
        + .tgl-btn {
            background: ${props => props.theme.lightGrey};
            border-radius: 2em;
            transition: all 0.4s ease;
            &:after {
                border-radius: 2em;
                background: #fff;
                transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    padding 0.3s ease, margin 0.3s ease;
                box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1),
                    0 4px 0 rgba(0, 0, 0, 0.08);
            }

            &:hover:after {
                will-change: padding;
            }

            &:active {
                box-shadow: inset 0 0 0 2em #e8eae9;
                &:after {
                    padding-right: 0.8em;
                }
            }
        }

        &:checked + .tgl-btn {
            background: ${props => props.theme.green};
            &:active {
                box-shadow: none;
                &:after {
                    margin-left: -0.8em;
                }
            }
        }
    }
`

export default ({ hideViewed, client }) => {
    return (
        <Section>
            <Hide>
                <input
                    className="tgl tgl-ios"
                    id="hide-talks"
                    type="checkbox"
                    aria-label="Hide Watched Talks"
                    onClick={() =>
                        client.writeData({
                            data: { hideViewed: !hideViewed }
                        })
                    }
                    checked={hideViewed}
                />
                <label className="tgl-btn" htmlFor="hide-talks" />
            </Hide>
            <Text>Hide Watched Talks</Text>
        </Section>
    )
}
