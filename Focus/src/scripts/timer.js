import { acordaPorra } from './sounds.js'

const FOCUS_TIME = 25
const SHORT_BREAK_TIME = 5
const LONG_BREAK_TIME = 15

const context = {
  1: FOCUS_TIME,
  2: SHORT_BREAK_TIME,
  3: LONG_BREAK_TIME,
}

const timerDisplay = document.querySelector('.timer-card__time')
const timerForm = document.querySelector('.timer-card__form')
const timerButtonIcon = document.querySelector('.timer-card__form .icon')
const timerButton = timerForm.querySelector('.button')

let currentMode = '1'
let remainingSeconds = FOCUS_TIME
let intervalID = null

function startTimer() {
  timerButton.lastChild.textContent = 'Pausar sinal'
  timerButtonIcon.classList.replace('icon--play', 'icon--pause')

  intervalID = setInterval(() => {
    remainingSeconds--
    timerDisplay.textContent = formatTimer(remainingSeconds)

    if (remainingSeconds < 0) {
      pauseTimer()
      resetTimer(currentMode)
      acordaPorra()
    }
  }, 1000)
}

function pauseTimer() {
  timerButton.lastChild.textContent = 'Iniciar protocolo'
  timerButtonIcon.classList.replace('icon--pause', 'icon--play')
  clearInterval(intervalID)
  intervalID = null
}

timerForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (intervalID) pauseTimer()
  else startTimer()
})

function formatTimer(seconds) {
  const date = new Date(seconds * 1000)
  return date.toLocaleTimeString('pt-BR', {
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
  })
}

export function resetTimer(mode) {
  currentMode = mode
  if (intervalID) pauseTimer()
  remainingSeconds = context[mode]
  timerDisplay.textContent = formatTimer(remainingSeconds)
}
