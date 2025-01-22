// app.js
let timer;
let isRunning = false;
let timeLeft = 25 * 60; // Arbeitszeit in Sekunden
let workDuration = 25; // Minuten
let breakDuration = 5; // Minuten
let isBreak = false; // Zustand für Pause

// Timer starten oder pausieren
function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
    } else {
        timer = setInterval(updateTimer, 1000);
    }
    isRunning = !isRunning;
    document.getElementById('start-pause').textContent = isRunning ? 'Pause' : 'Start';
}

// Timer zurücksetzen
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = workDuration * 60;
    isBreak = false;
    document.getElementById('time-display').textContent = formatTime(timeLeft);
    document.getElementById('start-pause').textContent = 'Start';
    document.getElementById('notification').style.display = 'none';
}

// Timer aktualisieren
function updateTimer() {
    timeLeft--;
    document.getElementById('time-display').textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        if (isBreak) {
            timeLeft = workDuration * 60;
            showNotification('Zeit für Arbeit!', 'success');
        } else {
            timeLeft = breakDuration * 60;
            showNotification('Pausenzeit!', 'warning');
        }
        isBreak = !isBreak;
        document.getElementById('start-pause').textContent = 'Start';
    }
}

// Formatieren der Zeit im MM:SS Format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Benachrichtigung anzeigen
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.className = `alert alert-${type} mt-3`;
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Einstellungen anpassen
document.getElementById('work-duration').addEventListener('change', (e) => {
    workDuration = parseInt(e.target.value, 10);
    timeLeft = workDuration * 60;
    document.getElementById('time-display').textContent = formatTime(timeLeft);
});

document.getElementById('break-duration').addEventListener('change', (e) => {
    breakDuration = parseInt(e.target.value, 10);
});
