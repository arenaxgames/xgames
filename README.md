# 🎰 X-Games — Carte de Fidélité Numérique

Application PWA de fidélité pour stand de fête foraine.  
Système de points XP, niveaux, coupons et machine à sous jackpot.

---

## 🔗 URL de production
**https://keen-babka-ad9234.netlify.app**

- `/register.html` — Page d'accueil clients
- `/client.html?id=XXX` — Carte personnelle
- `/admin.html` — Panel opérateur

---

## 🏗️ Architecture

| Fichier | Rôle |
|---------|------|
| `register.html` | Inscription / reconnexion clients |
| `client.html` | Carte XP + machine à sous + coupons |
| `admin.html` | Panel admin complet |
| `manifest.json` | Configuration PWA |
| `sw.js` | Service worker (désactivé) |
| `netlify.toml` | Config Netlify (CSP) |
| `_redirects` | Redirection racine → register.html |

---

## ⚙️ Configuration Firebase

Projet : `xgames-loyalty` (europe-west1)

La config est intégrée dans les 3 fichiers HTML.  
Pour changer : chercher `firebaseConfig` dans chaque fichier.

### Structure Firestore
```
clients/{id}
  pseudo, avatar, xp, level, totalEuros
  coupons[], createdAt, updatedAt

config/main
  tiers[], jackpot{winRate, prizes[]}, sumupLink, slotPrice

slots/{clientId}
  status, clientId, forced

validations/{token}
  token, clientId, couponId, expiresAt, validated

logs/{id}
  type, clientId, euros, timestamp
```

---

## 🎮 Système de niveaux

| Niveau | Nom | Étoile | XP min |
|--------|-----|--------|--------|
| 0 | Tireur | ☆ | 0 |
| 1 | Sniper | ⭐ | 1 cycle |
| 3 | Elite | ⭐⭐ | 3 cycles |
| 6 | Champion | ⭐⭐⭐ | 6 cycles |
| 10 | Maître | 🌟 | 10 cycles |
| 15 | Légende | 💎 | 15 cycles |

**1€ = 1 XP** — quand la barre se remplit → niveau +1 → repart à 0

---

## 💰 Machine à sous

- Client paie via SumUp → clique "J'AI PAYÉ"
- Ou admin débloque manuellement (espèces)
- % de gain configurable dans l'admin (⚙️ Config)
- Admin force la victoire avec le bouton 🎰 JOUER

---

## 🎫 Coupons

1. Client appuie "UTILISER CE COUPON"
2. QR code unique généré (valable 2 min)
3. Admin scanne avec 📷 Scanner (onglet 🎫)
4. Coupon validé instantanément

---

## 🚀 Déploiement Netlify

1. Télécharger le dossier
2. Aller sur https://app.netlify.com → projet keen-babka-ad9234
3. Onglet Deploys → glisser le dossier
4. Déployé en ~30 secondes

---

## 🔧 Mot de passe admin

Dans `admin.html`, chercher :
```js
const ADMIN_PWD = "xgames2024";
```
Remplacer par ton mot de passe.

---

## 📱 Installation PWA

**Android Chrome** : bandeau automatique après 2s sur register.html  
**iPhone Safari** : bouton ⎙ Partager → Sur l'écran d'accueil

---

## 📊 Export données

Admin → 📊 Stats → bouton **EXPORTER LES DONNÉES (CSV)**

---

## 🔮 Améliorations futures

- Authentification admin via Firebase Auth
- Webhooks SumUp pour validation automatique des paiements
- Notifications push pour les gains
- Tableau de bord analytique avec graphiques
- Système de parrainage
