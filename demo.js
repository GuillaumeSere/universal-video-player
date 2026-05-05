import { VideoPlayer } from "./dist/index.mjs"

// Éléments DOM
const demoPlayer = document.getElementById('demo-player')
const playBtn = document.getElementById('play-btn')
const pauseBtn = document.getElementById('pause-btn')
const volumeBtn = document.getElementById('volume-btn')
const eventLogContent = document.getElementById('event-log-content')

// Fonction pour ajouter un événement au journal
function addEventToLog(message, type = 'info') {
  const eventItem = document.createElement('div')
  eventItem.className = `event-item ${type}`
  eventItem.textContent = `${new Date().toLocaleTimeString()} - ${message}`

  eventLogContent.appendChild(eventItem)

  // Garder seulement les 20 derniers événements
  while (eventLogContent.children.length > 20) {
    eventLogContent.removeChild(eventLogContent.firstChild)
  }

  // Scroll automatique vers le bas
  eventLogContent.scrollTop = eventLogContent.scrollHeight
}

// Initialisation du lecteur vidéo
const player = new VideoPlayer({
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  autoplay: false,
  controls: false, // Désactiver les contrôles natifs
  customControls: true, // Activer les contrôles personnalisés
  enableFullscreen: true,
  subtitles: [
    {
      src: "./sample-subtitles.vtt",
      label: "Français",
      language: "fr",
      default: true
    }
  ],
  onPlay: () => {
    addEventToLog("▶️ Lecture démarrée", "play")
  },
  onPause: () => {
    addEventToLog("⏸️ Lecture en pause", "pause")
  },
  onTimeUpdate: (currentTime) => {
    // Ne log que toutes les 5 secondes pour éviter le spam
    if (Math.floor(currentTime) % 5 === 0 && Math.floor(currentTime) > 0) {
      const formattedTime = formatTime(currentTime)
      addEventToLog(`⏱️ Temps: ${formattedTime}`, "time")
    }
  },
  onLoadedData: () => {
    addEventToLog("📹 Vidéo chargée avec succès", "load")
  },
  onError: (error) => {
    addEventToLog(`❌ Erreur: ${error.message}`, "error")
  }
})

// Monter le lecteur
player.mount("#demo-player")
addEventToLog("🎬 Lecteur initialisé", "load")

// Vérifier la disponibilité des méthodes
addEventToLog(`🔧 Méthodes disponibles: getVolume=${typeof player.getVolume === 'function'}, setVolume=${typeof player.setVolume === 'function'}`, "info")

// Gestionnaires d'événements pour les boutons de contrôle
playBtn.addEventListener('click', () => {
  player.play()
  addEventToLog("▶️ Bouton Play cliqué", "play")
})

pauseBtn.addEventListener('click', () => {
  player.pause()
  addEventToLog("⏸️ Bouton Pause cliqué", "pause")
})

volumeBtn.addEventListener('click', () => {
  // Toggle volume (exemple simple)
  if (typeof player.getVolume === 'function' && typeof player.setVolume === 'function') {
    const currentVolume = player.getVolume()
    const newVolume = currentVolume > 0 ? 0 : 1
    player.setVolume(newVolume)
    addEventToLog(`🔊 Volume changé: ${Math.round(newVolume * 100)}%`, "info")
  } else {
    addEventToLog("❌ Méthodes de volume non disponibles", "error")
  }
})

// Fonction utilitaire pour formater le temps
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Ajouter des informations sur les contrôles personnalisés
setTimeout(() => {
  addEventToLog("🎮 Contrôles personnalisés activés", "info")
  addEventToLog("📺 Mode fullscreen disponible", "info")
  addEventToLog("💥 Sélecteur de qualité disponible (HLS)", "info")
  addEventToLog("🎬 Sous-titres français chargés", "info")
}, 1000)

// Gestionnaire pour les erreurs globales
window.addEventListener('error', (e) => {
  addEventToLog(`❌ Erreur globale: ${e.message}`, "error")
})

// Message de bienvenue
addEventToLog("🎉 Bienvenue dans la démo du Universal Video Player !", "info")
addEventToLog("💡 Cliquez sur 'Lire' pour commencer", "info")