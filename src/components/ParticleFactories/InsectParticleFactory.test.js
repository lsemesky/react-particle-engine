import InsectParticleFactory from './InsectParticleFactory'

const viewerSettings = { height: 100, width: 200, xOffset: 0, yOffset: 10 }
const particleFactory = new InsectParticleFactory(viewerSettings)
describe('generateParticle(props)', () => {
  it('generates a particle without errors', () => {
    particleFactory.generateParticle({ intensity: 5 })
  })
})

describe('insertRotationFrames(frames)', () => {
  it('returns an empty array when given an empty array', () => {
    const frames = particleFactory.insertRotationFrames([])
    expect(frames).toHaveLength(0)
  })

  it('returns original array when given an array of 1', () => {
    const expectedFrames = [{ x: 0, y: 100 }]
    const frames = particleFactory.insertRotationFrames(expectedFrames)
    expect(frames).toHaveLength(1)
    expect(frames).toEqual(expectedFrames)
  })

  it('inserts one rotation frame when given an array of length 2', () => {
    const inputFrames = [{ x: 0, y: 0, rotate: 0 }, { x: 100, y: 100, rotate: 0 }]
    const expectedFrames = [
      { x: 0, y: 0, rotate: 0 },
      { x: 0, y: 0, rotate: 45 },
      { x: 100, y: 100, rotate: 45 }
    ]
    const frames = particleFactory.insertRotationFrames(inputFrames)
    expect(frames).toHaveLength(3)
    expect(frames).toEqual(expectedFrames)
  })
})