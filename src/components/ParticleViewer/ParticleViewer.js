import React, {useState} from 'react';
import Slider from '@material-ui/lab/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ParticleEngine from '../ParticleEngine/ParticleEngine';
const DEFAULT_INTENSITY = 10
const DEFAULT_VOLUME = 50
const DEFAULT_PARTICLE_TYPE = "LEAF"
const DEFAULT_PAUSED_STATUS = false

const styles = {
    root: {
      width: '30%',
    },
    slider: {
      padding: '22px 0px',
    },
  };

const ParticleViewer = ({classes}) => {
    const[ intensity, setIntensity ] = useState(DEFAULT_INTENSITY)
    const[ volume, setVolume ] = useState(DEFAULT_VOLUME)
    const[ paused, setPaused ] = useState(DEFAULT_PAUSED_STATUS)

    const[ particleType, setParticleType ] = useState(DEFAULT_PARTICLE_TYPE)
    const intensityId="intensity-slider"
    const volumeId="volume-slider"
    const particleTypeId="particle-type-slider"
    return <div className={classes.root}>
        <Typography id={intensityId}>Intensity: {intensity}</Typography>
        <Slider
        id={intensityId}
        classes={{ container: classes.slider }}
        value={intensity}
        min={0}
        max={20}
        step={4}
        aria-labelledby={intensityId}
        onChange={(event, value) => setIntensity(value)}
        />
        <Typography id={volumeId}>Volume: {volume}</Typography>
        <Slider
        id={volumeId}
        classes={{ container: classes.slider }}
        value={volume}
        min={10}
        max={150}
        step={10}
        aria-labelledby={volumeId}
        onChange={(event, value) => setVolume(value)}
        />
        <FormGroup >
        <FormControlLabel
          control={
            <Switch
              checked={paused}
              onChange={event => setPaused(event.target.checked)}
              value={paused}
            />
          }
          label={paused ? 'Unpause' : 'Pause'}
        />
        </FormGroup>
        <ParticleEngine
            intensity={25-intensity}
            volume={volume}
            paused={paused}
            particleType={particleType}
            width={200}
        />
    </div>

}

 
export default withStyles(styles)(ParticleViewer);