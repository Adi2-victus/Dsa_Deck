// import { useState, useRef, useEffect } from 'react';
// import { Pause, Play } from 'lucide-react';



// const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {


//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);

//   // Format seconds to MM:SS
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   // Update current time during playback
//   useEffect(() => {
//     const video = videoRef.current;
    
//     const handleTimeUpdate = () => {
//       if (video) setCurrentTime(video.currentTime);
//     };
    
//     if (video) {
//       video.addEventListener('timeupdate', handleTimeUpdate);
//       return () => video.removeEventListener('timeupdate', handleTimeUpdate);
//     }
//   }, []);

//   return (
//     <div 
//       className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg"
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       {/* Video Element */}
//       <video
//         ref={videoRef}
//         src={secureUrl}
//         poster={thumbnailUrl}
//         onClick={togglePlayPause}
//         className="w-full aspect-video bg-black cursor-pointer"
//       />
      
//       {/* Video Controls Overlay */}
//       <div 
//         className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity ${
//           isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
//         }`}
//       >
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlayPause}
//           className="btn btn-circle btn-primary mr-3"
//           aria-label={isPlaying ? "Pause" : "Play"}
//         >
//           {isPlaying ? (
//             <Pause/>
//           ) : (
//             <Play/>
//           )}
//         </button>
        
//         {/* Progress Bar */}
//         <div className="flex items-center w-full mt-2">
//           <span className="text-white text-sm mr-2">
//             {formatTime(currentTime)}
//           </span>
//           <input
//             type="range"
//             min="0"
//             max={duration}
//             value={currentTime}
//             onChange={(e) => {
//               if (videoRef.current) {
//                 videoRef.current.currentTime = Number(e.target.value);
//               }
//             }}
//             className="range range-primary range-xs flex-1"
//           />
//           <span className="text-white text-sm ml-2">
//             {formatTime(duration)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default Editorial;





import { useState, useRef, useEffect } from 'react';
import { Pause, Play, Volume2, VolumeX, Maximize2, Minimize2, Monitor, Fullscreen } from 'lucide-react';

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    
    setPlaybackRate(newRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = newRate;
    }
  };

  // Update current time during playback
  useEffect(() => {
    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      if (video) setCurrentTime(video.currentTime);
    };
    
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.volume = volume;
      
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [volume]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current) return;
      
      switch (e.key) {
        case ' ':
          togglePlayPause();
          break;
        case 'ArrowRight':
          if (videoRef.current) {
            videoRef.current.currentTime += 5;
          }
          break;
        case 'ArrowLeft':
          if (videoRef.current) {
            videoRef.current.currentTime -= 5;
          }
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'm':
          toggleMute();
          break;
        case 'ArrowUp':
          setVolume(prev => Math.min(1, prev + 0.1));
          break;
        case 'ArrowDown':
          setVolume(prev => Math.max(0, prev - 0.1));
          break;
        case '>':
        case '.':
          changePlaybackRate();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, volume, playbackRate]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-hide controls
  useEffect(() => {
    let timeoutId;
    
    const resetTimeout = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };
    
    resetTimeout();
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', resetTimeout);
      return () => {
        container.removeEventListener('mousemove', resetTimeout);
        clearTimeout(timeoutId);
      };
    }
  }, [isPlaying]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto rounded-box overflow-hidden shadow-xl bg-base-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        onClick={togglePlayPause}
        className="w-full aspect-video bg-black cursor-pointer"
      />
      
      {/* Play/Pause overlay button */}
      {!isPlaying && (
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 m-auto btn btn-circle btn-primary btn-lg w-20 h-20 bg-opacity-30 backdrop-blur-sm"
          aria-label="Play"
        >
          <Play size={48} className="ml-1" />
        </button>
      )}
      
      {/* Video Controls Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-all duration-300 ${
          showControls || isHovering || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Progress Bar */}
        <div className="flex items-center w-full mb-3">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = Number(e.target.value);
              }
            }}
            className="range range-primary range-xs flex-1"
          />
          <span className="text-white text-sm font-mono min-w-[90px] text-right ml-2">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        
        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="btn btn-circle btn-ghost text-white hover:bg-white/20"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            {/* Volume Control */}
            <div className="flex items-center group">
              <button
                onClick={toggleMute}
                className="btn btn-circle btn-ghost text-white hover:bg-white/20"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="range range-primary range-xs w-24 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
            </div>
            
            {/* Playback Rate */}
            <button
              onClick={changePlaybackRate}
              className="btn btn-ghost text-white hover:bg-white/20"
            >
              <span className="text-sm font-medium">{playbackRate}x</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Current Time */}
            <div className="hidden md:flex items-center bg-black/30 px-3 py-1 rounded-full">
              <Monitor size={16} className="mr-2 text-primary" />
              <span className="text-white text-sm font-mono">{formatTime(currentTime)}</span>
            </div>
            
            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="btn btn-circle btn-ghost text-white hover:bg-white/20"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Top Right Info */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
        <Fullscreen size={16} className="text-primary mr-2" />
        <span className="text-white text-sm">Press F for fullscreen</span>
      </div>
    </div>
  );
};

export default Editorial;