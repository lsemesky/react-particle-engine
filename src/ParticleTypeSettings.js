
import { Leaf1, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7, Leaf8, Leaf9, Leaf10, Leaf11, Leaf12, Leaf13, Leaf14, Leaf15, Leaf16 } from './svg/leaves'
import { Insect1, //Insect2, Insect3, Insect4, Insect5, Insect6, Insect7, Insect8, Insect9, Insect10, Insect11, Insect12, Insect13, Insect14, Insect15, Insect16 
} from './svg/insects'


const ParticleTypeSettings = {
    LEAF: {
        colorList: ['Goldenrod', 'DarkGoldenrod', 'Peru', 'Chocolate', 'SaddleBrown', 'Sienna', 'Brown', 'Maroon', 'Olive', 'Darkred', 'Firebrick', 'Gold'],
        imageList: [Leaf1, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7, Leaf8, Leaf9, Leaf10, Leaf11, Leaf12, Leaf13, Leaf14, Leaf15, Leaf16],
        sizeRange: {
            ratio: 1,
            minHeight: 20,
            maxHeight: 35,
        },
        rotation: {
            calculateMin: (intensity)=>500-intensity*4,
            calculateMax: (intensity)=>-500+intensity*4,
        },
        yRotation: {
            calculateMin: (intensity)=>500-intensity*4,
            calculateMax: (intensity)=>-500+intensity*4,
        },
        flip: 0
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
            calculateMin: (intensity)=>0,
            calculateMax: (intensity)=>0,
        },
        yRotation: {
            calculateMin: (intensity)=>0,
            calculateMax: (intensity)=>0,
        },
        flip: 0
    },
    INSECT: {
        colorList: ['Black','Grey'],
        imageList: [Insect1],
        sizeRange: {
            ratio: 1,
            minHeight: 10,
            maxHeight: 15,
        },
        rotation: {
            calculateMin: (intensity)=>0,
            calculateMax: (intensity)=>0,
        },
        yRotation: {
            calculateMin: (intensity)=>0,
            calculateMax: (intensity)=>0,
        },
        flip: Infinity
    }
}
export default ParticleTypeSettings;