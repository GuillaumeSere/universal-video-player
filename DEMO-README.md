# 🎬 Universal Video Player - Démo Interactive

Bienvenue dans la démonstration complète du **Universal Video Player** ! Cette page présente toutes les fonctionnalités avancées implémentées.

## 🔥 Fonctionnalités Démontrées

### 🎬 **Sous-titres VTT**
- Support complet des fichiers WebVTT
- Sélection de langue dans les contrôles personnalisés
- Sous-titres français inclus dans l'exemple

### 📺 **Mode Plein Écran**
- Bouton fullscreen intégré
- API native du navigateur
- Gestion automatique des événements

### 🎮 **Contrôles Personnalisés**
- Interface moderne remplaçant les contrôles HTML5
- Barre de progression interactive
- Affichage du temps (actuel/total)
- Apparition au survol de la souris

### 💥 **Sélecteur de Qualité (HLS)**
- Changement de qualité en temps réel
- Détection automatique des niveaux disponibles
- Option "Auto" pour la qualité adaptative

### 🎪 **Système d'Événements**
- Callbacks pour tous les événements vidéo :
  - `onPlay` - Démarrage de la lecture
  - `onPause` - Mise en pause
  - `onTimeUpdate` - Mise à jour du temps
  - `onLoadedData` - Vidéo chargée
  - `onError` - Gestion des erreurs

## 🎯 Comment Utiliser la Démo

1. **Navigation** : Utilisez les contrôles personnalisés qui apparaissent au survol
2. **Sous-titres** : Sélectionnez "Français" dans le menu des sous-titres
3. **Qualité** : Changez la qualité vidéo avec le sélecteur (pour HLS)
4. **Fullscreen** : Cliquez sur le bouton ⛶ pour passer en plein écran
5. **Événements** : Observez le journal en temps réel des événements

## 📁 Structure des Fichiers

```
demo.html      # Page HTML de démonstration
demo.css       # Styles CSS pour la démo
demo.js        # JavaScript pour la logique de démo
sample-subtitles.vtt  # Fichier de sous-titres exemple
```

## 🚀 Démarrage Rapide

Ouvrez `demo.html` dans votre navigateur pour voir toutes les fonctionnalités en action !

## 💻 Code Source

Le code source complet du lecteur est disponible dans le dossier `src/`. La démonstration utilise toutes les options disponibles :

```
const player = new VideoPlayer({
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  autoplay: false,
  controls: false,
  customControls: true,
  enableFullscreen: true,
  subtitles: [...],
  onPlay: () => { ... },
  onPause: () => { ... },
  // ... autres événements
})
```

## 🔙 Retour à l'Accueil

Cliquez sur "← Retour à l'accueil" pour revenir à la page principale du projet.