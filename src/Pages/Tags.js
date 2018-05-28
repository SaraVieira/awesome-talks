import Header from './../Components/Header'
import Query from './../Components/Query'
import TAGS from '../Queries/TAGS'
import Slider from './../Components/Slider'
import { SimpleVideo } from './../Components/Video'
import { Grid } from 'react-styled-flexboxgrid'
import styled from 'styled-components'
import remcalc from 'remcalc'
import LazyLoad from 'react-lazyload'
import { Link } from 'preact-router/match'

const Column = styled.div`
  transition: all 200ms ease;
  justify-content: center;
  margin: 0 auto;
  min-height: 310px
  margin-bottom: ${remcalc(40)};
`

const Item = styled(Link)`
  color: black;
  font-size: 27px;
  font-weight: bold;
  &:hover {
    background: white;
  }
`

const makeLink = name => `/category/${name.replace(/\s+/g, '-').toLowerCase()}`

export default () => (
  <Grid>
    <Header title="Categories" noSearch />
    <Query query={TAGS}>
      {({ data: { allTagses } }) => {
        return (
          <div>
            {allTagses.map(s => {
              return (
                <div key={s.id}>
                  <Item key={s.id} href={makeLink(s.name)}>
                    {s.name}
                  </Item>

                  <Slider>
                    {s.videos.map(v => {
                      return (
                        <Column key={v.id}>
                          <LazyLoad height={310}>
                            <SimpleVideo {...v} />
                          </LazyLoad>
                        </Column>
                      )
                    })}
                  </Slider>
                </div>
              )
            })}
          </div>
        )
      }}
    </Query>
  </Grid>
)
