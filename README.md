# Impostor

A multiplayer social deduction party game. One player is the Impostor who must blend in, while everyone else tries to identify them through word association.

**Play now at [impostorhunt.com](https://www.impostorhunt.com)**

<p align="center">
  <img width="3232" height="2211" alt="image" src="https://github.com/user-attachments/assets/32ceb218-dcb1-472d-ac48-0913bbba9c83" />
</p>


## How It Works

**Roles:** Everyone (the crew) receives a Topic and Secret Word. The Impostor only sees the Topic.

**Turns:** Players take turns saying one word related to the secret to prove they know it.

**Deduction:** The Impostor must blend in by guessing from context clues. The crew votes to identify the Impostor.

<p align="center">
<img height="260" alt="image" src="https://github.com/user-attachments/assets/3b4ebf10-8962-4383-9397-80456c71e645" />
<img  height="300" alt="image" src="https://github.com/user-attachments/assets/e111f3dc-4093-48bf-afbb-87a523dc36e5" />
<img height="300" alt="image" src="https://github.com/user-attachments/assets/60bc8c10-54b6-4b29-bbe2-51cac98aa87c" />
</p>

## Game Modes

- **Pass to Play** - Offline mode, pass the device around
- **Online Multiplayer** - Host a lobby and share the PIN with friends

<p align="center">
<img height="748" alt="image" src="https://github.com/user-attachments/assets/2bd054b9-2f10-478f-8b78-2207959d9166" />
</p>

## Optional Twists

- **Jester Role** - Wins by getting voted out
- **Hard Mode** - Crew only sees the word, Impostor only sees the topic
- **Hint Word** - Impostor receives a subtle hint

## Tech Stack

- **Frontend:** JavaScript, Tailwind CSS
- **Backend:** Node.js, Express
- **Real-time:** Socket.IO
- **Deployment:** Docker, Fly.io

## Development

```bash
# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Start the server
node server.js
```

## Contributing

Contributions welcome! Submit a PR or use the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSepoBf-Up4bpz0NGYdUYtFnvL414JmdVIz-WZ-btyA-fyDmHA/viewform) if you find bugs or have suggestions.
