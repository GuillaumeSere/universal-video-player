import { PlayerOptions, SubtitleTrack, QualityLevel } from "../types"
import { loadHLS } from "../adapters/hls"
import { loadDASH } from "../adapters/dash"
import { loadNative } from "../adapters/native"

// Déclaration de type pour Hls.js
declare global {
    interface Window {
        Hls: any
    }
}

export class VideoPlayer {
    private video!: HTMLVideoElement
    private container!: HTMLElement
    private customControls?: HTMLElement
    private subtitleTracks: TextTrack[] = []
    private hlsInstance?: any
    private qualityLevels: QualityLevel[] = []
    private currentQualityIndex = -1

    constructor(private options: PlayerOptions) { }

    mount(selector: string) {
        const container = document.querySelector(selector)

        if (!container) {
            throw new Error("Container not found")
        }

        this.container = container as HTMLElement
        this.setupVideoElement()
        this.setupEventListeners()
        this.loadSource(this.options.src)

        if (this.options.subtitles) {
            this.loadSubtitles()
        }

        if (this.options.customControls) {
            this.createCustomControls()
        }

        if (this.options.autoplay) {
            this.video.play()
        }
    }

    private setupVideoElement() {
        this.video = document.createElement("video")
        this.video.controls = !this.options.customControls && (this.options.controls ?? true)
        this.video.style.width = "100%"
        this.video.style.height = "100%"
        this.video.style.objectFit = "contain"

        this.container.appendChild(this.video)
    }

    private setupEventListeners() {
        this.video.addEventListener("play", () => {
            this.options.onPlay?.()
        })

        this.video.addEventListener("pause", () => {
            this.options.onPause?.()
        })

        this.video.addEventListener("timeupdate", () => {
            this.options.onTimeUpdate?.(this.video.currentTime)
        })

        this.video.addEventListener("loadeddata", () => {
            this.options.onLoadedData?.()
        })

        this.video.addEventListener("error", (e) => {
            this.options.onError?.(new Error("Video loading error"))
        })

        // Fullscreen events
        document.addEventListener("fullscreenchange", () => {
            this.updateFullscreenButton()
        })
    }

    private async loadSource(src: string) {
        try {
            if (src.endsWith(".m3u8")) {
                this.hlsInstance = await loadHLS(this.video, src)
                this.setupHLSQualitySelector()
            } else if (src.endsWith(".mpd")) {
                await loadDASH(this.video, src)
            } else {
                loadNative(this.video, src)
            }
        } catch (error) {
            this.options.onError?.(error as Error)
        }
    }

    private loadSubtitles() {
        if (!this.options.subtitles) return

        this.options.subtitles.forEach((track, index) => {
            const trackElement = document.createElement("track")
            trackElement.src = track.src
            trackElement.label = track.label
            trackElement.srclang = track.language
            trackElement.kind = "subtitles"
            if (track.default) {
                trackElement.default = true
            }

            this.video.appendChild(trackElement)
            this.subtitleTracks.push(trackElement.track)
        })
    }

    private createCustomControls() {
        this.customControls = document.createElement("div")
        this.customControls.className = "custom-controls"

        // Play/Pause button
        const playPauseBtn = this.createButton("▶️", () => this.togglePlayPause())
        playPauseBtn.id = "play-pause-btn"

        // Progress bar
        const progressContainer = document.createElement("div")
        progressContainer.className = "progress-container"
        const progressBar = document.createElement("div")
        progressBar.className = "progress-bar"
        progressContainer.appendChild(progressBar)

        progressContainer.addEventListener("click", (e) => {
            const rect = progressContainer.getBoundingClientRect()
            const percent = (e.clientX - rect.left) / rect.width
            this.video.currentTime = percent * this.video.duration
        })

        // Time display
        const timeDisplay = document.createElement("span")
        timeDisplay.className = "time-display"
        timeDisplay.textContent = "0:00 / 0:00"

        // Quality selector (for HLS)
        const qualitySelector = document.createElement("select")
        qualitySelector.className = "quality-selector"
        qualitySelector.innerHTML = '<option value="-1">Auto</option>'
        qualitySelector.addEventListener("change", (e) => {
            this.setQuality(parseInt((e.target as HTMLSelectElement).value))
        })

        // Fullscreen button
        const fullscreenBtn = this.createButton("⛶", () => this.toggleFullscreen())

        // Subtitle selector
        const subtitleSelector = document.createElement("select")
        subtitleSelector.className = "subtitle-selector"
        subtitleSelector.innerHTML = '<option value="-1">Sous-titres</option>'
        this.options.subtitles?.forEach((track, index) => {
            const option = document.createElement("option")
            option.value = index.toString()
            option.textContent = track.label
            subtitleSelector.appendChild(option)
        })
        subtitleSelector.addEventListener("change", (e) => {
            this.setSubtitleTrack(parseInt((e.target as HTMLSelectElement).value))
        })

        this.customControls.appendChild(playPauseBtn)
        this.customControls.appendChild(progressContainer)
        this.customControls.appendChild(timeDisplay)
        if (this.qualityLevels.length > 0) {
            this.customControls.appendChild(qualitySelector)
        }
        this.customControls.appendChild(subtitleSelector)
        this.customControls.appendChild(fullscreenBtn)

        this.container.classList.add("player-container")
        this.container.appendChild(this.customControls)

        // Update progress and time
        this.video.addEventListener("timeupdate", () => {
            const percent = (this.video.currentTime / this.video.duration) * 100
            progressBar.style.width = `${percent}%`
            timeDisplay.textContent = `${this.formatTime(this.video.currentTime)} / ${this.formatTime(this.video.duration)}`
        })

        // Update play/pause button
        this.video.addEventListener("play", () => {
            playPauseBtn.textContent = "⏸️"
        })
        this.video.addEventListener("pause", () => {
            playPauseBtn.textContent = "▶️"
        })
    }

    private createButton(text: string, onClick: () => void): HTMLButtonElement {
        const button = document.createElement("button")
        button.textContent = text
        button.addEventListener("click", onClick)
        return button
    }

    private setupHLSQualitySelector() {
        if (!this.hlsInstance) return

        this.hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
            this.qualityLevels = this.hlsInstance.levels.map((level: any, index: number) => ({
                height: level.height,
                width: level.width,
                bitrate: level.bitrate,
                label: `${level.height}p`
            }))

            // Update quality selector if custom controls exist
            const qualitySelector = this.customControls?.querySelector("select") as HTMLSelectElement
            if (qualitySelector) {
                qualitySelector.innerHTML = '<option value="-1">Auto</option>'
                this.qualityLevels.forEach((level, index) => {
                    const option = document.createElement("option")
                    option.value = index.toString()
                    option.textContent = level.label
                    qualitySelector.appendChild(option)
                })
            }
        })
    }

    private togglePlayPause() {
        if (this.video.paused) {
            this.play()
        } else {
            this.pause()
        }
    }

    private toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.container.requestFullscreen?.()
        } else {
            document.exitFullscreen?.()
        }
    }

    private updateFullscreenButton() {
        const fullscreenBtn = this.customControls?.querySelector("button:last-child")
        if (fullscreenBtn) {
            fullscreenBtn.textContent = document.fullscreenElement ? "⛶" : "⛶"
        }
    }

    private setQuality(index: number) {
        if (!this.hlsInstance) return
        this.hlsInstance.currentLevel = index
        this.currentQualityIndex = index
    }

    private setSubtitleTrack(index: number) {
        this.subtitleTracks.forEach((track, i) => {
            track.mode = i === index ? "showing" : "hidden"
        })
    }

    private formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    play() {
        this.video.play()
    }

    pause() {
        this.video.pause()
    }

    setVolume(volume: number) {
        this.video.volume = Math.max(0, Math.min(1, volume))
    }

    getCurrentTime(): number {
        return this.video.currentTime
    }

    setCurrentTime(time: number) {
        this.video.currentTime = time
    }

    getDuration(): number {
        return this.video.duration
    }

    getVolume(): number {
        return this.video.volume
    }

    destroy() {
        if (this.hlsInstance) {
            this.hlsInstance.destroy()
        }
        this.video.remove()
        if (this.customControls) {
            this.customControls.remove()
        }
    }
}