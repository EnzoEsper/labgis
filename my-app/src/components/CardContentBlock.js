import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import './CardContentBlock.css';

const CardContentBlock = ({ layersActive }) => (
  <Card style={{ position:"absolute", zIndex:"99", left:"15px", top:"600px", width:"210px"}} >
    <Card.Content>
      <Card.Header>Leyenda</Card.Header>
    </Card.Content>
    <Card.Content style={{ paddingTop:"0px" }}>
      <Feed id="label-image">
        {layersActive.map(layer => {
          return <Feed.Label key={layer} image={`http://localhost:8380/?&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=${layer}&FORMAT=image/png&STYLE=predeterminado&SLD_VERSION=1.1.0`}/>
        })}
      </Feed>
    </Card.Content>
  </Card>
)

export default CardContentBlock;