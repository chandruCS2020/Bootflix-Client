import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { makeStyles} from "@material-ui/core/styles";
import Controls from '../PlayerControl/Controls';
import screenful from 'screenfull';
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Subscribe from "../Subscribe/Subscribe";
import { MovieContext } from "../../context/movieContext/MovieContext";

const useStyles = makeStyles((theme) => ({
    playerWrapper: {
        position: 'relative',
        display: 'flex',
        width: 'auto',
        height: '100vh',
        overflow: 'hidden',
    },
    // reactPlayer:{
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    // },
    controlsWrapper: {
        visibility: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    topControls: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(2),
    },
    middleControls: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    bottomWrapper: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2),
    },
    bottomControls: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        margin: theme.spacing(1),
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
    },
    volumeSlider: {
        width: 100,
    },
}));
const format = (seconds) => {
    if (isNaN(seconds)) {
    return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
};

let count = 0;
export default function VideoPlayer() {
    const classes = useStyles();
    const {isUser} = useContext(AuthContext);
    const {isEligible} = useContext(MovieContext);
    const [showControls, setShowControls] = useState(false);
    // const [count, setCount] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
    const [bookmarks, setBookmarks] = useState([]);
    
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const details = location.pathname.split('/')[1];
    const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,

    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
    });

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlsRef = useRef(null);
    const canvasRef = useRef(null);
    const {
    playing,
    controls,
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
    } = state;

    const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
    };

    const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    };

    const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    };

    const handleProgress = (changeState) => {
    if (count > 3) {
        controlsRef.current.style.visibility = "hidden";
        count = 0;
    }
    if (controlsRef.current.style.visibility === "visible") {
        count += 1;
    }
    if (!state.seeking) {
        setState({ ...state, ...changeState });
    }
    };

    const handleSeekChange = (e, newValue) => {
    // console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
    };

    const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
    };

    const handleSeekMouseUp = (e, newValue) => {
    // console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
    };

    const handleDuration = (duration) => {
    setState({ ...state, duration });
    };

    const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
    };
    const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
        ...state,
        volume: parseFloat(newValue / 100),
        muted: newValue === 0 ? true : false,
    });
    };

    const toggleFullScreen = () => {
    screenful.toggle(playerContainerRef.current);
    };

    const handleMouseMove = () => {
    // console.log("mousemove");
    controlsRef.current.style.visibility = "visible";
    count = 0;
    };

    const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
    };

    const handleDisplayFormat = () => {
    setTimeDisplayFormat(
        timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
    };

    const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
    };

    const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
    };
    const currentTime =
    playerRef && playerRef.current
        ? playerRef.current.getCurrentTime()
        : "00:00";

    const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
    const elapsedTime =
    timeDisplayFormat === "normal"
        ? format(currentTime)
        : `-${format(duration - currentTime)}`;

    const totalDuration = format(duration);
    const history = useHistory();
    const [Time, setTime] = useState('');
    let search='';
    
    useEffect(() => {
        setTime(elapsedTime);
    }, [elapsedTime]);
    useEffect(() => {
        const data= document.getElementById('tsss');
        const dd=document.getElementById('dura');
        // var video = document.querySelector('video').duration;
        const video = document.getElementsByClassName('reactPlayer');
        console.log(video);
        history.listen((location)=>{
            // const datas={};
            // datas['movieId']=id;
            // datas['curTime']=data.value;
            // datas['totalTime']=dd.value;
            // console.log(datas);
            const sendData = async()=>{
                try{
                    const res = await axios.get(`https://apibootflix.herokuapp.com/addToHistory?movieId=${id}&&curTime=${data.value.toString()}&&totalTime=${dd.value.toString()}`,{withCredentials:true});
                    console.log(res);
                }catch(err){
                    console.log(err.message);
                }
            }
            sendData();
            console.log(dd.value);
        }) 
    }, []);
    console.log(location);
    if(localStorage.getItem('user')===null){
        history.push(`/login`)
    }
    useEffect(() => {
        if(location.time){
            console.log("first");
            playerRef.current.seekTo(location.time);
        }
    }, []);
    
    console.log(isEligible);
    return (
        <>
            {
                isEligible ?
                <Subscribe />
                :
                <>
                
                <input type="text" name="time" id="tsss" readOnly value={currentTime || ''} hidden/>
                <input type="text" name="total" id="dura" readOnly value={duration || ''} hidden/>
                <div
                onMouseMove={handleMouseMove}
                onMouseLeave={hanldeMouseLeave}
                ref={playerContainerRef}
                className={classes.playerWrapper}
                >
                <ReactPlayer
                    ref={playerRef}
                    width="100%"
                    height="100%"
                    url={`https://apibootflix.herokuapp.com/${details==='movie' ? `movie` : `trailer`}/`+id+`/watch`}
                    pip={pip}
                    playing={playing}
                    controls={false}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onProgress={handleProgress}
                    className='reactPlayer'
                    
                    
                />
                <Controls
                    ref={controlsRef}
                    onSeek={handleSeekChange}
                    onSeekMouseDown={handleSeekMouseDown}
                    onSeekMouseUp={handleSeekMouseUp}
                    onDuration={handleDuration}
                    onRewind={handleRewind}
                    onPlayPause={handlePlayPause}
                    onFastForward={handleFastForward}
                    playing={playing}
                    played={played}
                    elapsedTime={elapsedTime}
                    totalDuration={totalDuration}
                    onMute={hanldeMute}
                    muted={muted}
                    onVolumeChange={handleVolumeChange}
                    onVolumeSeekDown={handleVolumeSeekDown}
                    onChangeDispayFormat={handleDisplayFormat}
                    playbackRate={playbackRate}
                    onPlaybackRateChange={handlePlaybackRate}
                    onToggleFullScreen={toggleFullScreen}
                    volume={volume}
                    movieId={id}
                />
                </div>
        </>
            }
        </>
    )
}
