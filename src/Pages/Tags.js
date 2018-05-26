import Header from './../Components/Header'
import Query from './../Components/Query'
import Item from './../Components/Styling/Item'
import TAGS from '../Queries/TAGS'
import Slider from './../Components/Slider'

const makeLink = name => `/category/${name.replace(/\s+/g, '-').toLowerCase()}`

export default () => (
  <div>
    <Header title="Categories" noSearch />
    <div>
      <Query query={TAGS}>
        {({ data: { allTagses } }) => {
          return (
            <div>
              {allTagses.map(s => (
                <div key={s.id}>
                  <Item key={s.id} href={makeLink(s.name)}>
                    {s.name}
                  </Item>
                  <Slider videos={s.videos} />
                </div>
              ))}
            </div>
          )
        }}
      </Query>
    </div>
  </div>
)
