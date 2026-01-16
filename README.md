# Impostor

A multiplayer social deduction party game. One player is the Impostor who must blend in, while everyone else tries to identify them through word association.

**Play now at [impostorhunt.com](https://www.impostorhunt.com)**

<!-- ![Home Page](assets/home_page.png) -->

## How It Works

**Roles:** Everyone (the crew) receives a Topic and Secret Word. The Impostor only sees the Topic.

**Turns:** Players take turns saying one word related to the secret to prove they know it.

**Deduction:** The Impostor must blend in by guessing from context clues. The crew votes to identify the Impostor.

<!-- ![Reveal](assets/reveal.png) -->

## Game Modes

- **Pass to Play** - Offline mode, pass the device around
- **Online Multiplayer** - Host a lobby and share the PIN with friends

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
