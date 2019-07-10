
import { Leaf1, Leaf10, Leaf11, Leaf12, Leaf13, Leaf14, Leaf15, Leaf16, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7, Leaf8, Leaf9 } from '../svg/leaves'
import { Insect1, Insect2, Insect3 } from '../svg/insects'
import { boolean, color, number, select, withKnobs } from '@storybook/addon-knobs'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Particle from '../components/Particle/Particle'
import ParticleEngine from '../components/ParticleEngine/ParticleEngine'
import ParticleViewer from '../components/ParticleViewer/ParticleViewer'
import React from 'react'
import { storiesOf } from '@storybook/react'




import theme from '../theme'

const muiThemeDecorator = (story) => (
  <MuiThemeProvider theme={theme}>
    {story()}
  </MuiThemeProvider>
)

const divStyle = {
  fill: 'red',
  outline: 'red',
  height: '50px',

}
storiesOf('SVG/Leaves')
  .add('Leaf1', () => <Leaf1 style={divStyle} />)
  .add('Leaf2', () => <Leaf2 />)
  .add('Leaf3', () => <Leaf3 />)
  .add('Leaf4', () => <Leaf4 />)
  .add('Leaf5', () => <Leaf5 />)
  .add('Leaf6', () => <Leaf6 />)
  .add('Leaf7', () => <Leaf7 />)
  .add('Leaf8', () => <Leaf8 />)
  .add('Leaf9', () => <Leaf9 />)
  .add('Leaf10', () => <Leaf10 />)
  .add('Leaf11', () => <Leaf11 />)
  .add('Leaf12', () => <Leaf12 />)
  .add('Leaf13', () => <Leaf13 />)
  .add('Leaf14', () => <Leaf14 />)
  .add('Leaf15', () => <Leaf15 />)
  .add('Leaf16', () => <Leaf16 />)

storiesOf('SVG/Insects')
  .add('Insect1', () => <Insect1 style={{ height: '100px' }} />)
  .add('Insect2', () => <Insect2 style={{ height: '100px' }} />)
  .add('Insect3', () => <Insect3 style={{ height: '100px' }} />)

storiesOf('Particle')
  .addDecorator(withKnobs)
  .add('Default Particle', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
  />)

storiesOf('Particle/Leaf')
  .addDecorator(withKnobs)
  .add('Default Leaf Particle', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
    image={Leaf1}
  />)

storiesOf('ParticleEngine')
  .addDecorator(withKnobs)
  .add('Particle Engine', () => <ParticleEngine
    particleType={select('Particle Type', { Leaf: 'LEAF', Insect: 'INSECT' }, 'LEAF')}
    volume={number(
      'Volume',
      100,
      {
        range: true,
        min: 0,
        max: 200,
        step: 1,
      }
    )}
    width={number(
      'Width',
      500,
      {
        range: true,
        min: 100,
        max: 1000,
        step: 5,
      }
    )}
    height={number(
      'Height',
      500,
      {
        range: true,
        min: 100,
        max: 800,
        step: 10,
      }
    )}
    intensity={number(
      'Intensity (Lower = more intense)',
      10,
      {
        range: true,
        min: 0,
        max: 20,
        step: 1,
      }
    )}
    paused={boolean('Paused', false)}
  />)

storiesOf('ParticleEngine/Leaves')
  .add('ParticleEngine 100 count, mild intensity', () => <ParticleEngine particleType="LEAF" volume={20} width={500} intensity={20} />)
  .add('ParticleEngine 100 count, medium intensity', () => <ParticleEngine particleType="LEAF" volume={100} width={500} intensity={10} />)
  .add('ParticleEngine 100 count, strong intensity', () => <ParticleEngine particleType="LEAF" volume={200} width={500} intensity={5} />)
storiesOf('ParticleEngine/Insects')
  .add('ParticleEngine 100 count, mild intensity', () => <ParticleEngine particleType="INSECT" volume={20} width={500} intensity={20} />)
  .add('ParticleEngine 100 count, medium intensity', () => <ParticleEngine particleType="INSECT" volume={100} width={500} intensity={10} />)
  .add('ParticleEngine 100 count, strong intensity', () => <ParticleEngine particleType="INSECT" volume={200} width={500} intensity={5} />)

storiesOf('ParticleViewer')
  .addDecorator(muiThemeDecorator)
  .add('ParticleViewer', () => <ParticleViewer />)
