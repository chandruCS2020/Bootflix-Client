import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";


// materil ui icon
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseIcon from '@mui/icons-material/Pause';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ReplayIcon from '@mui/icons-material/Replay';
const useStyles = makeStyles((theme) => ({
controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
},


controlIcons: {
    color: "#777",

    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
    color: "#fff",
    transform: "scale(1)",
    },
},

bottomIcons: {
    color: "#999",
    "&:hover": {
    color: "#fff",
    },
    fontSize:40,
    "@media (max-width: 600px)": {
        fontSize:20,
    }
},

volumeSlider: {
    width: 100,
    padding:0,
    "@media (max-width: 600px)": {
        width:50,
        padding:0,
    }
},

}));

const PrettoSlider = withStyles({
root: {
    height: 0,
},
thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
    boxShadow: "inherit",
    },
},
active: {},
valueLabel: {
    left: "calc(-50% + 10px)",
},
track: {
    height: 8,
    borderRadius: 4,
},
rail: {
    height: 8,
    borderRadius: 4,
},
})(Slider);

function ValueLabelComponent(props) {
const { children, open, value } = props;

return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
    {children}
    </Tooltip>
);
}

const Controls = forwardRef(
(
    {
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    onDuration,
    onRewind,
    onPlayPause,
    onFastForward,
    playing,
    played,
    elapsedTime,
    totalDuration,
    onMute,
    muted,
    onVolumeSeekDown,
    onChangeDispayFormat,
    playbackRate,
    onPlaybackRateChange,
    onToggleFullScreen,
    volume,
    onVolumeChange,
    onBookmark,
    },
    ref
) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const [toggle, settoggle] = useState(false);
    const handletoggle = ()=>{
        settoggle(!toggle);
    }
    // if(elapsedTime===totalDuration){
    //     setreplay(true)
    // }else{
    //     setreplay(false)
    // }
    return (
    <div ref={ref} className={classes.controlsWrapper}>
        <Grid
        container
        direction="column"
        justifyContent="space-between"
        style={{ flexGrow: 1 }}
        >
        <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: 16 }}
        >
            <Grid item>
            <Typography variant="h5" style={{ color: "#fff" }}>
                Paiyaa
            </Typography>
            </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" justifyContent="center">
            {elapsedTime===totalDuration ?<> <ReplayIcon onClick={onPlayPause} fontSize="large" style={{color:'#fff',cursor:'pointer'}} /></> 
                :
                <><Button
                            onClick={onRewind}
                            className={classes.controlIcons}
                            aria-label="rewind"
                        >
                            <Replay10Icon
                                className={classes.controlIcons}
                                fontSize="inherit" />
                        </Button><Button
                            onClick={onPlayPause}
                            className={classes.controlIcons}
                            aria-label="play"
                        >
                                {playing ? (
                                    <PauseIcon fontSize="inherit" />
                                ) : (
                                    <PlayArrowRoundedIcon fontSize="inherit" />
                                )}
                            </Button><Button
                                onClick={onFastForward}
                                className={classes.controlIcons}
                                aria-label="forward"
                            >
                                <Forward10Icon fontSize="inherit" />
                            </Button></>
        
        
            }
        </Grid>
        {/* bottom controls */}
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ padding: 16 }}
        >
            <Grid item xs={12}>
            <PrettoSlider
                min={0}
                max={100}
                ValueLabelComponent={(props) => (
                <ValueLabelComponent {...props} value={elapsedTime} />
                )}
                aria-label="custom thumb label"
                value={played * 100}
                onChange={onSeek}
                onMouseDown={onSeekMouseDown}
                onChangeCommitted={onSeekMouseUp}
                // onDuration={onDuration}
                className="slider"
                style={{padding:16}}
            />
            </Grid>
            <div className="bottom_container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                <div className="bottom_container_left">
                <Button
                  onClick={onPlayPause}
                  className={classes.bottomIcons}
                >
                  { elapsedTime===totalDuration ? <ReplayIcon onClick={onPlayPause} fontSize="inherit"  style={{cursor:'pointer'}} /> : playing ? (
                    <PauseIcon fontSize="inherit" />
                  ) : (
                    <PlayArrowRoundedIcon fontSize="inherit" />
                  )}
                </Button>

                <Button
                  // onClick={() => setState({ ...state, muted: !state.muted })}
                  onClick={onMute}
                  className={`${classes.bottomIcons} ${classes.volumeButton}`}
                >
                  {muted ? (
                    <VolumeMute fontSize="inherit" />
                  ) : volume > 0.5 ? (
                    <VolumeUp fontSize="inherit" />
                  ) : (
                    <VolumeDown fontSize="inherit" />
                  )}
                </Button>

                <Slider
                  min={0}
                  max={100}
                  value={muted ? 0 : volume * 100}
                  onChange={onVolumeChange}
                  aria-labelledby="input-slider"
                  className={classes.volumeSlider}
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onVolumeSeekDown}
                />
                <Button
                  variant="text"
                  onClick={
                    onChangeDispayFormat
                    //     () =>
                    //   setTimeDisplayFormat(
                    //     timeDisplayFormat == "normal" ? "remaining" : "normal"
                    //   )
                  }
                >
                  <Typography
                    variant="body1"
                    style={{ color: "#fff", marginLeft: 16 }}
                  >
                    {elapsedTime}/{totalDuration}
                  </Typography>
                </Button>
                </div>
                <div className="bootom_container_right">
                <Button
                onClick={handleClick}
                aria-describedby={id}
                className={classes.bottomIcons}
                variant="text"
              >
                <Typography>{playbackRate}X</Typography>
              </Button>

              <Popover
                container={ref.current}
                open={open}
                id={id}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Grid container direction="column-reverse">
                  {[0.5, 1, 1.5, 2].map((rate) => (
                    <Button
                      key={rate}
                      //   onClick={() => setState({ ...state, playbackRate: rate })}
                      onClick={() => onPlaybackRateChange(rate)}
                      variant="text"
                    >
                      <Typography
                        color={rate === playbackRate ? "secondary" : "inherit"}
                      >
                        {rate}X
                      </Typography>
                    </Button>
                  ))}
                </Grid>
              </Popover>
              <Button
                onClick={()=>{onToggleFullScreen();handletoggle()}}
                className={classes.bottomIcons}
              >
                {toggle ?  <CloseFullscreenIcon fontSize="inherit" /> :<OpenInFullIcon fontSize="inherit" /> }
              </Button>
                </div>
            </div>

        </Grid>
        </Grid>
    </div>
    );
}
);

Controls.propTypes = {
onSeek: PropTypes.func,
onSeekMouseDown: PropTypes.func,
onSeekMouseUp: PropTypes.func,
onDuration: PropTypes.func,
onRewind: PropTypes.func,
onPlayPause: PropTypes.func,
onFastForward: PropTypes.func,
onVolumeSeekDown: PropTypes.func,
onChangeDispayFormat: PropTypes.func,
onPlaybackRateChange: PropTypes.func,
onToggleFullScreen: PropTypes.func,
onMute: PropTypes.func,
playing: PropTypes.bool,
played: PropTypes.number,
elapsedTime: PropTypes.string,
totalDuration: PropTypes.string,
muted: PropTypes.bool,
playbackRate: PropTypes.number,
};
export default Controls;
