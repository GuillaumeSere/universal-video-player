# 🎬 universal-video-player

## 🔥 Lightweight HLS + DASH + MP4 Video Player for Web & Smart TVs

A lightweight, universal video player for the web.

Play **MP4, HLS (.m3u8), and DASH (.mpd)** videos seamlessly across:

* 💻 Desktop
* 📱 Mobile
* 📺 Smart TVs (browser-based)

---

![npm](https://img.shields.io/npm/v/universal-video-player)
![downloads](https://img.shields.io/npm/dm/universal-video-player)
![license](https://img.shields.io/npm/l/universal-video-player)

---

## ✨ Why universal-video-player?

Building a video player is harder than it should be.

Different formats require different solutions:

* MP4 → native HTML5
* HLS → special handling
* DASH → another library

👉 `universal-video-player` solves this with a **single simple API**.

---

## 🚀 Features

* 🎥 Multi-format support (MP4, HLS, DASH)
* 🔥 **NEW:** Subtitles support (WebVTT)
* 📺 **NEW:** Fullscreen mode
* 🎮 **NEW:** Custom controls with modern UX
* 💥 **NEW:** Quality selector for HLS streams
* 🎪 **NEW:** Event system (onPlay, onPause, onTimeUpdate, etc.)
* ⚡ Simple and clean API
* 📺 Compatible with Smart TVs (browser-based)
* 🧠 TypeScript support
* 📦 Lightweight and fast
* 🔌 Extensible architecture

---

## 📦 Installation

```bash id="b1b9m1"
npm install universal-video-player
```

---

## ⚡ Quick Start

```ts id="4qkb2g"
import { VideoPlayer } from "universal-video-player"

const player = new VideoPlayer({
  src: "https://www.w3schools.com/html/mov_bbb.mp4",
  autoplay: true
})

player.mount("#app")
```

---

## 🎬 HTML Setup

```html id="y1lj7n"
<div id="app"></div>
```

---

## 🔌 Supported Formats

| Format | Example | Support     |
| ------ | ------- | ----------- |
| MP4    | `.mp4`  | Native      |
| HLS    | `.m3u8` | via hls.js  |
| DASH   | `.mpd`  | via dash.js |

---

## ⚡ HLS Example

```ts id="n3yq4t"
const player = new VideoPlayer({
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  autoplay: true
})

player.mount("#app")
```

---

## ⚡ DASH Example

```ts id="k8pq1n"
const player = new VideoPlayer({
  src: "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd"
})

player.mount("#app")
```

---

## 🔥 Advanced Features

### 🎬 Subtitles (WebVTT)

```ts id="subtitles-example"
const player = new VideoPlayer({
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  subtitles: [
    {
      src: "./subtitles-fr.vtt",
      label: "Français",
      language: "fr",
      default: true
    },
    {
      src: "./subtitles-en.vtt",
      label: "English",
      language: "en"
    }
  ]
})

player.mount("#app")
```

### 📺 Fullscreen Mode

```ts id="fullscreen-example"
const player = new VideoPlayer({
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  enableFullscreen: true
})

player.mount("#app")
```

### 🎮 Custom Controls

```ts id="custom-controls-example"
const player = new VideoPlayer({
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  customControls: true, // Replaces native controls with custom UI
  controls: false       // Disable native controls
})

player.mount("#app")
```

### 💥 Quality Selector (HLS)

```ts id="quality-example"
const player = new VideoPlayer({
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  customControls: true // Quality selector appears in custom controls
})

player.mount("#app")
```

### 🎪 Event System

```ts id="events-example"
const player = new VideoPlayer({
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  onPlay: () => console.log("Video started playing"),
  onPause: () => console.log("Video paused"),
  onTimeUpdate: (currentTime) => console.log(`Current time: ${currentTime}s`),
  onLoadedData: () => console.log("Video loaded successfully"),
  onError: (error) => console.error("Video error:", error)
})

player.mount("#app")
```

---

## ⚙️ Options

```ts id="options-example"
const player = new VideoPlayer({
  src: "video.mp4",           // Video source URL
  autoplay: true,             // Auto-play on load
  controls: true,             // Show native controls
  customControls: false,      // Use custom controls UI
  enableFullscreen: false,    // Enable fullscreen button
  subtitles: [...],           // Array of subtitle tracks
  onPlay: () => {},           // Play event callback
  onPause: () => {},          // Pause event callback
  onTimeUpdate: (time) => {}, // Time update callback
  onLoadedData: () => {},     // Loaded data callback
  onError: (error) => {}      // Error callback
})
```

---

## 🎮 API

### `mount(selector: string)`

Attach the player to a DOM element.

### `play()`

Start playback.

### `pause()`

Pause playback.

### `setVolume(volume: number)`

Set audio volume (0.0 to 1.0).

### `getCurrentTime(): number`

Get current playback time in seconds.

### `setCurrentTime(time: number)`

Seek to specific time in seconds.

### `getDuration(): number`

Get video duration in seconds.

### `destroy()`

Remove the player and clean up resources.

---

## 🏗 Architecture

```text id="m7pl0k"
VideoPlayer
 ├── Native (MP4)
 ├── HLS (hls.js)
 └── DASH (dash.js)
```

---

## 📺 Smart TV Compatibility

Works on:

* Samsung Tizen (browser)
* LG WebOS (browser)
* Android TV (WebView)

👉 As long as a browser is available.

---

## 🔮 Roadmap

* Subtitles (VTT)
* Fullscreen API
* Custom UI (controls)
* Events (onPlay, onPause)
* Chromecast / AirPlay support
* Quality selector

---

## 🛠 Development

```bash id="6b6b6d"
npm install
npm run build
```

---

## 📄 License

MIT © Guillaume SERE

---

## ⭐ Support

If you find this project useful, consider giving it a star on GitHub.
