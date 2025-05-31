
const startBtn = document.getElementById('start-btn');
const status = document.getElementById('status');
const heard = document.getElementById('heard');
const response = document.getElementById('response');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const repeatBtn = document.getElementById('repeat-btn');
const timerDisplay = document.getElementById('timer-display');
const resultDisplay = document.getElementById('result-display');
const calculator = document.getElementById('calculator');
const calcDisplay = document.getElementById('calc-display');
const audioPlayer = document.getElementById('audio-player');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const muteBtn = document.getElementById('mute-btn');
const saveToggleBtn = document.getElementById('save-toggle');
const ringtoneToggleBtn = document.getElementById('ringtone-toggle');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();


audioPlayer.playbackRate = 1.0; // Default speed
audioPlayer.volume = 0.5;

let isRepeat = false;
let isActive = false;
let isMuted = false;
let isSpeaking = false;
let currentUtterance = null; // To track the current speech
let timerEndTime = null;
let timerInterval = null;

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let saveData = true;
let ringtoneEnabled = true;
let timers = []; // Array to hold multiple timers
let timerIntervals = new Map(); // Map to track intervals for each timer
let ringtoneTimeout = null;
let ringtonePreloaded = false;

// Stopwatch settings
let stopwatchStartTime = null;
let elapsedTime = 0;
let isRunning = false;
let timer = null;




const stopwatchDisplay = document.getElementById('stopwatch-display'); // Add this to your variable declarations



const playlist = [
    { title: "Samajavaragamana", url: "https://www.dropbox.com/scl/fi/hyk0j59j1cuuebg602ivd/Samajavaragamana.mp3?rlkey=ebt7ly8g7ykt9hqhiodrjtek1&st=8ctouucc&dl=1" },
    { title: "Bagundu Bagundu Song", url: "https://www.dropbox.com/scl/fi/cbg9hxehlvcm0rvkcbae6/Bagundu-Bagundu.mp3?rlkey=yru56be3o6kefmetbfflzl89q&st=dkqrtoi5&dl=1" },
    { title: "diwali song", url: "https://www.dropbox.com/scl/fi/ttxiawlzem9899svsxe0f/DIPAWALI-SONG.mp3?rlkey=h198miz3f5gthcnjmf75w79wp&st=4a3z8c4c&dl=1" },
    { title: "mother song", url: "https://www.dropbox.com/scl/fi/ch771ywkuh9qdlu04vl1s/Emotional-Mother-Song.mp3?rlkey=qg7i9omp8hwu7ijp29iusprwx&st=2yopxgeo&dl=1" },
    { title: "Aradhya song", url: "https://www.dropbox.com/scl/fi/rqeg1abtqta4p7rk789dt/Aradhya.mp3?rlkey=jirtlk9cn8ajftns2uvxkdk8j&st=etutsb2s&dl=1" },
    { title: "Bullettu-Bandi", url: "https://www.dropbox.com/scl/fi/q5hf2wx0pok0lckevk047/Bullettu-Bandi.mp3?rlkey=25wkb9m963tez217f1zycs4h0&st=kp5nr51k&dl=1" },
    { title: "Sommasilli-Pothunnave", url: "https://www.dropbox.com/scl/fi/1x8aojrcdgyl2w07f2mil/Sommasilli-Pothunnave.mp3?rlkey=d1fiepn90xla8ejnuz5ea5ev3&st=p0y0qb7l&dl=1" },
    { title: "Sandalle-Sandalle", url: "https://www.dropbox.com/scl/fi/ejrri7nrczlrt7h45v6yz/Sandalle-Sandalle.mp3?rlkey=8b56ztjffhv01ffctp849rrdm&st=o1uz0rys&dl=1" },
    { title: "Vachindamma", url: "https://www.dropbox.com/scl/fi/ma70fw9mhkb14rszqd6s5/Vachindamma.mp3?rlkey=w0tcuncbxmffiqgoui9oj3v3a&st=fvvww1l0&dl=1" },
    { title: "Selayeru-Paduthunte", url: "https://www.dropbox.com/scl/fi/n0sizn8rzlrwg4np1xm0d/Selayeru-Paduthunte.mp3?rlkey=ztroxizel2hlz048rrd9d2koz&st=5d6cvlbb&dl=1" },
    { title: "timer-ringtone-venkataeswara-swamy-song", url: "https://www.dropbox.com/scl/fi/ahko1k8bh2424rwoy8dgf/venkataeswara-swamy.mp3?rlkey=7f49x9oxh1k1hz7w46fclbx1g&st=zvzj9nof&dl=1" }
];
let currentSongIndex = 0;


// Preload ringtone (unchanged)
function preloadRingtone() {
    const ringtoneSong = playlist.find(song => song.title === "timer-ringtone-venkataeswara-swamy-song");
    if (ringtoneSong && !ringtonePreloaded) {
        const preloadAudio = new Audio(ringtoneSong.url);
        preloadAudio.preload = "auto";
        preloadAudio.load();
        ringtonePreloaded = true;
    }
}
function setTimer(secondsInput, timerName = "Unnamed") {
    const id = Date.now().toString();
    const totalSeconds = Math.max(1, Math.floor(secondsInput));
    const endTime = Date.now() + totalSeconds * 1000;

    const timer = { 
        id, 
        name: timerName, 
        endTime, 
        totalSeconds,
        remainingSeconds: totalSeconds,
        expired: false
    };
    
    timers.push(timer);
    createTimerDisplay(timer);

    const interval = setInterval(() => {
        const now = Date.now();
        const remainingTime = Math.max(0, Math.round((timer.endTime - now) / 1000));
        
        timer.remainingSeconds = remainingTime;
        updateSingleTimerDisplay(timer);

        if (remainingTime <= 0) {
            clearInterval(interval);
            timerIntervals.delete(timer.id);
            timers = timers.filter(t => t.id !== timer.id);
            
            const timerElement = document.getElementById(`timer-${timer.id}`);
            if (timerElement) timerElement.remove();

            timer.expired = true; // Mark as expired
            const completionMessage = `${timer.name} timer finished!`;
            respond(completionMessage);
            resultDisplay.textContent = completionMessage;
            
            if (ringtoneEnabled) playTimerRingtone();
            showNotification('Timer Complete', completionMessage);

            // Update storage
            if (saveData) {
                const timerData = JSON.parse(localStorage.getItem('timerData')) || [];
                const updatedTimers = timerData.filter(t => t.id !== timer.id); // Remove expired timer
                localStorage.setItem('timerData', JSON.stringify(updatedTimers));
            }
        }
    }, 100);

    timerIntervals.set(id, interval);
    
    if (saveData) {
        const timerData = JSON.parse(localStorage.getItem('timerData')) || [];
        timerData.push({
            id: timer.id,
            name: timer.name,
            endTime: timer.endTime,
            totalSeconds: timer.totalSeconds,
            expired: timer.expired
        });
        localStorage.setItem('timerData', JSON.stringify(timerData));
    }

    respond(`Timer "${timerName}" set for ${formatTime(totalSeconds)}`);
}

// Call this when your app starts
window.addEventListener('load', () => {
    cleanupExpiredTimers();
    // Rest of your initialization code...
});

function checkExpiredTimersOnLoad() {
    if (!saveData) {
        localStorage.removeItem('timerData');
        return;
    }

    const timerData = JSON.parse(localStorage.getItem('timerData')) || [];
    const now = Date.now();
    const expiredTimers = [];

    timerData.forEach(timer => {
        if (timer.endTime <= now && !timer.expired) {
            expiredTimers.push({
                ...timer,
                timePassed: Math.round((now - timer.endTime) / 1000)
            });
            timer.expired = true;
        }
    });

    if (expiredTimers.length > 0) {
        localStorage.setItem('timerData', JSON.stringify(timerData));
    }

    expiredTimers.forEach(timer => {
        const timePassed = formatTime(timer.timePassed);
        const message = `Your timer "${timer.name}" went off ${timePassed} ago`;
        
        const notification = document.createElement('div');
        notification.className = 'timer-notification';
        notification.innerHTML = `
            <p>${message}</p>
            <button class="dismiss-btn">OK</button>
        `;
        
        document.getElementById('notifications-container').appendChild(notification);
        
        notification.querySelector('.dismiss-btn').addEventListener('click', () => {
            notification.remove();
            if (saveData) {
                const updatedTimers = JSON.parse(localStorage.getItem('timerData')) || [];
                const newTimers = updatedTimers.filter(t => t.id !== timer.id);
                localStorage.setItem('timerData', JSON.stringify(newTimers));
            }
        });
    });
}


function stopTimer(timerName) {
    const timer = timers.find(t => t.name.toLowerCase() === timerName.toLowerCase());
    if (timer) {
        clearInterval(timerIntervals.get(timer.id));
        timerIntervals.delete(timer.id);
        timers = timers.filter(t => t.id !== timer.id);
        document.getElementById(`timer-${timer.id}`)?.remove();

        if (saveData) {
            localStorage.setItem('timerData', JSON.stringify(timers.map(t => ({
                id: t.id,
                name: t.name,
                endTime: t.endTime,
                remainingSeconds: t.remainingSeconds
            }))));
        }

        stopRingtone();
        respond(`Timer "${timerName}" stopped.`);
    } else {
        respond(`No timer named "${timerName}" found.`);
    }
}

function clearAllTimers() {
    timers.forEach(timer => {
        clearInterval(timerIntervals.get(timer.id));
        document.getElementById(`timer-${timer.id}`)?.remove();
    });
    timers = [];
    timerIntervals.clear();
    if (saveData) localStorage.removeItem('timerData');
    stopRingtone();
    timerDisplay.textContent = '00:00';
    respond('All timers cleared.');
}
// Better timer loading from storage
function loadTimerFromStorage() {
    if (!saveData) return;

    const timerData = JSON.parse(localStorage.getItem('timerData')) || [];
    timers = [];
    timerIntervals.clear();

    timerData.forEach(savedTimer => {
        const remainingTime = Math.round((savedTimer.endTime - Date.now()) / 1000);
        if (remainingTime > 0 && !savedTimer.expired) {
            const timer = {
                id: savedTimer.id,
                name: savedTimer.name,
                endTime: savedTimer.endTime,
                totalSeconds: savedTimer.totalSeconds,
                remainingSeconds: remainingTime,
                expired: false
            };
            timers.push(timer);
            createTimerDisplay(timer);

            const interval = setInterval(() => {
                const now = Date.now();
                const remainingTime = Math.max(0, Math.round((timer.endTime - now) / 1000));
                
                timer.remainingSeconds = remainingTime;
                updateSingleTimerDisplay(timer);

                if (remainingTime <= 0) {
                    clearInterval(interval);
                    timerIntervals.delete(timer.id);
                    timers = timers.filter(t => t.id !== timer.id);
                    
                    const timerElement = document.getElementById(`timer-${timer.id}`);
                    if (timerElement) timerElement.remove();

                    const completionMessage = `${timer.name} timer finished!`;
                    respond(completionMessage);
                    resultDisplay.textContent = completionMessage;
                    
                    if (ringtoneEnabled) playTimerRingtone();
                    showNotification('Timer Complete', completionMessage);

                    if (saveData) {
                        const timerData = JSON.parse(localStorage.getItem('timerData')) || [];
                        const updatedTimers = timerData.filter(t => t.id !== timer.id);
                        localStorage.setItem('timerData', JSON.stringify(updatedTimers));
                    }
                }
            }, 100);

            timerIntervals.set(timer.id, interval);
        } else if (saveData && savedTimer.expired) {
            // Remove expired timer from storage
            const updatedTimers = timerData.filter(t => t.id !== savedTimer.id);
            localStorage.setItem('timerData', JSON.stringify(updatedTimers));
        }
    });
}
function playTimerRingtone() {
    if (!ringtoneEnabled) {
        console.log("Ringtone is disabled, skipping playback.");
        return;
    }
    const ringtoneSong = playlist.find(song => song.title === "timer-ringtone-venkataeswara-swamy-song");
    if (!ringtoneSong) {
        console.error("Ringtone not found in playlist!");
        respond("Error: Timer ringtone not found!");
        return;
    }

    audioPlayer.src = ringtoneSong.url;
    audioPlayer.loop = false;
    audioPlayer.play().then(() => {
        status.textContent = "Playing timer ringtone...";
        ringtoneTimeout = setTimeout(() => {
            stopRingtone();
            status.textContent = "Timer ringtone finished.";
        }, 30000); // 30 seconds
    }).catch(error => {
        console.error("Ringtone play error:", error);
        respond("Failed to play timer ringtone!");
    });
}
function stopRingtone() {
    if (ringtoneTimeout) {
        clearTimeout(ringtoneTimeout);
        ringtoneTimeout = null;
    }
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

// Helper functions
function createTimerDisplay(timer) {
    const existing = document.getElementById(`timer-${timer.id}`);
    if (!existing) {
        const timerDiv = document.createElement('div');
        timerDiv.id = `timer-${timer.id}`;
        timerDiv.dataset.name = timer.name;
        timerDiv.textContent = `${timer.name}: ${formatTimerDisplay(timer.remainingSeconds)}`;
        document.getElementById('timers-container').appendChild(timerDiv);
    }
}

// Improved timer display update
function updateSingleTimerDisplay(timer) {
    const timerDiv = document.getElementById(`timer-${timer.id}`);
    if (timerDiv) {
        const minutes = Math.floor(timer.remainingSeconds / 60);
        const seconds = timer.remainingSeconds % 60;
        timerDiv.textContent = `${timer.name}: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function updateTimerDisplay(totalSeconds) {
    // For compatibility with single-timer UI
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatTimerDisplay(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    let timeStr = '';
    if (h > 0) timeStr += `${h} hour${h > 1 ? 's' : ''} `;
    if (m > 0) timeStr += `${m} minute${m > 1 ? 's' : ''} `;
    if (s > 0) timeStr += `${s} second${s > 1 ? 's' : ''}`;
    return timeStr.trim();
}

function showNotification(title, message) {
    if (Notification.permission === "granted") {
        new Notification(title, { body: message });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, { body: message });
            }
        });
    }
}














// Start/Resume Stopwatch
function startStopwatch() {
    if (!isRunning) return;

    const now = Date.now();
    const currentElapsed = now - stopwatchStartTime + elapsedTime;
    minutes = Math.floor(currentElapsed / 60000);
    seconds = Math.floor((currentElapsed % 60000) / 1000);
    milliseconds = currentElapsed % 1000;

    updateDisplay();

    if (saveData) {
        localStorage.setItem('stopwatchData', JSON.stringify({
            elapsedTime: currentElapsed,
            isRunning: isRunning,
            stopwatchStartTime: stopwatchStartTime,
            lastUpdate: now
        }));
    }
}
// Load Stopwatch from Storage
function loadStopwatchFromStorage() {
    if (!saveData) {
        localStorage.removeItem('stopwatchData');
        return;
    }

    const stopwatchData = JSON.parse(localStorage.getItem('stopwatchData'));
    if (stopwatchData) {
        elapsedTime = stopwatchData.elapsedTime || 0;
        isRunning = stopwatchData.isRunning || false;
        stopwatchStartTime = stopwatchData.stopwatchStartTime || null;
        const lastUpdate = stopwatchData.lastUpdate || Date.now();

        if (isRunning && stopwatchStartTime) {
            const timeSinceLastUpdate = Date.now() - lastUpdate;
            elapsedTime += timeSinceLastUpdate;
            stopwatchStartTime = Date.now();
            timer = setInterval(startStopwatch, 10);
            startStopButton.textContent = 'Stop';
        } else {
            minutes = Math.floor(elapsedTime / 60000);
            seconds = Math.floor((elapsedTime % 60000) / 1000);
            milliseconds = elapsedTime % 1000;
            updateDisplay();
            startStopButton.textContent = 'Start';
        }
    }
}
// Start/Stop Button Event Listener
startStopButton.addEventListener('click', () => {
    if (isRunning) {
        // Stop the stopwatch
        clearInterval(timer);
        elapsedTime += Date.now() - stopwatchStartTime; // Update elapsed time
        isRunning = false;
        startStopButton.textContent = 'Start';
        respond("Stopwatch stopped.");
    } else {
        // Start or resume the stopwatch
        stopwatchStartTime = Date.now();
        isRunning = true;
        timer = setInterval(startStopwatch, 10);
        startStopButton.textContent = 'Stop';
        respond("Stopwatch started.");
    }

    if (saveData) {
        localStorage.setItem('stopwatchData', JSON.stringify({
            elapsedTime: elapsedTime,
            isRunning: isRunning,
            stopwatchStartTime: stopwatchStartTime,
            lastUpdate: Date.now()
        }));
    }
});

// Reset Button Event Listener
resetButton.addEventListener('click', () => {
    clearInterval(timer);
    elapsedTime = 0;
    stopwatchStartTime = null;
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    startStopButton.textContent = 'Start';
    updateDisplay();
    if (saveData) localStorage.removeItem('stopwatchData');
    respond("Stopwatch reset.");
});

// Update Display Function
function updateDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
    millisecondsDisplay.textContent = String(milliseconds).padStart(3, '0');
}
saveToggleBtn.addEventListener('click', () => {
    saveData = !saveData;
    saveToggleBtn.textContent = `Save Data: ${saveData ? 'ON' : 'OFF'}`;
    localStorage.setItem('saveData', saveData);

    if (!saveData) {
        // Clear all stored timer and stopwatch data
        localStorage.removeItem('timerData');
        localStorage.removeItem('stopwatchData');
        timers.forEach(timer => {
            clearInterval(timerIntervals.get(timer.id));
            document.getElementById(`timer-${timer.id}`)?.remove();
        });
        timers = [];
        timerIntervals.clear();
        // Reset stopwatch
        clearInterval(timer);
        elapsedTime = 0;
        stopwatchStartTime = null;
        isRunning = false;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        updateDisplay();
        startStopButton.textContent = 'Start';
        respond('Save Data turned off. All timer and stopwatch data cleared.');
    } else {
        // Save current timers and stopwatch state
        if (timers.length > 0) {
            localStorage.setItem('timerData', JSON.stringify(
                timers.map(t => ({
                    id: t.id,
                    name: t.name,
                    endTime: t.endTime,
                    totalSeconds: t.totalSeconds,
                    expired: t.expired || false
                }))
            ));
        }
        if (isRunning || elapsedTime > 0) {
            localStorage.setItem('stopwatchData', JSON.stringify({
                elapsedTime: elapsedTime,
                isRunning: isRunning,
                stopwatchStartTime: stopwatchStartTime,
                lastUpdate: Date.now()
            }));
        }
        respond('Save Data turned on.');
    }
});
window.addEventListener('load', () => {
    saveData = localStorage.getItem('saveData') !== 'false';
    saveToggleBtn.textContent = `Save Data: ${saveData ? 'ON' : 'OFF'}`;
    ringtoneEnabled = localStorage.getItem('ringtoneEnabled') !== 'false';
    ringtoneToggleBtn.textContent = `Ringtone: ${ringtoneEnabled ? 'ON' : 'OFF'}`;
    
    if (!saveData) {
        localStorage.removeItem('timerData');
        localStorage.removeItem('stopwatchData');
    }
    
    preloadRingtone();
    checkExpiredTimersOnLoad();
    loadTimerFromStorage();
    loadStopwatchFromStorage();
});

ringtoneToggleBtn.addEventListener('click', () => {
    ringtoneEnabled = !ringtoneEnabled;
    ringtoneToggleBtn.textContent = `Ringtone: ${ringtoneEnabled ? 'ON' : 'OFF'}`;
    localStorage.setItem('ringtoneEnabled', ringtoneEnabled);
    respond(`Ringtone ${ringtoneEnabled ? 'enabled' : 'disabled'}.`);
    if (!ringtoneEnabled && ringtoneTimeout) {
        stopRingtone();
    }
});


// Mute button - Fixed version
// Fixed Mute Button Logic
muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    muteBtn.textContent = isMuted ? 'Unmute' : 'Mute';
    status.textContent = isMuted ? 'Assistant muted' : 'Assistant unmuted';

    if (isMuted) {
        // Stop ongoing speech and clean up
        if (isSpeaking || window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
            currentUtterance = null;
        }
        // Restart recognition
        try {
            recognition.start();
            console.log("Recognition restarted after muting");
        } catch (error) {
            console.error("Recognition restart failed on mute:", error);
        }
    } else {
        // Ensure speech works after unmuting
        window.speechSynthesis.cancel(); // Clear any stuck queue
        isSpeaking = false;
        currentUtterance = null;
        respond("Assistant unmuted"); // Should speak this
        console.log("Unmuted - should speak now");
    }
});






//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions

//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions
//Speech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctionsSpeech RecognitionFunctionsSpeechRecognitionFunctions




// Speech recognition
recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    heard.textContent = `Heard: ${transcript}`;
    console.log(`Processing command: "${transcript}"`); // Debug log

    if (transcript.includes("friday") && !isActive) {
        isActive = true;
        status.textContent = "I'm awake! How can I assist you?";
        const responses = ["friday is active. , at your sirvice  sir always", " Yes sir, I'm here to help!", 
                           " Hello sir, how can i help you sir?", " Yes sir, I'm listening."];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        respond(randomResponse);
        return;
    }

    if (!isActive) return;

    // Stop ringtone command
    if (transcript.includes("ok friday") || transcript.includes("okay friday")) {
        stopRingtone();
        respond("Ringtone stopped.");
        return;
    }

    // Timer commands
    if (transcript.includes('set a timer for')) {
        let totalSeconds = 0;
        const hoursMatch = transcript.match(/(\d+)\s*hour/);
        const minutesMatch = transcript.match(/(\d+)\s*minute/);
        const secondsMatch = transcript.match(/(\d+)\s*second/);
        const nameMatch = transcript.match(/called\s+(.+?)(?:\s+for|$)/i);

        if (hoursMatch) totalSeconds += parseInt(hoursMatch[1]) * 3600;
        if (minutesMatch) totalSeconds += parseInt(minutesMatch[1]) * 60;
        if (secondsMatch) totalSeconds += parseInt(secondsMatch[1]);

        const timerName = nameMatch ? nameMatch[1].trim() : "Unnamed";

        if (totalSeconds > 0) {
            const existingTimer = timers.find(t => t.name.toLowerCase() === timerName.toLowerCase());
            if (existingTimer) {
                respond(`There's already a timer named "${timerName}". Please use a different name.`);
            } else {
                setTimer(totalSeconds, timerName);
            }
        } else {
            respond('Please specify a valid time duration (hours, minutes, or seconds).');
        }
        return;
    }
    if (transcript.includes("clear all timers")) {
        clearAllTimers();
        return;
    }

    // Stopwatch commands
    if (transcript.includes("start stopwatch")) {
        if (!isRunning) {
            startStopButton.click();
            respond("Stopwatch started.");
            stopwatchDisplay.style.display = 'block';
        } else {
            respond("Stopwatch is already running.");
        }
        calculator.classList.remove('active');
        return;
    } else if (transcript.includes("stop stopwatch")) {
        if (isRunning) {
            startStopButton.click();
            respond("Stopwatch stopped.");
        } else {
            respond("Stopwatch is not running.");
        }
        calculator.classList.remove('active');
        return;
    } else if (transcript.includes("reset stopwatch")) {
        resetButton.click();
        respond("Stopwatch reset.");
        return;
    } else if (transcript.includes("stopwatch time") || transcript.includes("friday stopwatch time") ||
               transcript.includes("stopwatch status") || transcript.includes("friday stopwatch status")) {
        respond(`Current stopwatch time: ${minutes}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`);
        return;
    } else if (transcript.includes("display stopwatch") || transcript.includes("show stopwatch") ||
               transcript.includes("friday show stopwatch") || transcript.includes("friday display stopwatch")) {
        const responses = ["Yes sir, displaying stopwatch", "ok sir displaying stopwatch for you sir", 
                           "alright sir, displaying stopwatch.", "yes sir, displaying stopwatch right now", 
                           "Here you go sir, displaying stopwatch!"];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        stopwatchDisplay.style.display = 'block';
        respond(randomResponse);
        return;
    } else if (transcript.includes("hide stopwatch") || transcript.includes("remove stopwatch") ||
               transcript.includes("friday hide stopwatch") || transcript.includes("friday remove stopwatch")) {
        const responses = ["Yes sir, hiding stopwatch", "ok sir hiding the stopwatch for you sir", 
                           "alright sir, hiding stopwatch.", "yes sir, hiding stopwatch right now", 
                           "Here you go sir, hiding stopwatch!"];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        stopwatchDisplay.style.display = 'none';
        respond(randomResponse);
        return;
    }

    // Song-playing commands
    if (transcript.includes("friday play s a m song") || transcript.includes("friday play sam song") ||
        transcript.includes("play s a m song") || transcript.includes("play sam song")) {
        respond("Yes sir, playing Samajavaragamana", () => {
            playSongByTitle("Samajavaragamana");
        });
        return;
    } else if (transcript.includes("friday play d i w song") || transcript.includes("friday play diw song") ||
               transcript.includes("play d i w song") || transcript.includes("play diw song") ||
               transcript.includes("friday play d i w") || transcript.includes("friday play diw") ||
               transcript.includes("play d i w") || transcript.includes("play diw") ||
               transcript.includes("friday play diwali song")) {
        respond("Yes sir, playing Diwali song", () => {
            playSongByTitle("diwali song");
        });
        return;
    } else if (transcript.includes("friday play b a g song") || transcript.includes("friday play bag song") ||
               transcript.includes("play b a g song") || transcript.includes("play bag song") ||
               transcript.includes("friday play b a g") || transcript.includes("friday play bag") ||
               transcript.includes("play b a g") || transcript.includes("play bag")) {
        respond("Yes sir, playing Bagundu Bagundu Song", () => {
            playSongByTitle("Bagundu Bagundu Song");
        });
        return;
    } else if (transcript.includes("friday play mother song")) {
        respond("Yes sir, playing Mother song", () => {
            playSongByTitle("mother song");
        });
        return;
    } else if (transcript.includes("friday play a r a song") || transcript.includes("friday play ara song") ||
               transcript.includes("play a r a song") || transcript.includes("play ara song") ||
               transcript.includes("friday play a r a") || transcript.includes("friday play ara") ||
               transcript.includes("play a r a") || transcript.includes("play ara") ||
               transcript.includes("friday play aradhya song")) {
        respond("Yes sir, playing Aradhya song", () => {
            playSongByTitle("Aradhya song");
        });
        return;
    } else if (transcript.includes("friday play b u l song") || transcript.includes("friday play bul song") ||
               transcript.includes("play b u l song") || transcript.includes("play bul song") ||
               transcript.includes("friday play b u l") || transcript.includes("friday play bul") ||
               transcript.includes("play b u l") || transcript.includes("play bul") ||
               transcript.includes("friday play bullettu bandi song")) {
        respond("Yes sir, playing Bullettu-Bandi", () => {
            playSongByTitle("Bullettu-Bandi");
        });
        return;
    } else if (transcript.includes("friday play s o m song") || transcript.includes("friday play som song") ||
               transcript.includes("play s o m song") || transcript.includes("play som song") ||
               transcript.includes("friday play s o m") || transcript.includes("friday play som") ||
               transcript.includes("play s o m") || transcript.includes("play som") ||
               transcript.includes("friday play sommasilli song")) {
        respond("Yes sir, playing Sommasilli-Pothunnave", () => {
            playSongByTitle("Sommasilli-Pothunnave");
        });
        return;
    } else if (transcript.includes("friday play s a n song") || transcript.includes("friday play san song") ||
               transcript.includes("play s a n song") || transcript.includes("play san song") ||
               transcript.includes("friday play s a n") || transcript.includes("friday play san") ||
               transcript.includes("play s a n") || transcript.includes("play san") ||
               transcript.includes("friday play sandalle song")) {
        respond("Yes sir, playing Sandalle-Sandalle", () => {
            playSongByTitle("Sandalle-Sandalle");
        });
        return;
    } else if (transcript.includes("friday play v a c song") || transcript.includes("friday play vac song") ||
               transcript.includes("play v a c song") || transcript.includes("play vac song") ||
               transcript.includes("friday play v a c") || transcript.includes("friday play vac") ||
               transcript.includes("play v a c") || transcript.includes("play vac") ||
               transcript.includes("friday play vachindamma song")) {
        respond("Yes sir, playing Vachindamma", () => {
            playSongByTitle("Vachindamma");
        });
        return;
    } else if (transcript.includes("friday play s e l song") || transcript.includes("friday play sel song") ||
               transcript.includes("play s e l song") || transcript.includes("play sel song") ||
               transcript.includes("friday play s e l") || transcript.includes("friday play sel") ||
               transcript.includes("play s e l") || transcript.includes("play sel") ||
               transcript.includes("friday play selayeru song")) {
        respond("Yes sir, playing Selayeru-Paduthunte", () => {
            playSongByTitle("Selayeru-Paduthunte");
        });
        return;
    } else if (transcript.includes("friday play some songs") || transcript.includes("play some songs") ||
               transcript.includes("friday play songs") || transcript.includes("play songs") ||
               transcript.includes("friday play song") || transcript.includes("play song")) {
        respond(`Yes sir. Playing "${playlist[currentSongIndex].title}"`, () => {
            playSong(currentSongIndex);
        });
        return;
    } else if (transcript.includes("friday resume") || 
               transcript.includes("resume") || transcript.includes("play")) {
        resumeSong();
        respond(`yes sir now i Resuming "${playlist[currentSongIndex].title}"`);
        return;
    } else if (transcript.includes("friday next song") || transcript.includes("next song") ||
               transcript.includes("friday could you play next song") || transcript.includes("could you play next song") ||
               transcript.includes("friday play next song") || transcript.includes("play next song")) {
        playNextSong();
        respond(`yes sir now Playing "${playlist[currentSongIndex].title}"`);
        return;
    } else if (transcript.includes("friday previous song") || transcript.includes("previous song") || 
               transcript.includes("friday play before song") || transcript.includes("play previous song") || 
               transcript.includes("friday play previous song")) {
        playPreviousSong();
        respond(`yes now iam Playing "${playlist[currentSongIndex].title}"`);
        return;
    } else if (transcript.includes("friday repeat") || transcript.includes("repeat") ||
               transcript.includes("friday turn on the repeat mode song") || 
               transcript.includes("turn on the repeat mode song") ||
               transcript.includes("friday turn on the repeat mode fot this song") || 
               transcript.includes("turn on the repeat mode for this song") ||
               transcript.includes("friday turn on repeat mode") || transcript.includes("turn on repeat mode")) {
        toggleRepeat();
        respond(isRepeat ? "Repeat mode on" : "Repeat mode off");
        return;
    } else if (transcript.includes("mute") || transcript.includes("friday mute")) {
        document.getElementById("mute-btn").click();
        return;
    } else if (transcript.includes("unmute") || transcript.includes("friday unmute")) {
        document.getElementById("mute-btn").click();
        return;
    } else if (transcript.includes("friday sleep") || transcript.includes("sleep")) {
        const responses = ["..Ok sir, going to sleep mode.", ".. ok sir, sleep mode activated."];
        respond(responses[Math.floor(Math.random() * responses.length)]);
        isActive = false;
        pauseSong();
        return;
    } else if (transcript.includes("friday wait") || transcript.includes("wait")) {
        respond("Going back to sleep. Say 'Friday' to wake me!");
        isActive = false;
        return;
    } else if (transcript.includes("friday stop the song") || transcript.includes("stop the song") || 
               transcript.includes("stop")) {
        respond("Stopping the song.", stopSong);
        return;
    } else if (transcript.includes('hi friday')) {
        const responses = ["Hi sir, what can I do for you sir?", "Hello sir, how can I assist you?", 
                           "hi sir! do you Need any help sir?", 
                           "Hi sir, what’s on your mind sir did you want me to do something?"];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        respond(randomResponse);
        return;
    } else if (transcript.includes('who are you')) {
        const responses = ["I'm Friday, your virtual assistant, created by Mr. Hemanthravi. I'm here to help you with anything you need.",
            "My name is Friday. I’m a smart assistant designed by Mr. Hemanthravi, built to assist you efficiently.",
            "I'm Friday — a digital assistant built by Mr. Hemanthravi, proudly working under the OpenPageFriday project at K.EHBM.",
            "Greetings! I’m Friday — a smart assistant running on custom logic developed by Mr. Hemanthravi, designed to enhance your digital experience.",
            "I am Friday: a conversational AI built by Mr. Hemanthravi. I operate under OpenPageFriday, a tech wing of K.EHBM.",
            "I'm Friday, your intelligent assistant. Powered by purpose, coded with care by Mr. Hemanthravi, and part of the OpenPageFriday system."];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        respond(randomResponse);
        return;
    }

    // === AI ===
    // Move Google Gemini before Google Search to avoid overlap
    if (
        transcript.includes("open gemini") || transcript.includes("friday open gemini") || 
        transcript.includes("open gemini friday") || transcript.includes("open google gemini") || 
        transcript.includes("friday open google gemini") || transcript.includes("open google gemini friday")
    ) {
        const responses = [
            "Sure, opening google gemini!","Here you go, google gemini is loading!","Launching google gemini for you.",
            "Opening google gemini","Yes sir, loading google gemini now."
        ];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://gemini.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === AI ===
    // Move Google Gemini before Google Search to avoid overlap
    if (
        transcript.includes("open youtube") || transcript.includes("friday open youtube") || 
        transcript.includes("open youtube friday") 
    ) {
        const responses = [
            "Sure, opening youtube!","Here you go, youtube is loading!","Launching youtube for you.",
            "Opening youtube, enjoy!","Yes sir, loading youtube now."
        ];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://youtube.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    

    // === GOOGLE DRIVE ===
    if (
        transcript.includes("open google drive") || transcript.includes("friday open google drive") ||
        transcript.includes("open google drive friday") || transcript.includes("open drive") ||
        transcript.includes("open drive friday") || transcript.includes("friday open drive")
    ) {
        const responses = ["Sure sir, opening Google Drive!" , "Here you go sir, Google Drive is loading!" , 
                           "Yes sir,Launching Google Drive for you." , "Ok sir, Opening Google Drive!" , 
                           "Yes sir, Opening Google Drive now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://drive.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE MAPS ===
    if (
        transcript.includes("open google maps") || transcript.includes("friday open google maps") ||
        transcript.includes("open google maps friday") || transcript.includes("open maps") ||
        transcript.includes("open maps friday") || transcript.includes("friday open maps")
    ) {
        const responses = ["Sure sir, opening Google maps!" , "Here you go sir, Google maps is loading!" , 
                           "Yes sir,Launching Google maps for you." , "Ok sir, Opening Google maps!" , 
                           "Yes sir, Opening Google maps now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://www.google.com/maps/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE PLAYSTORE ===
    if (
        transcript.includes("open google playstore") || transcript.includes("friday open google playstore") ||
        transcript.includes("open google playstore friday") || transcript.includes("open playstore") ||
        transcript.includes("open playstore friday") || transcript.includes("friday open playstore")
    ) {
        const responses = ["Sure sir, opening Google playstore!" , "Here you go sir, Google playstore is loading!" , 
                           "Yes sir,Launching Google playstore for you." , "Ok sir, Opening Google playstore!" , 
                           "Yes sir, Opening Google playstore now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://play.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    
    }
    














    
    // === GOOGLE NEWS ===
    if (
        transcript.includes("open google news") || transcript.includes("friday open google news") ||
        transcript.includes("open google news friday")
    ) {
        const responses = ["Sure sir, opening Google news!" , "Here you go sir, Google news is loading!" , 
                           "Yes sir,Launching Google news for you." , "Ok sir, Opening Google news!" , 
                           "Yes sir, Opening Google news now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://news.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE GMAIL ===
    if (
        transcript.includes("open google gmail") || transcript.includes("friday open google gmail") ||
        transcript.includes("open google gmail friday") || transcript.includes("open gmail") ||
        transcript.includes("open gmail friday") || transcript.includes("friday open gmail")
    ) {
        const responses = ["Sure sir, opening Google gmail!" , "Here you go sir, Google gmail is loading!" , 
                           "Yes sir,Launching Google gmail for you." , "Ok sir, Opening Google gmail!" , 
                           "Yes sir, Opening Google gmail now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://mail.google.com", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE MEET ===
    if (
        transcript.includes("open google meet") || transcript.includes("friday open google meet") ||
        transcript.includes("open google meet friday") || transcript.includes("open meet") ||
        transcript.includes("open meet friday") || transcript.includes("friday open meet")
    ) {
        const responses = ["Sure sir, opening Google meet!" , "Here you go sir, Google meet is loading!" , 
                           "Yes sir,Launching Google meet for you." , "Ok sir, Opening Google meet!" , 
                           "Yes sir, Opening Google meet now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://meet.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE CALENDAR ===
    if (
        transcript.includes("open google calendar") || transcript.includes("friday open google calendar") ||
        transcript.includes("open google calendar friday") || transcript.includes("open calendar") ||
        transcript.includes("open calendar friday") || transcript.includes("friday open calendar")
    ) {
        const responses = ["Sure sir, opening Google calendar!" , "Here you go sir, Google calendar is loading!" , 
                           "Yes sir,Launching Google calendar for you." , "Ok sir, Opening Google calendar!" , 
                           "Yes sir, Opening Google calendar now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://calendar.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE TRANSLATE ===
    if (
        transcript.includes("open google translate") || transcript.includes("friday open google translate") ||
        transcript.includes("open google translate friday") || transcript.includes("open translate") ||
        transcript.includes("open translate friday") || transcript.includes("friday open translate")
    ) {
        const responses = ["Sure sir, opening Google translate!" , "Here you go sir, Google translate is loading!" , 
                           "Yes sir,Launching Google translate for you." , "Ok sir, Opening Google translate!" , 
                           "Yes sir, Opening Google translate now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://translate.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE PHOTOS ===
    if (
        transcript.includes("open google photos") || transcript.includes("friday open google photos") ||
        transcript.includes("open google photos friday") || transcript.includes("open photos") ||
        transcript.includes("open photos friday") || transcript.includes("friday open photos")
    ) {
        const responses = ["Sure sir, opening Google photos!" , "Here you go sir, Google photos is loading!" , 
                           "Yes sir,Launching Google photos for you." , "Ok sir, Opening Google photos!" , 
                           "Yes sir, Opening Google photos now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://photos.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE FINANCE ===
    if (
        transcript.includes("open google finance") || transcript.includes("friday open google finance") ||
        transcript.includes("open google finance friday") || transcript.includes("open finance") ||
        transcript.includes("open finance friday") || transcript.includes("friday open finance")
    ) {
        const responses = ["Sure sir, opening Google finance!" , "Here you go sir, Google finance is loading!" , 
                           "Yes sir,Launching Google finance for you." , "Ok sir, Opening Google finance!" , 
                           "Yes sir, Opening Google finance now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://www.google.com/finance/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE DOCS ===
    if (
        transcript.includes("open google docs") || transcript.includes("friday open google docs") ||
        transcript.includes("open google docs friday") || transcript.includes("open docs") ||
        transcript.includes("open docs friday") || transcript.includes("friday open docs")
    ) {
        const responses = ["Sure sir, opening Google docs!" , "Here you go sir, Google docs is loading!" , 
                           "Yes sir,Launching Google docs for you." , "Ok sir, Opening Google docs!" , 
                           "Yes sir, Opening Google docs now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://docs.google.com", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE SHEETS ===
    if (
        transcript.includes("open google sheets") || transcript.includes("friday open google sheets") ||
        transcript.includes("open google sheets friday") || transcript.includes("open sheets") ||
        transcript.includes("open sheets friday") || transcript.includes("friday open sheets")
    ) {
        const responses = ["Sure sir, opening Google sheets!" , "Here you go sir, Google sheets is loading!" , 
                           "Yes sir,Launching Google sheets for you." , "Ok sir, Opening Google sheets!" , 
                           "Yes sir, Opening Google sheets now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://sheets.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE SLIDES ===
    if (
        transcript.includes("open google slides") || transcript.includes("friday open google slides") ||
        transcript.includes("open google slides friday") || transcript.includes("open slides") ||
        transcript.includes("open slides friday") || transcript.includes("friday open slides")
    ) {
        const responses = ["Sure sir, opening Google slides!" , "Here you go sir, Google slides is loading!" , 
                           "Yes sir,Launching Google slides for you." , "Ok sir, Opening Google slides!" , 
                           "Yes sir, Opening Google slides now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://slides.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE BOOKS ===
    if (
        transcript.includes("open google books") || transcript.includes("friday open google books") ||
        transcript.includes("open google books friday") || transcript.includes("open books") ||
        transcript.includes("open books friday") || transcript.includes("friday open books")
    ) {
        const responses = ["Sure sir, opening Google books!" , "Here you go sir, Google books is loading!" , 
                           "Yes sir,Launching Google books for you." , "Ok sir, Opening Google books!" , 
                           "Yes sir, Opening Google books now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://books.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE BLOGGER ===
    if (
        transcript.includes("open google blogger") || transcript.includes("friday open google blogger") ||
        transcript.includes("open google blogger friday") || transcript.includes("open blogger") ||
        transcript.includes("open blogger friday") || transcript.includes("friday open blogger")
    ) {
        const responses = ["Sure sir, opening Google blogger!" , "Here you go sir, Google blogger is loading!" , 
                           "Yes sir,Launching Google blogger for you." , "Ok sir, Opening Google blogger!" , 
                           "Yes sir, Opening Google blogger now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://www.blogger.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE KEEP ===
    if (
        transcript.includes("open google keep") || transcript.includes("friday open google keep") ||
        transcript.includes("open google keep friday") || transcript.includes("open keep") ||
        transcript.includes("open keep friday") || transcript.includes("friday open keep") ||
        transcript.includes("open keep google notes") || transcript.includes("friday open google notes") || 
        transcript.includes("open google notes friday")
    ) {
        constVisualize
        const responses = ["Sure sir, opening Google keep!" , "Here you go sir, Google keep is loading!" , 
                           "Yes sir,Launching Google keep for you." , "Ok sir, Opening Google keep!" , 
                           "Yes sir, Opening Google keep now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://keep.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE EARTH ===
    if (
        transcript.includes("open google earth") || transcript.includes("friday open google earth") ||
        transcript.includes("open google earth friday")
    ) {
        const responses = ["Sure sir, opening Google earth!" , "Here you go sir, Google earth is loading!" , 
                           "Yes sir,Launching Google earth for you." , "Ok sir, Opening Google earth!" , 
                           "Yes sir, Opening Google earth now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://earth.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE CLASSROOM ===
    if (
        transcript.includes("open google classroom") || transcript.includes("friday open google classroom") ||
        transcript.includes("open google classroom friday") || transcript.includes("open classroom") ||
        transcript.includes("open classroom friday") || transcript.includes("friday open classroom")
    ) {
        const responses = ["Sure sir, opening Google classroom!" , "Here you go sir, Google classroom is loading!" , 
                           "Yes sir,Launching Google classroom for you." , "Ok sir, Opening Google classroom!" , 
                           "Yes sir, Opening Google classroom now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://classroom.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE ADS ===
    if (
        transcript.includes("open google ads") || transcript.includes("friday open google ads") ||
        transcript.includes("open google ads friday") || transcript.includes("open ads") ||
        transcript.includes("open ads friday") || transcript.includes("friday open ads")
    ) {
        const responses = ["Sure sir, opening Google ads!" , "Here you go sir, Google ads is loading!" , 
                           "Yes sir,Launching Google ads for you." , "Ok sir, Opening Google ads!" , 
                           "Yes sir, Opening Google ads now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://ads.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE ONE ===
    if (
        transcript.includes("open google one") || transcript.includes("friday open google one") ||
        transcript.includes("open google one friday") || transcript.includes("open one") ||
        transcript.includes("open one friday") || transcript.includes("friday open one")
    ) {
        const responses = ["Sure sir, opening Google one!" , "Here you go sir, Google one is loading!" , 
                           "Yes sir,Launching Google one for you." , "Ok sir, Opening Google one!" , 
                           "Yes sir, Opening Google one now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://one.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE FORMS ===
    if (
        transcript.includes("open google forms") || transcript.includes("friday open google forms") ||
        transcript.includes("open google forms friday") || transcript.includes("open forms") ||
        transcript.includes("open forms friday") || transcript.includes("friday open forms")
    ) {
        const responses = ["Sure sir, opening Google forms!" , "Here you go sir, Google forms is loading!" , 
                           "Yes sir,Launching Google forms for you." , "Ok sir, Opening Google forms!" , 
                           "Yes sir, Opening Google forms now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://docs.google.com/forms", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === CHROME WEB STORE ===
    if (
        transcript.includes("open google chrome web store") || transcript.includes("friday open google chrome web store") ||
        transcript.includes("open google chrome web store friday") || transcript.includes("open chrome web store") ||
        transcript.includes("open chrome web store friday") || transcript.includes("friday open chrome web store")
    ) {
        const responses = ["Sure sir, opening Google chrome web store!" , "Here you go sir, Google chrome web store is loading!" , 
                           "Yes sir,Launching Google chrome web store for you." , "Ok sir, Opening Google chrome web store!" , 
                           "Yes sir, Opening Google chrome web store now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://chromewebstore.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === GOOGLE PASSWORDS ===
    if (
        transcript.includes("open google passwords") || transcript.includes("friday open google passwords") ||
        transcript.includes("open google passwords friday")
    ) {
        const responses = ["Sure sir, opening Google passwords!" , "Here you go sir, Google passwords is loading!" , 
                           "Yes sir,Launching Google passwords for you." , "Ok sir, Opening Google passwords!" , 
                           "Yes sir, Opening Google passwords now."];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://passwords.google.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === AI ===
    if (
        transcript.includes("open chat gpt") || transcript.includes("friday open chat gpt") || 
        transcript.includes("open chat gpt friday") || transcript.includes("open chatgpt") || 
        transcript.includes("friday open chatgpt") || transcript.includes("open chatgpt friday")
    ) {
        const responses = [
            "Sure, opening chat gpt!","Here you go, chat gpt is loading!","Launching chat gpt for you.",
            "Opening chat gpt, enjoy!","Yes sir, loading chat gpt now."
        ];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://chatgpt.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    } else if (
        transcript.includes("open claude") || transcript.includes("friday open claude") || 
        transcript.includes("open claude friday")
    ) {
        const responses = [
            "Sure, opening claude!","Here you go, claude is loading!","Launching claude for you.",
            "Opening claude, enjoy!","Yes sir, loading claude now."
        ];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://claude.ai/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    
    
    
    
    
    
    
    
    
        
    } else if (
        transcript.includes("open grok") || transcript.includes("friday open grok") || 
        transcript.includes("open grok friday")
    ) {
        const responses = [
            "Sure, opening grok!","Here you go, grok is loading!","Launching grok for you.",
            "Opening grok, enjoy!","Yes sir, loading grok now."
        ];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://grok.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;

    } else if (
        transcript.includes("open perplexity") || transcript.includes("friday open perplexity") || 
        transcript.includes("open perplexity friday")
    ) {
        const responses = [
            "Sure, opening perplexity!","Here you go, perplexity is loading!","Launching perplexity for you.",
            "Opening perplexity, enjoy!","Yes sir, loading perplexity now."
        ];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://www.perplexity.ai/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    } else if (
        transcript.includes("open deepseek") || transcript.includes("friday open deepseek") || 
        transcript.includes("open deepseek friday") || transcript.includes("open deep seek") || 
        transcript.includes("friday open deep seek") || transcript.includes("open deep seek friday") ||
        transcript.includes("open deepseek ai") || transcript.includes("friday open deepseek ai") || 
        transcript.includes("open deepseek ai friday") || transcript.includes("open deep seek ai") || 
        transcript.includes("friday open deep seek ai") || transcript.includes("open deep seek ai friday")
    ) {
        const responses = [
            "Sure, opening DeepSeek AI!","Here you go, DeepSeek AI is loading!","Launching DeepSeek AI for you.",
            "Opening DeepSeek AI, enjoy!","Yes sir, loading DeepSeek AI now."
        ];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open("https://deepseek.com/", "_blank");
            calculator.classList.remove('active');
        });
        return;
    }

    // === Indian News Apps ===
   if (
    transcript.includes("open times of india") || transcript.includes("friday open times of india") ||
    transcript.includes("start times of india") || transcript.includes("launch times of india")
) {
    const responses = [
        "Opening Times of India!",
        "Loading the latest news for you!",
        "Launching Times of India now.",
        "Yes sir, opening Times of India.",
        "Here comes Times of India!"
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://timesofindia.indiatimes.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open ndtv") || transcript.includes("friday open ndtv") ||
    transcript.includes("start ndtv") || transcript.includes("launch ndtv")
) {
    const responses = [
        "Opening NDTV for you!",
        "Loading NDTV news now.",
        "Sure sir, NDTV is coming up!",
        "Launching NDTV!",
        "NDTV is on the way, sir."
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://www.ndtv.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open aaj tak") || transcript.includes("friday open aaj tak") ||
    transcript.includes("start aaj tak") || transcript.includes("launch aaj tak")
) {
    const responses = [
        "Opening Aaj Tak!",
        "Loading Aaj Tak news now.",
        "Sure, launching Aaj Tak.",
        "Yes sir, Aaj Tak is coming up.",
        "Opening Aaj Tak for headlines."
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://www.aajtak.in", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open indian express") || transcript.includes("friday open indian express") ||
    transcript.includes("start indian express") || transcript.includes("launch indian express")
) {
    const responses = [
        "Opening Indian Express!",
        "Here you go, Indian Express is loading.",
        "Launching Indian Express now.",
        "Sure sir, loading Indian Express.",
        "Opening latest from Indian Express!"
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://indianexpress.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
}

// === Indian OTT Apps ===
if (
    transcript.includes("open jiocinema") || transcript.includes("friday open jiocinema") ||
    transcript.includes("start jiocinema") || transcript.includes("launch jiocinema")
) {
    const responses = [
        "Opening JioCinema now!",
        "JioCinema is loading, sir.",
        "Launching JioCinema for you.",
        "Sure, here comes JioCinema!",
        "Yes sir, JioCinema is opening!"
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://www.jiocinema.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open hotstar") || transcript.includes("friday open hotstar") ||
    transcript.includes("start hotstar") || transcript.includes("launch hotstar")
) {
    const responses = [
        "Opening Disney+ Hotstar!",
        "Sure sir, launching Hotstar now.",
        "Here you go, Hotstar is loading.",
        "Yes sir, opening Hotstar.",
        "Hotstar is on the way!"
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://www.hotstar.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open sonyliv") || transcript.includes("friday open sonyliv") ||
    transcript.includes("start sonyliv") || transcript.includes("launch sonyliv")
) {
    const responses = [
        "Opening SonyLIV!",
        "Sure sir, launching SonyLIV now.",
        "SonyLIV is loading!",
        "Launching SonyLIV for entertainment.",
        "Opening SonyLIV now, enjoy!"
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://www.sonyliv.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open zee5") || transcript.includes("friday open zee5") ||
    transcript.includes("start zee5") || transcript.includes("launch zee5")
) {
    const responses = [
        "Opening ZEE5 now!",
        "Sure sir, loading ZEE5.",
        "Here comes ZEE5 for your entertainment!",
        "Yes sir, ZEE5 is opening.",
        "Launching ZEE5 now."
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://www.zee5.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
}

// === Shopping Apps ===
if (
    transcript.includes("open amazon") || transcript.includes("friday open amazon") ||
    transcript.includes("start amazon") || transcript.includes("launch amazon")
) {
    const responses = [
        "Sure, opening Amazon!",
        "Here you go, Amazon is loading!",
        "Launching Amazon for you.",
        "Opening Amazon, happy shopping!",
        "Yes sir, loading Amazon now."
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://www.amazon.in", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open flipkart") || transcript.includes("friday open flipkart") ||
    transcript.includes("start flipkart") || transcript.includes("launch flipkart")
) {
    const responses = [
        "Sure, opening Flipkart!",
        "Here you go, Flipkart is loading!",
        "Launching Flipkart for you.",
        "Opening Flipkart now.",
        "Yes sir, loading Flipkart now."
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://www.flipkart.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open myntra") || transcript.includes("friday open myntra") ||
    transcript.includes("start myntra") || transcript.includes("launch myntra")
) {
    const responses = [
        "Opening Myntra for you!",
        "Sure sir, launching Myntra.",
        "Here comes Myntra!",
        "Yes sir, Myntra is loading.",
        "Starting Myntra for you!"
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://www.myntra.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open ajio") || transcript.includes("friday open ajio") ||
    transcript.includes("start ajio") || transcript.includes("launch ajio")
) {
    const responses = [
        "Sure, opening AJIO!",
        "Here you go, AJIO is loading!",
        "Launching AJIO for you.",
        "Opening AJIO now.",
        "Yes sir, loading AJIO now."
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://www.ajio.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
}

// === Music Apps ===
if (
    transcript.includes("open spotify") || transcript.includes("friday open spotify") ||
    transcript.includes("start spotify") || transcript.includes("launch spotify")
) {
    const responses = [
        "Playing Spotify for you!",
        "Sure, launching Spotify!",
        "Here you go, Spotify is opening!",
        "Opening Spotify now.",
        "Yes sir, loading Spotify."
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://open.spotify.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open gaana") || transcript.includes("friday open gaana") ||
    transcript.includes("start gaana") || transcript.includes("launch gaana")
) {
    const responses = [
        "Sure, opening Gaana!",
        "Here you go, Gaana is launching!",
        "Playing Gaana for you.",
        "Opening Gaana now.",
        "Yes sir, Gaana is loading!"
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://gaana.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open jiosaavn") || transcript.includes("friday open jiosaavn") ||
    transcript.includes("start jiosaavn") || transcript.includes("launch jiosaavn")
) {
    const responses = [
        "Opening JioSaavn for you!",
        "Sure sir, launching JioSaavn.",
        "Here comes JioSaavn!",
        "Yes sir, JioSaavn is loading.",
        "Starting JioSaavn for you!"
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://www.jiosaavn.com", "_blank");
        calculator.classList.remove('active');
    });
    return;
} else if (
    transcript.includes("open wynk") || transcript.includes("friday open wynk") ||
    transcript.includes("start wynk") || transcript.includes("launch wynk")
) {
    const responses = [
        "Sure, opening Wynk Music!",
        "Launching Wynk for you.",
        "Here comes Wynk Music!",
        "Opening Wynk now.",
        "Yes sir, Wynk is loading."
    ];
    respond(responses[Math.floor(Math.random() * responses.length)], () => {
        window.open("https://wynk.in/music", "_blank");
        calculator.classList.remove('active');
    });
    return;
}


    // === SEARCH ===
    if (transcript.includes("search google for")) {
        const query = transcript.split("search google for")[1].trim();
        const responses = [
            `Searching Google for ${query}`,
            `Got it. Looking up ${query} on Google.`,
            `Here are the Google results for ${query}`,
            `Sure, checking Google for ${query}`,
            `${query}? Let's Google it.`
        ];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
        });
        return;
    } else if (transcript.includes("search youtube for")) {
        const query = transcript.split("search youtube for")[1].trim();
        const responses = [
            `Searching YouTube for ${query}`,
            `Here's what I found on YouTube for ${query}`,
            `Loading YouTube results for ${query}`,
            `Ok, finding ${query} on YouTube.`,
            `Sure, searching YouTube.`
        ];
        respond(responses[Math.floor(Math.random() * responses.length)], () => {
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
        });
        return;
    }
    // === OTHER COMMANDS ===
    if (transcript.includes('friday who is') || transcript.includes('friday what is') || 
        transcript.includes('tell me about') || transcript.includes('who is') || 
        transcript.includes('what is')) {
        const query = transcript.replace(/friday who is|friday what is|tell me about|who is|what is/gi, '').trim();
        fetchWikipediaSummary(query);
        calculator.classList.remove('active');
        return;
    } else if (transcript.includes('friday tell me time') || transcript.includes('tell me time') || 
               transcript.includes('friday time') || transcript.includes('friday whats the time now') || 
               transcript.includes('whats the time now') || transcript.includes('friday whats the time') || 
               transcript.includes('whats the time')) {
        tellTime();
        return;
    } else if (transcript.includes('tell me today date') || transcript.includes('friday tell me today date') || 
               transcript.includes('friday, today date') || transcript.includes('today date')) {
        tellDate();
        return;
    } else if (transcript.includes('friday hide calculator') || transcript.includes('friday hide the maths') || 
               transcript.includes('hide the maths') || transcript.includes('hide calculator')) {
        calculator.classList.remove('active');
        respond("Calculator hidden.");
        return;
    } else if (transcript.match(/friday (solve|calculate)\s+(.+)/i)) {
        const match = transcript.match(/friday (solve|calculate)\s+(.+)/i);
        if (match) {
            const expression = match[2].trim();
            calculator.classList.add('active');
            solveMathExpression(expression);
        }
        return;
    } else if (transcript.match(/friday (\d+)\s*(multiplies|times|x|\*|\+|plus|-|minus|divided by|\/)\s*(\d+)/)) {
        const match = transcript.match(/friday (\d+)\s*(multiplies|times|x|\*|\+|plus|-|minus|divided by|\/)\s*(\d+)/);
        if (match) {
            const a = parseInt(match[1]);
            const op = match[2].replace('multiplies', '*').replace('times', '*').replace('x', '*').replace('plus', '+').replace('minus', '-').replace('divided by', '/');
            const b = parseInt(match[3]);
            calculator.classList.add('active');
            solveMath(a, op, b);
        }
        return;
    } else if (transcript.includes('friday show calculator') || transcript.includes('show calculator')) {
        calculator.classList.add('active');
        respond("Calculator displayed.");
        return;
    } else {
        respond("I didn't understand that. Try again!");
    }
};

    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  
    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  
    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  
    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  
    
    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  
    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  
    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  
    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  
    
    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  
    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  
    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  
    //responces responces responces responces responces responces responces responces responces responces responces responces responces responces responces  




recognition.onend = () => {
    if (startBtn.disabled && !isSpeaking) {
        setTimeout(() => {
            try {
                recognition.start();
                status.textContent = "Restarting listener... Say 'Friday' to activate!";
            } catch (error) {
                console.log("Recognition restart failed:", error);
            }
        }, 100);
    }
};

recognition.onerror = (event) => {
    status.textContent = "Error occurred: " + event.error;
    if ((event.error === "no-speech" || event.error === "aborted") && !isSpeaking) recognition.start();
};




startBtn.addEventListener('click', () => {
    recognition.start();
    startBtn.disabled = true;
});

playBtn.addEventListener('click', () => {
    if (audioPlayer.paused && audioPlayer.currentTime > 0) {
        resumeSong();
    } else {
        playSong(currentSongIndex);
    }
});
pauseBtn.addEventListener('click', pauseSong);
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPreviousSong);
repeatBtn.addEventListener('click', toggleRepeat);

document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-value');
        if (value === '=') {
            calculate();
        } else if (value === 'C') {
            calcDisplay.value = '';
        } else {
            calcDisplay.value += value;
        }
    });
});

audioPlayer.addEventListener('ended', () => {
    if (isRepeat) {
        playSong(currentSongIndex);
    } else {
        playNextSong();
    }
});

audioPlayer.addEventListener('error', (e) => {
    status.textContent = "Error loading audio: " + e.target.error.message;
    console.error("Audio error:", e.target.error);
});
function respond(text, callback) {
    response.textContent = `Response: ${text}`;
    speak(text); // your speak function starts speech (does not block)

    // Slight delay (e.g. 1.5 seconds) to let speech start before opening website
    setTimeout(() => {
        if (callback) callback();
    }, 1500); 
}



function speak(text) {
    if (!isMuted) {
        if (isSpeaking || window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel(); // Clear any ongoing speech
        }
        currentUtterance = new SpeechSynthesisUtterance(text);
        isSpeaking = true;
        recognition.stop();
        currentUtterance.onend = () => {
            isSpeaking = false;
            currentUtterance = null;
            if (!isMuted) {
                try {
                    recognition.start();
                    console.log("Recognition restarted after speaking");
                } catch (error) {
                    console.error("Recognition restart failed after speech:", error);
                }
            }
        };
        window.speechSynthesis.speak(currentUtterance);
    } else {
        console.log("Speech skipped - assistant is muted");
    }
}





function playSong(index) {
    if (index >= 0 && index < playlist.length) {
        currentSongIndex = index;
        audioPlayer.src = playlist[currentSongIndex].url;
        audioPlayer.play().then(() => {
            status.textContent = `Playing "${playlist[currentSongIndex].title}"`;
            respond(`Playing ${playlist[currentSongIndex].title}`);
        }).catch((error) => {
            status.textContent = "Failed to play song: " + error.message;
            console.error("Play error:", error);
        });
    }
}

function pauseSong() {
    audioPlayer.pause();
    status.textContent = "Music paused";
    respond("Music paused");
}

function resumeSong() {
    audioPlayer.play().then(() => {
        status.textContent = `Resuming "${playlist[currentSongIndex].title}"`;
        respond(`Resuming ${playlist[currentSongIndex].title}`);
    }).catch((error) => {
        status.textContent = "Failed to resume song: " + error.message;
        console.error("Resume error:", error);
    });
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    playSong(currentSongIndex);
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(currentSongIndex);
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
    status.textContent = isRepeat ? "Repeat mode on" : "Repeat mode off";
    respond(isRepeat ? "Repeat mode on" : "Repeat mode off");
}

function openURL(url) {
    window.open(url, '_blank');
    respond(`Opening ${url.split('.')[1]}`);
}


function fetchWikipediaSummary(query) {
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.extract) {
                const link = `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`;
                respond(data.extract);
                resultDisplay.innerHTML = `<p>${data.extract.substring(0, 200)}...</p><a href="${link}" target="_blank">Read more on Wikipedia</a>`;
            } else {
                respond("I couldn't find any information on that.");
            }
        })
        .catch(error => {
            console.error('Error fetching Wikipedia data:', error);
            respond("Sorry, I couldn't fetch the information.");
        });
}

function tellTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    respond(`The current time is ${timeString}.`);
}

function tellDate() {
    const now = new Date();
    const dateString = now.toDateString();
    respond(`Today's date is ${dateString}.`);
}

function solveMath(a, op, b) {
    let result;
    let steps = `${a} ${op === '*' ? '×' : op === '/' ? '÷' : op} ${b} = `;
    switch (op) {
        case '+':
            result = a + b;
            steps += result;
            break;
        case '-':
            result = a - b;
            steps += result;
            break;
        case '*':
            result = a * b;
            steps += result;
            break;
        case '/':
            result = a / b;
            steps += result;
            break;
    }
    calcDisplay.value = steps;
    respond(`The result of ${a} ${op === '*' ? 'times' : op === '/' ? 'divided by' : op} ${b} is ${result}.`);
}

function solveMathExpression(expression) {
    try {
        expression = expression
            .replace(/multiplies|times|x/gi, '*')
            .replace(/divided by/gi, '/')
            .replace(/plus/gi, '+')
            .replace(/minus/gi, '-')
            .replace(/\s+/g, '');

        // Tokenize the expression
        const tokens = expression.match(/(\d+\.?\d*|[+\-*/])/g);
        if (!tokens || !/^[0-9+\-*/.]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        // First pass: Handle multiplication and division
        let i = 0;
        while (i < tokens.length) {
            if (tokens[i] === '*' || tokens[i] === '/') {
                const a = parseFloat(tokens[i - 1]);
                const b = parseFloat(tokens[i + 1]);
                const result = tokens[i] === '*' ? a * b : a / b;
                tokens.splice(i - 1, 3, result);
                i--;
            }
            i++;
        }

        // Second pass: Handle addition and subtraction
        let result = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
            const op = tokens[i];
            const b = parseFloat(tokens[i + 1]);
            result = op === '+' ? result + b : result - b;
        }

        const steps = `${expression} = ${result}`;
        calcDisplay.value = steps;
        respond(`The result of ${expression.replace(/\*/g, ' times ').replace(/\//g, ' divided by ').replace(/\+/g, ' plus ').replace(/\-/g, ' minus ')} is ${result}.`);
        return result;
    } catch (error) {
        respond("Sorry, I couldn’t solve that. Please check the expression and try again!");
        calcDisplay.value = "Error";
        console.error("Math error:", error);
        return null;
    }
}



function calculate() {
    const expression = calcDisplay.value;
    const match = expression.match(/(\d+)\s*([+\-×÷*\/])\s*(\d+)/);
    if (match) {
        const a = parseInt(match[1]);
        const op = match[2].replace('×', '*').replace('÷', '/');
        const b = parseInt(match[3]);
        solveMath(a, op, b);
        speakAnswer(result);
    } else {
        respond("Invalid expression. Please use numbers and operators (+, -, ×, ÷).");
    }
}
// Updated Song Control Functions
    function playSong(index) {
        if (index >= 0 && index < playlist.length) {
            currentSongIndex = index;
            audioPlayer.src = playlist[currentSongIndex].url;
            audioPlayer.play().then(() => {
                status.textContent = `Playing "${playlist[currentSongIndex].title}"`;
            }).catch((error) => {
                status.textContent = "Failed to play song: " + error.message;
                console.error("Play error:", error);
            });
        }
    }
    
    function playSongByTitle(title) {
        const songIndex = playlist.findIndex(song => song.title.toLowerCase() === title.toLowerCase());
        if (songIndex !== -1) {
            currentSongIndex = songIndex;
            playSong(currentSongIndex);
        } else {
            respond("Song not found in the playlist!");
        }
    }
    
    function stopSong() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        status.textContent = "Stopped the song.";
    }

    function pauseSong() {
        audioPlayer.pause();
        status.textContent = "Music paused";
    }
    function resumeSong() {
        audioPlayer.play().then(() => {
            status.textContent = `Resuming "${playlist[currentSongIndex].title}"`;
        }).catch((error) => {
            status.textContent = "Failed to resume song: " + error.message;
            console.error("Resume error:", error);
        });
    }


    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        playSong(currentSongIndex);
    }

    function playPreviousSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        playSong(currentSongIndex);
    }
    function toggleRepeat() {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
        status.textContent = isRepeat ? "Repeat mode on" : "Repeat mode off";
    }

//timer settings

// Helper functions
// Update Helper Functions
// Helper functions
    function updateTimerDisplay(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function createTimerDisplay(timer) {
        const existing = document.getElementById(`timer-${timer.id}`);
        if (!existing) {
            const timerDiv = document.createElement('div');
            timerDiv.id = `timer-${timer.id}`;
            timerDiv.dataset.name = timer.name; // Store name for display
            timerDiv.textContent = `${timer.name}: 00:00`;
            document.getElementById('timers-container').appendChild(timerDiv);
        }
    }

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        let timeStr = '';
        if (h > 0) timeStr += `${h} hour${h > 1 ? 's' : ''} `;
        if (m > 0) timeStr += `${m} minute${m > 1 ? 's' : ''} `;
        if (s > 0) timeStr += `${s} second${s > 1 ? 's' : ''}`;
        return timeStr.trim();
    }

    function showNotification(title, message) {
        if (Notification.permission === "granted") {
            new Notification(title, { body: message });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(title, { body: message });
                }
            });
        }
    }




    // for open websites
    function openURL(url) {
        window.open(url, '_blank');
    }