import React from 'react';

import { storiesOf } from '@storybook/react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Leaf1, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7, Leaf8, Leaf9, Leaf10, Leaf11, Leaf12, Leaf13, Leaf14, Leaf15, Leaf16 } from '../svg/leaves'

import Particle from '../components/Particle/Particle';
import ParticleEngine from '../components/ParticleEngine/ParticleEngine'
import ParticleViewer from '../components/ParticleViewer/ParticleViewer'

import theme from '../theme'

const muiThemeDecorator = (story) => (
    <MuiThemeProvider theme={theme}>
      {story()}
    </MuiThemeProvider>
  );

const divStyle = {
  fill: 'red',
  outline: 'red',
  height: '50px',

}
storiesOf('SVG/Leaves', module)
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

storiesOf('Particle', module)
  .add('Default Particle', () => <Particle />)

storiesOf('Particle/Leaf', module)
  .add('Default Leaf Particle', () => <Particle particleType="LEAF" />)

storiesOf('ParticleEngine/Leaves', module)
  .add('ParticleEngine 100 count, mild intensity', () => <ParticleEngine particleType="LEAF" volume={20} width={500} intensity={20} />)
  .add('ParticleEngine 100 count, medium intensity', () => <ParticleEngine particleType="LEAF" volume={100} width={500} intensity={10} />)
  .add('ParticleEngine 100 count, strong intensity', () => <ParticleEngine particleType="LEAF" volume={200} width={500} intensity={5} />)

storiesOf('ParticleViewer', module)
  .addDecorator(muiThemeDecorator)
  .add('ParticleViewer', () => <ParticleViewer />)
