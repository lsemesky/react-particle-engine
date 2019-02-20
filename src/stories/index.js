import React from 'react';

import { storiesOf } from '@storybook/react';
import { Leaf1, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7, Leaf8, Leaf9, Leaf10, Leaf11, Leaf12, Leaf13, Leaf14, Leaf15, Leaf16 } from '../svg/leaves'

import Particle from '../components/Particle/Particle';


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
  .add('Particle', () => <Particle />)
  .add('Random Leaf Particle', () => <Particle particleType="LEAF" />)
  .add('A Bunch of Random Leaves', () => {
    return Array(15).fill(0).map((v,i)=><Particle particleType="LEAF" key={i} position={{x: i*40}}/>);
  })

