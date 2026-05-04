export async function loadHLS(video: HTMLVideoElement, src: string) {
  const Hls = (await import("hls.js")).default

  if (Hls.isSupported()) {
    const hls = new Hls()
    hls.loadSource(src)
    hls.attachMedia(video)
  } else {
    video.src = src
  }
}