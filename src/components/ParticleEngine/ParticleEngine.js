import React from 'react';
import Particle from '../Particle/Particle'
import posed from 'react-pose';
import particleTypeSettings from '../../ParticleTypeSettings';
import { easing, tween, styler } from 'popmotion';


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

  class ParticleEngine extends React.Component {
    state = { particleArray: [], isVisible: true };

    componentDidMount() {

      const me = this;

      var myFunction = function() {
        const {volume, width, intensity, particleType, paused, height=500, heightOffset=100 } = me.props;

          let particleArray= me.state.particleArray || []
          const startX = generateRandomNumberInRange(width)  


          if (!paused) {
          const newParticle = {
              x: startX,
              key: `particle-${Math.random()}-${Math.random()}`,
              color: getRandomColor(particleType),
              height: getRandomHeight(particleType),
              image: getRandomImage(particleType),
              ref: React.createRef(),
              tween: null
          }
          particleArray.push(newParticle)
        }
        particleArray.forEach((particle, index) => {
          if (particle.ref.current && !particle.tween) {
            particleArray[index].tween = 
            tween({
              from: {
                x: startX,
                y: -heightOffset,
                rotate: 0,
                rotateY: 0,
                originX: 20-generateRandomNumberInRange(intensity),
                originY: 20-generateRandomNumberInRange(intensity),
                opacity: 1,
              },
              to: {
                x: startX,
                y: height + heightOffset,
                rotate: getRandomRotation(particleType, intensity),
                rotateY: getRandomRotation(particleType, intensity),
                originX: 20-generateRandomNumberInRange(intensity),
                originY: 20-generateRandomNumberInRange(intensity),
                opacity: 1,
              },
              duration: height * intensity * 3,
            }

            )
            .while(v => v.y < height)
            .start({
              update: styler(particle.ref.current).set,
              complete: ()=>particleArray.splice(particleArray.indexOf(particle),1),
            })
          }
        }, particleArray) 

          me.setState({particleArray: particleArray})
          const timer = Math.floor(((intensity +1)/volume)*200);
          setTimeout(myFunction, timer);
      }
      setTimeout(myFunction, Math.floor(((me.props.intensity +1)/me.props.volume)*200));
    }

    componentDidUpdate(prevProps) {
      const {particleArray = []} = this.state;
      const {paused} = this.props;
        particleArray.forEach((particle) => {
          if(particle.tween) {
          if (paused)
            particle.tween.pause();
          else
            particle.tween.resume();
          }
        })
      

    }

    render() {
        const { particleType } = this.props;
        const { particleArray } = this.state;
        return particleArray.map((v,i) =>
         v ? 
        (
          <div 
          key={v.key}
          style={{position: 'absolute', y: -50, x: v.x, opacity: 0}} 
          ref={v.ref}>

          <Particle
            
            particleType={particleType}
            color={v.color}
            height={v.height}
            image={v.image}
          />
          </div>
        ) 
        : null )

    }
  }

export default ParticleEngine;