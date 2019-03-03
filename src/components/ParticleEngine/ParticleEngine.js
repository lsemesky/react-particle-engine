import React from 'react';
import Particle from '../Particle/Particle'
import posed from 'react-pose';
import particleTypeSettings from '../../ParticleTypeSettings';

const getRandomElementFromList = (list) => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list ? list[randomIndex] : null
}

const getParticleTypeSetting = (particleType, settingName) => {
  const particleTypeSetting = particleTypeSettings[particleType] || particleTypeSettings.DEFAULT
  return particleTypeSetting[settingName]
}

const getRandomColor = (particleType) => {
  const colorList = getParticleTypeSetting(particleType, 'colorList')
  return getRandomElementFromList(colorList)
}

const getRandomImage = (particleType) => {
  const imageList = getParticleTypeSetting(particleType, 'imageList')
  return getRandomElementFromList(imageList)
}

const getRandomRotation = (particleType, intensity) => {
  const {calculateMin, calculateMax} = getParticleTypeSetting(particleType, 'rotation')
  return generateRandomNumberInRange(calculateMax(intensity), calculateMin(intensity))
}

const getRandomYRotation = (particleType, intensity) => {
  const {calculateMin, calculateMax} = getParticleTypeSetting(particleType, 'yRotation')
  return generateRandomNumberInRange(calculateMax(intensity), calculateMin(intensity)) 
}

const getRandomHeight = (particleType) => {
  const {minHeight, maxHeight} = getParticleTypeSetting(particleType, 'sizeRange')
  return generateRandomNumberInRange(maxHeight, minHeight);
}


const generateRandomNumberInRange = (max, min=0) => Math.floor(Math.random() * (max - min)) + min;

const Box = posed.div({
    hidden: { 
      background: 'none',
        top: -50,
        rotate: 0,
        rotateY: 0,
        left: ({x=0}) => x,
        x: 0,//({x=0}) => x,
        transition: { duration: 0 },
    },
    // paused: {
    //   background: 'red', 
    //   transition: {
    //     x: ({ from, velocity, to }) => from,
    //     y: ({ velocity, to }) => velocity > 0 ? { to: 600 } : { to },
    //     duration: 0,
    //     velocity: 0,

    //   }
    // },
    visible: {
        rotate: ({rotate}) => rotate,
        rotateY: ({rotateY}) => rotateY,
        background: 'red',
        top: 800,
        originX: ({intensity}) => (20-generateRandomNumberInRange(intensity)),
        originY: ({intensity}) => (20-generateRandomNumberInRange(intensity)),
        left: ({x=0}) => x,
        // transition: { 
        //   type: 'tween',
        //     duration: 600,//({ intensity, paused }) => intensity * 600,
        //     // x: ({ from, to, paused }) => paused ? from : to,
        //  //  top: ({ from, to, paused }) => paused ? from : to,
        //     top: ({ from, to, paused }) => paused ?  {from} : {to},
        // },
        transition: ({intensity}) => ({
          duration: intensity * 600
        })
     }
  });

  class ParticleEngine extends React.Component {
    state = { particleArray: [], isVisible: true };

    componentDidMount() {

      const me = this;

      var myFunction = function() {
        const {volume, width, intensity, particleType} = me.props;

          let particleArray= me.state.particleArray || []
          const lastElement = particleArray[particleArray.length - 1]
          if (lastElement && lastElement.isVisible===true) {
              lastElement.isVisible = false
          }
          const newParticle = {
              x: generateRandomNumberInRange(width),
              isVisible: true,
              key: `particle-${Math.random()}`,
              color: getRandomColor(particleType),
              height: getRandomHeight(particleType),
              image: getRandomImage(particleType),
          }
          if(particleArray.length >= volume * .5)
              particleArray.splice(0,Math.floor((particleArray.length - volume)/2))
          particleArray.push(newParticle)
              
          me.setState({particleArray: particleArray})
          const timer = Math.floor((intensity * 200)/volume);
          setTimeout(myFunction, timer);
      }
      setTimeout(myFunction, Math.floor((this.props.intensity * 1000)/this.props.volume));
    }
    render() {
        const { intensity=10,particleType, paused } = this.props;
        const { particleArray } = this.state;
        return particleArray.map((v,i) =>
         v ? 
        (
        <Box 
          key={`box${v.key}`}
          style={{position:"absolute"}}
          pose={v.isVisible ? 'hidden' : 'visible'}
          intensity={intensity}
          paused={paused}
          x={v.x}
          rotate={getRandomRotation(particleType, intensity)}
          rotateY={getRandomYRotation(particleType, intensity)}
        >
          <Particle
            particleType={particleType}
            color={v.color}
            height={v.height}
            image={v.image}
          />
        </Box>) : null )
    }
  }

export default ParticleEngine;