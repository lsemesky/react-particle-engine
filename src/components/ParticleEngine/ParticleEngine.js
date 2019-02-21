import React, { useEffect, useState } from 'react';
import Particle from '../Particle/Particle'
import posed from 'react-pose';
import { Leaf1 } from '../../svg/leaves'


const generateRandomNumberInRange = (num) => Math.floor(Math.random() * num)

const Box = posed.div({
    hidden: { 
        top: -50,
        rotate: 0,
        rotateY: 0,
        left: ({x=0}) => x,
        x: 0,//({x=0}) => x,
        transition: { duration: 0 },
    },
    visible: {
        rotate: ({rotate}) => rotate,
        rotateY: ({rotateY}) => rotateY,
        top: 800,
        originX: ({intensity}) => (20-generateRandomNumberInRange(intensity)),
        originY: ({intensity}) => (20-generateRandomNumberInRange(intensity)),
        left: ({x=0}) => x,
        transition: ({ intensity }) => ({ 
            duration: intensity * 600 
        }),
     }
  });
  
  class ParticleEngine extends React.Component {
    state = { particleArray: [], isVisible: true };

    componentDidMount() {
      const {volume, width, intensity} = this.props;
      const numParticlesPerLoop = Math.floor(volume/10);
      const me = this;

      setInterval(() => {
        let particleArray= me.state.particleArray || []
        const lastElement = particleArray[particleArray.length - 1]
        if (lastElement && lastElement.isVisible===true) {
            lastElement.isVisible = false
        }
        const newParticle = {
            x: generateRandomNumberInRange(width),
            isVisible: true,
            key: `particle-${Math.random(9999999)}`
        }
            if(particleArray.length >= volume) {
                particleArray.splice(0,1)
            } 
                particleArray.push(newParticle)
            
                

        me.setState({particleArray: particleArray})
      }, Math.floor((intensity * 100)/numParticlesPerLoop));
      
    }
    render() {
        const { intensity=10,particleType } = this.props;
        const { particleArray } = this.state;
        return particleArray.map((v,i) =>
         v ? 
        (<Box key={`box${v.key}`} style={{position:"absolute"}} pose={v.isVisible ? 'hidden' : 'visible'} intensity={intensity} x={v.x} rotate={generateRandomNumberInRange(500-2*intensity)-generateRandomNumberInRange(500-2*intensity)} rotateY={generateRandomNumberInRange(500-2*intensity)-generateRandomNumberInRange(500-2*intensity)}>
       <Particle
          particleType={particleType}
          key={v.key}
        />
        </Box>) : null )
    }
  }

// const ParticleEngine = ({ particleType, volume, intensity, width, height }) => {
//     const [isVisible, setIsVisible] = useState(true);
//     if (!particleArray.length)
//         particleArray = Array(volume).fill(0)
//         //const [counter, setCounter] = useState(0);

//         useEffect(() => {
//           const interval = setInterval(() => {
//             setIsVisible(counter => !counter);
//           }, 1000);
      
//           return () => {
//             clearInterval(interval);
//           };
//         }, []);
      
//     particleArray.forEach((v, i) => particleArray[i] = { x: generateRandomStartingPosition(width), y: 0 })

//     return particleArray.map((v, i) => {
//         const Box = posed.div({
//             hidden: { opacity: 0 },
//             visible: { opacity: 1 }
//         });
//         return <Box key={i} style={{ color: 'black', background: 'red', height: '100px', width: '100px' }} pose={isVisible ? 'visible' : 'hidden'}>
//             {/* <Particle
//                 particleType={particleType}
//                 key={i}
//                 position={v}
//                 intensity={intensity}
//             /> */}
//             {/* <Leaf1 /> */}
//             {`${isVisible}`}
//         </Box>
//     }
//     )
// }

export default ParticleEngine;