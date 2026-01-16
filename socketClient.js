// Impostor Game - Socket.io Client
let socket = null;
let isConnected = false;

// Server URL - auto-detect based on current location
const SERVER_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : window.location.origin;

// Initialize socket connection
function initSocket() {
    if (socket) return;

    socket = io(SERVER_URL);

    socket.on('connect', () => {
        console.log('Connected to server');
        isConnected = true;
        updateConnectionStatus(true);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
        isConnected = false;
        updateConnectionStatus(false);
    });

    socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        isConnected = false;
        updateConnectionStatus(false);
    });

    // Room events
    socket.on('player-joined', (data) => {
        gameState.players = data.players;
        if (typeof updatePlayerList === 'function') {
            updatePlayerList();
        }
    });

    socket.on('player-left', (data) => {
        gameState.players = data.players;
        if (typeof updatePlayerList === 'function') {
            updatePlayerList();
        }
    });

    // Game events
    socket.on('game-started', (data) => {
        gameState.phase = GamePhase.REVEAL;
        gameState.currentWordData = { topic: data.topic, word: data.word };
        gameState.players = data.players;
        gameState.turnOrder = data.turnOrder;
        gameState.myIndex = data.myIndex;
        gameState.isImpostor = data.isImpostor;
        gameState.isJester = data.isJester;
        gameState.revealPlayerIndex = 0;

        // Store game options
        gameState.jesterEnabled = data.jesterEnabled;
        gameState.noTopicReveal = data.noTopicReveal;
        gameState.impostorHint = data.impostorHint;

        // Show the reveal screen for this player
        if (typeof showOnlineRevealScreen === 'function') {
            showOnlineRevealScreen(data);
        }
    });

    socket.on('phase-change', (data) => {
        gameState.phase = data.phase;

        if (data.phase === 'submission') {
            gameState.currentPlayerIndex = 0;
            gameState.submittedWords = data.submittedWords || [];
            if (typeof showOnlineSubmissionScreen === 'function') {
                showOnlineSubmissionScreen(data.currentTurnIndex);
            }
        } else if (data.phase === 'discussion') {
            gameState.submittedWords = data.submittedWords;
            if (typeof showDiscussionScreen === 'function') {
                showDiscussionScreen();
            }
        } else if (data.phase === 'voting') {
            if (typeof showOnlineVotingScreen === 'function') {
                showOnlineVotingScreen();
            }
        }
    });

    socket.on('word-submitted', (data) => {
        gameState.submittedWords = data.submittedWords;
        if (typeof updateOnlineSubmissionUI === 'function') {
            updateOnlineSubmissionUI(data.currentTurnIndex);
        }
    });

    socket.on('vote-update', (data) => {
        if (typeof updateVoteProgress === 'function') {
            updateVoteProgress(data.votesReceived, data.totalPlayers);
        }
    });

    socket.on('game-results', (data) => {
        gameState.phase = GamePhase.RESULTS;
        if (typeof showOnlineResultsScreen === 'function') {
            showOnlineResultsScreen(data);
        }
    });

    socket.on('game-reset', (data) => {
        gameState.phase = GamePhase.LOBBY;
        gameState.players = data.players;
        if (typeof showWaitingRoom === 'function') {
            showWaitingRoom();
        }
    });
}

// Wait for socket connection with timeout
function waitForConnection(timeoutMs = 5000) {
    return new Promise((resolve, reject) => {
        if (isConnected) {
            resolve();
            return;
        }

        const timeout = setTimeout(() => {
            cleanup();
            reject(new Error('Connection timeout - server may be unavailable'));
        }, timeoutMs);

        const onConnect = () => {
            cleanup();
            resolve();
        };

        const onError = (error) => {
            cleanup();
            reject(new Error('Failed to connect to server'));
        };

        const cleanup = () => {
            clearTimeout(timeout);
            if (socket) {
                socket.off('connect', onConnect);
                socket.off('connect_error', onError);
            }
        };

        if (socket) {
            socket.once('connect', onConnect);
            socket.once('connect_error', onError);
        } else {
            reject(new Error('Socket not initialized'));
        }
    });
}

// Socket actions
function socketCreateRoom(playerName, callback) {
    if (!socket) {
        callback({ success: false, error: 'Socket not initialized' });
        return;
    }

    waitForConnection()
        .then(() => {
            socket.emit('create-room', playerName, callback);
        })
        .catch((error) => {
            callback({ success: false, error: error.message });
        });
}

function socketJoinRoom(playerName, roomCode, callback) {
    if (!socket) {
        callback({ success: false, error: 'Socket not initialized' });
        return;
    }

    waitForConnection()
        .then(() => {
            socket.emit('join-room', { playerName, roomCode }, callback);
        })
        .catch((error) => {
            callback({ success: false, error: error.message });
        });
}

function socketStartGame(options, callback) {
    if (!socket) return;
    socket.emit('start-game', options, callback);
}

function socketPlayerReady() {
    if (!socket) return;
    socket.emit('player-ready');
}

function socketSubmitWord(word) {
    if (!socket) return;
    socket.emit('submit-word', word);
}

function socketProceedToVoting() {
    if (!socket) return;
    socket.emit('proceed-to-voting');
}

function socketCastVote(suspectIndex) {
    if (!socket) return;
    socket.emit('cast-vote', suspectIndex);
}

function socketPlayAgain() {
    if (!socket) return;
    socket.emit('play-again');
}

function socketLeaveRoom() {
    if (!socket) return;
    socket.emit('leave-room');
}

// UI helper
function updateConnectionStatus(connected) {
    const indicator = document.getElementById('connection-status');
    if (indicator) {
        if (connected) {
            indicator.classList.remove('bg-red-500');
            indicator.classList.add('bg-green-500');
            indicator.title = 'Connected to server';
        } else {
            indicator.classList.remove('bg-green-500');
            indicator.classList.add('bg-red-500');
            indicator.title = 'Disconnected from server';
        }
    }
}

// Export for use
window.initSocket = initSocket;
window.socketCreateRoom = socketCreateRoom;
window.socketJoinRoom = socketJoinRoom;
window.socketStartGame = socketStartGame;
window.socketPlayerReady = socketPlayerReady;
window.socketSubmitWord = socketSubmitWord;
window.socketProceedToVoting = socketProceedToVoting;
window.socketCastVote = socketCastVote;
window.socketPlayAgain = socketPlayAgain;
window.socketLeaveRoom = socketLeaveRoom;
window.isConnected = () => isConnected;
