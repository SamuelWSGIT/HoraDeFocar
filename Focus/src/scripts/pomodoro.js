import { resetTimer } from './timer.js'

const tabs = document.querySelectorAll('.timer-card__tab')
const page = document.querySelector('.page')
const modeImage = document.querySelector('.banner img')
const bannerTitleText = document.querySelector('.banner__title--text')
const bannerTitleHighlight = document.querySelector('.banner__title--highlight')

const contexto = {
  '1': { title: 'Conexao estabelecida.', highlight: 'entre no modo ataque' },
  '2': { title: 'Sinal estabilizado.', highlight: 'recarregue por alguns minutos' },
  '3': { title: 'Reboot em andamento.', highlight: 'volte mais forte para a rede' },
}

tabs.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    const mode = event.currentTarget.dataset.mode
    const modeContext = contexto[mode]

    page.dataset.mode = mode
    resetTimer(mode)
    bannerTitleText.textContent = modeContext.title
    bannerTitleHighlight.textContent = modeContext.highlight
    modeImage.setAttribute('src', `/mode-${mode}-cyberpunk.png`)

    tabs.forEach((currentTab) => {
      currentTab.disabled = false
      currentTab.classList.remove('timer-card__tab--active')
      currentTab.setAttribute('aria-selected', 'false')
    })

    event.currentTarget.disabled = true
    event.currentTarget.classList.add('timer-card__tab--active')
    event.currentTarget.setAttribute('aria-selected', 'true')
  })
})
