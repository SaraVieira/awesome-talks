import React from 'react'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import { Helmet } from 'react-helmet'

import Nav from './../Components/Nav'
import Error404 from './../Components/Errors/Error404'

const FourOFour = () => {
    return (
        <Grid>
            <Helmet>
                <title>404 Page Not found! - Awesome Talks</title>
            </Helmet>
            <div role="banner">
                <Nav />
            </div>
            <main>
                <Row>
                    <Col xs={12}>
                        <Error404 />
                    </Col>
                </Row>
            </main>
        </Grid>
    )
}

export default FourOFour
