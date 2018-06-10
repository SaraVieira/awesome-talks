import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import Hide from '../../Utils/toggle-button'

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

export default ({ hideViewed, client }) => {
    return (
        <Section>
            <Hide>
                <input
                    className="tgl tgl-ios"
                    id="cb2"
                    type="checkbox"
                    aria-label="Hide Watched Talks"
                    onClick={() =>
                        client.writeData({
                            data: { hideViewed: !hideViewed }
                        })
                    }
                    checked={hideViewed}
                />
                <label className="tgl-btn" htmlFor="cb2" />
            </Hide>
            <Text>Hide Watched Talks</Text>
        </Section>
    )
}
