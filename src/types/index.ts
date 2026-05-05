export type PlayerOptions = {
  src: string
  autoplay?: boolean
  controls?: boolean
  subtitles?: SubtitleTrack[]
  enableFullscreen?: boolean
  customControls?: boolean
  onPlay?: () => void
  onPause?: () => void
  onTimeUpdate?: (currentTime: number) => void
  onLoadedData?: () => void
  onError?: (error: Error) => void
}

export type SubtitleTrack = {
  src: string
  label: string
  language: string
  default?: boolean
}

export type QualityLevel = {
  height: number
  width: number
  bitrate: number
  label: string
}