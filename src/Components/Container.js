import React from 'react'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'

export default ({ children }) => (
    <Grid>
        <Row>
            <Col xs={12}>{children}</Col>
        </Row>
    </Grid>
)
