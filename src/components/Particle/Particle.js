import React, {memo} from 'react';
import {Leaf1} from '../../svg/leaves'

const Particle = ({color='black', height='100', image=Leaf1}) => {
    const style = {
        fill: color,
        height: `${height}px`,
        index: 1,
    }
    const Image = image;
    return <Image style={style} />
}

 
export default memo(Particle);