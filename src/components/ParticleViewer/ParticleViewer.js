import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import ParticleEngine from '../ParticleEngine/ParticleEngine'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
const DEFAULT_INTENSITY = 15
const DEFAULT_VOLUME = 20
const DEFAULT_PARTICLE_TYPE = 'LEAF'
const DEFAULT_PAUSED_STATUS = false
const VIEWER_WIDTH = 500
const VIEWER_HEIGHT = 500

const styles = {
  root: {
    width: '100%',
  },
}

const ParticleViewer = ({ classes }) => {
  const [intensity, setIntensity] = useState(DEFAULT_INTENSITY)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [paused, setPaused] = useState(DEFAULT_PAUSED_STATUS)
  const [particleType, setParticleType] = useState(DEFAULT_PARTICLE_TYPE)
  const intensityId = 'intensity-slider'
  const volumeId = 'volume-slider'

  return <div className={classes.root}>
    <Box display="flex" height="100%">
      <Box
        minWidth={VIEWER_WIDTH}
        minHeight={VIEWER_HEIGHT}
        margin={5}
        boxShadow={3}
        bgcolor="background.default"
      >
        <div style={{
          width: VIEWER_WIDTH,
          height: VIEWER_HEIGHT,
          clipPath: 'inset(0 0 0 0)',
        }}>
          <ParticleEngine
            intensity={25 - intensity}
            volume={volume}
            paused={paused}
            particleType={particleType}
            width={VIEWER_WIDTH}
            height={VIEWER_HEIGHT}
          />
        </div>
      </Box>
      <Box margin={5} padding={5} boxShadow={3} bgcolor="background.default">
        <Typography variant={'h1'}>Laura Semesky React Particle Viewer</Typography>
        <FormGroup>
          <FormControl>
            <InputLabel htmlFor="particleType">ParticleType</InputLabel>
            <Select
              value={particleType}
              onChange={(event) => setParticleType(event.target.value)}
              inputProps={{
                name: 'particleType',
                id: 'particleType',
              }}
            >
              <MenuItem value={'LEAF'}>Leaf</MenuItem>
              <MenuItem value={'INSECT'}>Insect</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Typography id={intensityId}>
            Animation Intensity
          </Typography>
          <Slider
            value={intensity}
            min={10}
            max={20}
            aria-labelledby={intensityId}
            onChange={(event, value) => setIntensity(value)}
          />
          <Typography id={volumeId}>
            Particle Density
          </Typography>
          <Slider
            value={volume}
            min={10}
            max={80}
            aria-labelledby={volumeId}
            onChange={(event, value) => setVolume(value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={paused}
                color="primary"
                onChange={(event, checked) => setPaused(checked)}
                value={paused}
              />
            }
            label={paused ? 'Unpause' : 'Pause'}
          />
        </FormGroup>
      </Box>
    </Box>
  </div>

}

ParticleViewer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ParticleViewer)