// script.js

// Dati iniziali const startButton = document.getElementById("startGame"); const overlay = document.getElementById("overlay"); const xpDisplay = document.getElementById("xp"); const xpNextDisplay = document.getElementById("xpNext"); const levelDisplay = document.getElementById("level"); const materialDisplay = document.getElementById("material"); const energyDisplay = document.getElementById("energy"); const dayDisplay = document.getElementById("currentDay"); const roomButtons = document.querySelectorAll(".room"); const actionsPanel = document.getElementById("actionsPanel"); const actionsList = document.getElementById("actionsList"); const roomTitle = document.getElementById("roomTitle"); const closeActions = document.getElementById("closeActions");

let xp = parseInt(localStorage.getItem("xp")) || 0; let level = parseInt(localStorage.getItem("level")) || 1; let energy = parseInt(localStorage.getItem("energy")) || 100; let currentDay = parseInt(localStorage.getItem("day")) || 1; let xpNext = level * 100; const maxEnergy = 100;

const materials = [ "Polvere", "Bronzo", "Argento", "Oro", "Diamante", "Iridio", "Platino", "Titanio", "Neon", "Ethereo" ];

// Azioni per stanza (semplificate per ora, verranno ampliate) const actions = { studio: [ { name: "Leggere un libro", xp: 10, energy: 5 }, { name: "Scrivere un appunto", xp: 5, energy: 3 }, { name: "Risolvere un problema", xp: 15, energy: 10 }, { name: "Pianificare la settimana", xp: 8, energy: 4 }, { name: "Rivedere appunti", xp: 6, energy: 4 }, { name: "Meditazione rapida", xp: 4, energy: -5 }, { name: "Bere acqua", xp: 0, energy: -10 } ], lavoro: [ { name: "Scrivere email", xp: 8, energy: 6 }, { name: "Completare attività", xp: 20, energy: 15 }, { name: "Organizzare documenti", xp: 10, energy: 7 } ], pulizie: [ { name: "Lavare piatti", xp: 5, energy: 5 }, { name: "Spazzare il pavimento", xp: 7, energy: 6 } ], creatività: [ { name: "Disegnare", xp: 12, energy: 8 }, { name: "Scrivere una poesia", xp: 10, energy: 7 } ], apprendimento: [ { name: "Guardare un documentario", xp: 12, energy: 6 }, { name: "Seguire un corso online", xp: 15, energy: 10 } ], finanze: [ { name: "Registrare una spesa", xp: 3, energy: 2 }, { name: "Aggiungere un'entrata", xp: 4, energy: 1 } ] };

function updateUI() { xpDisplay.textContent = xp; levelDisplay.textContent = level; xpNext = level * 100; xpNextDisplay.textContent = xpNext; energyDisplay.textContent = energy; dayDisplay.textContent = currentDay; materialDisplay.textContent = materials[Math.min(materials.length - 1, Math.floor(level / 10))]; }

function gainXP(amount) { xp += amount; while (xp >= xpNext) { xp -= xpNext; level++; } updateUI(); saveGame(); }

function useEnergy(amount) { energy -= amount; if (energy < 0) energy = 0; updateUI(); saveGame(); }

function performAction(action) { gainXP(action.xp); useEnergy(action.energy); }

function showActions(room) { roomTitle.textContent = Stanza: ${room.charAt(0).toUpperCase() + room.slice(1)}; actionsList.innerHTML = ""; actions[room].forEach(action => { const btn = document.createElement("button"); btn.className = "action-button"; btn.innerHTML = ${action.name} <span class='action-xp'>+${action.xp} XP / -${action.energy} energia</span>; btn.onclick = () => performAction(action); actionsList.appendChild(btn); }); actionsPanel.classList.remove("hidden"); }

function saveGame() { localStorage.setItem("xp", xp); localStorage.setItem("level", level); localStorage.setItem("energy", energy); localStorage.setItem("day", currentDay); }

function resetEnergyAndDay() { const now = new Date(); const savedDate = localStorage.getItem("lastDate") || now.toDateString(); if (savedDate !== now.toDateString()) { energy = maxEnergy; currentDay++; localStorage.setItem("lastDate", now.toDateString()); saveGame(); } }

startButton.addEventListener("click", () => { overlay.style.display = "none"; updateUI(); });

roomButtons.forEach(button => { button.addEventListener("click", () => showActions(button.dataset.room)); });

closeActions.addEventListener("click", () => { actionsPanel.classList.add("hidden"); });

// Avviare e aggiornare il gioco resetEnergyAndDay(); updateUI();

// Timer per aggiornamento a mezzanotte setInterval(() => { resetEnergyAndDay(); updateUI(); }, 60000); // controlla ogni 60 secondi

  
