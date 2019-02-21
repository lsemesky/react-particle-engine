import React, { useEffect, useState } from 'react';
import Particle from '../Particle/Particle'
import posed from 'react-pose';
import { Leaf1 } from '../../svg/leaves'


const generateRandomNumberInRange = (num) => Math.floor(Math.random() * num)

const Box = posed.div({
    hidden: { 
        y: 0,
        rotate: 0,
        rotateY: 0,
        x: ({x=0}) => x,
        transition: { duration: 0 },
    },
    visible: {
        rotate: ({rotate}) => rotate,
        rotateY: ({rotateY}) => rotateY,
        y: 800,
        x: ({x=0}) => x,
        transition: ({ intensity }) => ({ 
            duration: intensity * 100 
        }),
     }
  });
  
  class ParticleEngine extends React.Component {
    state = { isVisible: false, particleArray: [] };
  
    componentDidMount() {
      const {volume, width} = this.props;
      const particleArray = Array(volume).fill(0)
      particleArray.forEach((v, i) => particleArray[i] = generateRandomNumberInRange(width))
      this.setState({particleArray: particleArray})
      setInterval(() => {
        this.setState({ isVisible: !this.state.isVisible });
      }, 6000);
    }
    render() {
        const { intensity=10,particleType } = this.props;
        const { isVisible, particleArray } = this.state;
        return particleArray.map((v,i) => 
        <Box className="box" pose={isVisible ? 'visible' : 'hidden'} intensity={intensity} x={v} rotate={generateRandomNumberInRange(900)} rotateY={generateRandomNumberInRange(360)}>
        <Particle
          particleType={particleType}
          key={i}
        />
        </Box>)
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