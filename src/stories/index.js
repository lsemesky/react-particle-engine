import { boolean, color, number, select, withKnobs } from '@storybook/addon-knobs'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Particle from '../components/Particle/Particle'
import ParticleEngine from '../components/ParticleEngine/ParticleEngine'
import ParticleViewer from '../components/ParticleViewer/ParticleViewer'
import React from 'react'
import { insectImageArray } from '../svg/insects'
import { leafImageArray } from '../svg/leaves'
import { storiesOf } from '@storybook/react'
import theme from '../theme'

/*
 * Storybook story file that generates what you see when you run the storybook app
 */
const muiThemeDecorator = (story) => (
  <MuiThemeProvider theme={theme}>
    {story()}
  </MuiThemeProvider>
)

storiesOf('Particle/Leaf')
  .addDecorator(withKnobs)
  .add('Leaf Particle 1', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
    image={leafImageArray[0]}
  />)
  .add('Leaf Particle 2', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
    image={leafImageArray[1]}
  />)
  .add('Leaf Particle 3', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
    image={leafImageArray[2]}
  />)
  .add('Leaf Particle 4', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
    image={leafImageArray[3]}
  />)
  .add('Leaf Particle 5', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
    image={leafImageArray[4]}
  />)
  .add('Leaf Particle 6', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
    image={leafImageArray[5]}
  />)
  .add('Leaf Particle 7', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
    image={leafImageArray[6]}
  />)

storiesOf('Particle/Insect')
  .addDecorator(withKnobs)
  .add('Insect Particle 1', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
    image={insectImageArray[0]}
  />)
  .add('Insect Particle 2', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
    image={insectImageArray[1]}
  />)
  .add('Insect Particle 3', () => <Particle
    color={color('Color', '#000000')}
    height={number('Height', 100)}
    image={insectImageArray[2]}
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
