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

## ⚙️ Options

```ts id="7caxrq"
const player = new VideoPlayer({
  src: "video.mp4",
  autoplay: true,
  controls: true
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

### `destroy()`

Remove the player.

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

MIT © Guillaume Tech

---

## ⭐ Support

If you find this project useful, consider giving it a star on GitHub.
