"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { IoPlay } from "react-icons/io5";
import { FaPause } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";

interface MusicCardProps {
  videoId?: string;
  coverUrl?: string; // Standardize to match SpotifyCard style
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function MusicCard({ 
  videoId = "P4UnrmPFPA4",
  coverUrl = "https://i.scdn.co/image/ab67616d0000b273db74fef7756d57f0cdd9b167"
}: MusicCardProps) {
  const [title, setTitle] = useState("Loading...");
  const [artist, setArtist] = useState("Loading...");
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 🎵 Fetch Title + Artist
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setArtist(data.author_name);
      })
      .catch(err => {
        console.error("Failed to fetch youtube metadata:", err);
        setTitle("Unknown Title");
        setArtist("Unknown Artist");
      });

    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    };

    let playerInstance: any = null;

    const initPlayer = () => {
      if (playerInstance || !window.YT?.Player) return;
      
      try {
        playerInstance = new window.YT.Player('yt-player-iframe', {
          events: {
            'onReady': () => {
              setIsReady(true);
            },
            'onStateChange': (event: any) => {
              setIsPlaying(event.data === 1);
            },
            'onError': (e: any) => {
              console.error("YT Player Error:", e);
              setIsReady(false);
            }
          }
        });
        playerRef.current = playerInstance;
      } catch (err) {
        console.error("Failed to init YT player:", err);
      }
    };

    loadYouTubeAPI();

    const checkInterval = setInterval(() => {
      if (window.YT && window.YT.Player && document.getElementById('yt-player-iframe')) {
        initPlayer();
        clearInterval(checkInterval);
      }
    }, 200);

    return () => {
      clearInterval(checkInterval);
      if (playerInstance && playerInstance.destroy) {
        playerInstance.destroy();
      }
      setIsReady(false);
    };
  }, [videoId]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player || !isReady || typeof player.playVideo !== 'function') return;
    
    try {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    } catch (err) {
      console.error("Failed to control YT player:", err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 md:px-0">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative flex items-center gap-2 md:gap-3 bg-[#121212] border border-white/5 p-1.5 md:p-2 rounded-[1.5rem] shadow-xl hover:bg-[#181818] transition-all duration-300 pointer-events-auto"
      >
        <div className="relative z-10 flex w-full items-center gap-2 md:gap-3">
          {/* Cover Art */}
          <div className="relative h-12 w-12 md:h-14 md:w-14 overflow-hidden rounded-xl shadow-lg shrink-0">
            <Image
              src={coverUrl}
              alt="Song Cover"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 48px, 56px"
              priority
            />
            {/* Playing Animation Overlay */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5"
                >
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ["20%", "60%", "20%"] }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: Infinity, 
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                      className="w-0.5 bg-green-500 rounded-full"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 py-0.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Image 
                src="/assets/spotify.svg" 
                alt="Spotify" 
                width={12} 
                height={12} 
                className={isPlaying ? "animate-spin [animation-duration:3s]" : ""}
              />
              <p className="text-[9px] md:text-[10px] font-medium text-gray-400 capitalize">
                {isPlaying ? "listening to" : "last played"}
              </p>
            </div>
            <h3 className="text-[12px] md:text-sm font-bold truncate text-white leading-tight">
              {title}
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400 truncate font-normal">
              by {artist}
            </p>
          </div>

          {/* Play Button */}
          <div className="shrink-0 pr-0.5">
            <button
              onClick={togglePlay}
              disabled={!isReady}
              className={`flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full transition-all duration-200 ${
                isPlaying 
                ? "bg-green-500 text-black hover:scale-105" 
                : "bg-[#282828] text-white hover:bg-[#3e3e3e] hover:scale-105 active:scale-95"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? (
                <FaPause size={12} className="fill-current" />
              ) : (
                <IoPlay size={16} className="ml-0.5 fill-current" />
              )}
            </button>
          </div>
        </div>

        {/* Hidden YT Player */}
        <div className="absolute w-0 h-0 overflow-hidden pointer-events-none opacity-0" aria-hidden="true">
          <iframe
            id="yt-player-iframe"
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=0&rel=0&start=56`}
            frameBorder="0"
            allow="autoplay"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
}
