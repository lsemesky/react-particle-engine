import InsectParticleFactory from './InsectParticleFactory'
import LeafParticleFactory from './LeafParticleFactory'
import ParticleFactory from './ParticleFactory'

class ParticleFactoryFactory {
  constructor() {
    this.factories = {}
  }
  //Factories are singletons
  getParticleFactory(particleType, viewerSettings) {
    let factory = this.factories[particleType]
    if (!factory) {
      factory = createParticleFactory(particleType, viewerSettings)
      this.factories[particleType] = factory
    }
    return factory
  }
}
const createParticleFactory = (particleType, viewerSettings) => {
  switch (particleType) {
    case 'INSECT': return new InsectParticleFactory(viewerSettings)
    case 'LEAF': return new LeafParticleFactory(viewerSettings)
    default: return new ParticleFactory(viewerSettings, {})
  }
}
export default ParticleFactoryFactory