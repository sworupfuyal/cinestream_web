"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import ReviewSection from "../../_compoents/ReviewSection";

interface Movie {
    _id: string;
    title: string;
    description: string;
    duration: number;
    releaseYear: number;
    genres: string[];
    cast: string[];
    director: string;
    thumbnailUrl?: string;
    videoUrl?: string;
}

export default function MovieDetailClient({ movie }: { movie: Movie }) {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showPlayer, setShowPlayer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const thumbnailSrc = movie.thumbnailUrl?.startsWith('http')
        ? movie.thumbnailUrl
        : movie.thumbnailUrl
        ? `${API_BASE_URL}${movie.thumbnailUrl}`
        : null;

    const videoSrc = movie.videoUrl?.startsWith('http')
        ? movie.videoUrl
        : movie.videoUrl
        ? `${API_BASE_URL}${movie.videoUrl}`
        : null;

    const isHLS = videoSrc?.includes('.m3u8');

    useEffect(() => {
        if (!showPlayer || !videoSrc || !videoRef.current) return;

        const video = videoRef.current;
        setIsLoading(true);
        setError(null);

        if (isHLS) {
            import('hls.js').then(({ default: Hls }) => {
                if (Hls.isSupported()) {
                    const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
                    hls.loadSource(videoSrc);
                    hls.attachMedia(video);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        setIsLoading(false);
                        video.play().catch(console.error);
                    });
                    hls.on(Hls.Events.ERROR, (_, data) => {
                        if (data.fatal) {
                            setIsLoading(false);
                            setError('Failed to load stream. Please try again.');
                        }
                    });
                    return () => hls.destroy();
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = videoSrc;
                    video.addEventListener('loadedmetadata', () => {
                        setIsLoading(false);
                        video.play().catch(console.error);
                    });
                } else {
                    setIsLoading(false);
                    setError('HLS streaming is not supported in this browser.');
                }
            }).catch(() => {
                setIsLoading(false);
                setError('Failed to load video player.');
            });
        } else {
            video.src = videoSrc;
            video.addEventListener('loadedmetadata', () => setIsLoading(false));
            video.addEventListener('error', () => {
                setIsLoading(false);
                setError('Failed to load video.');
            });
            video.play().catch(console.error);
        }
    }, [showPlayer, videoSrc, isHLS]);

    const formatDuration = (minutes: number) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return h > 0 ? `${h}h ${m}m` : `${m}m`;
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            {/* ── Hero / Player ─────────────────────────────────────── */}
            <div className="relative w-full bg-black" style={{ aspectRatio: '16/9', maxHeight: '75vh' }}>
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 flex items-center gap-2 text-white/80 hover:text-white transition bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg z-20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <video
                    ref={videoRef}
                    controls
                    className={`w-full h-full object-contain bg-black ${showPlayer ? 'block' : 'hidden'}`}
                    playsInline
                />

                {showPlayer && isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-white/70 text-sm">Loading stream...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                        <div className="flex flex-col items-center gap-3 text-center px-4">
                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-white font-medium">{error}</p>
                            <button
                                onClick={() => { setError(null); setShowPlayer(false); }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {!showPlayer && (
                    <div className="absolute inset-0">
                        {thumbnailSrc ? (
                            <img src={thumbnailSrc} alt={movie.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                <svg className="w-32 h-32 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                </svg>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            {videoSrc ? (
                                <button onClick={() => setShowPlayer(true)} className="flex flex-col items-center gap-3 group">
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                                        {isHLS ? 'Play HLS Stream' : 'Play Movie'}
                                    </span>
                                </button>
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 rounded-full bg-slate-800/80 border-2 border-slate-600 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                    </div>
                                    <span className="text-slate-400 text-sm bg-black/50 px-3 py-1 rounded-full">No video available</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Movie Details ──────────────────────────────────────── */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                {/* Title Row */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{movie.title}</h1>
                        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {movie.releaseYear}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formatDuration(movie.duration)}
                            </span>
                            {isHLS && (
                                <>
                                    <span className="text-slate-600">•</span>
                                    <span className="px-2 py-0.5 bg-green-600/20 text-green-400 border border-green-600/30 text-xs rounded-full">HLS Stream</span>
                                </>
                            )}
                        </div>
                    </div>
                    {videoSrc && !showPlayer && (
                        <button
                            onClick={() => setShowPlayer(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shrink-0"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            Play Now
                        </button>
                    )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 text-sm rounded-full">
                            {genre}
                        </span>
                    ))}
                </div>

                {/* Synopsis */}
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-white">Synopsis</h2>
                    <p className="text-slate-400 leading-relaxed">{movie.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-slate-900 rounded-2xl border border-slate-800">
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Director</p>
                        <p className="text-white font-medium">{movie.director}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Release Year</p>
                        <p className="text-white font-medium">{movie.releaseYear}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Duration</p>
                        <p className="text-white font-medium">{formatDuration(movie.duration)}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Genres</p>
                        <p className="text-white font-medium">{movie.genres.join(', ')}</p>
                    </div>
                </div>

                {/* Cast */}
                {movie.cast && movie.cast.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white">Cast</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {movie.cast.map((actor, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                                    <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-400 font-semibold shrink-0">
                                        {actor[0]?.toUpperCase()}
                                    </div>
                                    <span className="text-sm text-slate-300 truncate">{actor}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Reviews ─────────────────────────────────────────── */}
                <div className="border-t border-slate-800 pt-8">
                    <ReviewSection movieId={movie._id} />
                </div>
            </div>
        </div>
    );
}