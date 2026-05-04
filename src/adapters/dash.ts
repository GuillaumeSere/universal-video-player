export async function loadDASH(video: HTMLVideoElement, src: string) {
  const dashjs = await import("dashjs")
  const player = dashjs.MediaPlayer().create()

  player.initialize(video, src, true)
}