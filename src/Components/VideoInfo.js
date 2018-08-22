import React, { Fragment } from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Row, Col } from 'react-styled-flexboxgrid'

import Tag from './Styling/Tag'
import { getDuration } from '../Utils/youtube'
import VideoMeta from './MetaTags/Video'
import { SpeakerInfo } from './../Pages/Speaker'
import Header from '././Header'

const URLify = string => string.trim().replace(/\s/g, '%20')

const Description = styled.p`
    font-weight: 400;
    font-size: ${remcalc(16)};
    color: ${props => props.theme.main};
    letter-spacing: ${remcalc(0.11)};
    line-height: ${remcalc(21)};
`

const Duration = styled.span`
    font-weight: 400;
    color: ${props => props.theme.main};
`

const HeaderStyled = styled(Header)`
    margin-bottom: ${remcalc(20)};
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
    `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

const VideoInfo = ({
    name,
    description,
    speaker,
    id,
    tags,
    duration,
    link
}) => (
    <Fragment>
        <VideoMeta name={name} link={link} description={description} />
        <Flex column style={{ marginBottom: remcalc(40) }}>
            {duration ? <Duration>{getDuration(duration)}</Duration> : null}
            <div>
                {tags.map(s => (
                    <Tag key={s.id} to={makeLink('category', s.name)}>
                        #{s.name.toLowerCase()}
                    </Tag>
                ))}
            </div>
            <Description>{description}</Description>
            {typeof window !== 'undefined' ? (
                <a
                    className="no-hover"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://twitter.com/intent/tweet/?text=${URLify(
                        `Amazing Tech Talk - ${name} by @${
                            speaker[0].twitter
                        } via @talksawesome`
                    )}.&amp;url=${URLify(window.location.href)}`}
                >
                    Share on Twitter
                </a>
            ) : null}
        </Flex>
        <Row>
            <Col xs={12}>
                {speaker.map(s => (
                    <Fragment key={`${s.id}_${id}`}>
                        <HeaderStyled medium title="Speaker" noSearch />
                        <SpeakerInfo {...s} videoPage />
                    </Fragment>
                ))}
            </Col>
        </Row>
    </Fragment>
)

export default VideoInfo
