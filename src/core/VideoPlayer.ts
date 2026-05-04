import { PlayerOptions } from "../types"
import { loadHLS } from "../adapters/hls"
import { loadDASH } from "../adapters/dash"
import { loadNative } from "../adapters/native"

export class VideoPlayer {
    private video!: HTMLVideoElement

    constructor(private options: PlayerOptions) { }

    mount(selector: string) {
        const container = document.querySelector(selector)

        if (!container) {
            throw new Error("Container not found")
        }

        this.video = document.createElement("video")
        this.video.controls = this.options.controls ?? true

        container.appendChild(this.video)

        this.loadSource(this.options.src)

        if (this.options.autoplay) {
            this.video.play()
        }
    }

    private async loadSource(src: string) {
        if (src.endsWith(".m3u8")) {
            await loadHLS(this.video, src)
        } else if (src.endsWith(".mpd")) {
            await loadDASH(this.video, src)
        } else {
            loadNative(this.video, src)
        }
    }

    play() {
        this.video.play()
    }

    pause() {
        this.video.pause()
    }

    destroy() {
        this.video.remove()
    }
}