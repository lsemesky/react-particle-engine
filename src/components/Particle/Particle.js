import React, {memo} from 'react';
import { Leaf1, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7, Leaf8, Leaf9, Leaf10, Leaf11, Leaf12, Leaf13, Leaf14, Leaf15, Leaf16 } from '../../svg/leaves'

const particleTypeSettings = {
    LEAF: {
        colorList: ['Goldenrod', 'DarkGoldenrod', 'Peru', 'Chocolate', 'SaddleBrown', 'Sienna', 'Brown', 'Maroon', 'Olive', 'Darkred', 'Firebrick', 'Gold'],
        imageList: [Leaf1, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7, Leaf8, Leaf9, Leaf10, Leaf11, Leaf12, Leaf13, Leaf14, Leaf15, Leaf16],
        sizeRange: {
            ratio: 1,
            minHeight: 20,
            maxHeight: 35,
        },
        rotation: {
            min: 0,
            max: 365
        }
    },
    DEFAULT: {
        colorList: ['Black'],
        imageList: [Leaf4],
        sizeRange: {
            ratio: 1,
            minHeight: 10,
            maxHeight: 15,
        },
        rotation: {
            min: 0,
            max: 0,
        }
    }
}

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

const getRandomAngle = (particleType) => {
    const {min, max} = getParticleTypeSetting(particleType, 'rotation')
    return Math.floor(Math.random() * (max - min ) + min);
}

const getRandomHeight = (particleType) => {
    const {minHeight, maxHeight} = getParticleTypeSetting(particleType, 'sizeRange')
    return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

}

const Particle = ({particleType, position={}}) => {

    const style = {
        fill: getRandomColor(particleType),
        position: 'absolute',
        height: `${getRandomHeight(particleType)}px`,
        top: position.y || 0,
        left: position.x || 0,
        index: position.z || 1,
        transform: `rotate(${getRandomAngle(particleType)}deg)`

    }
    const Image = getRandomImage(particleType);
    return <Image style={style} />
}

 
export default memo(Particle);