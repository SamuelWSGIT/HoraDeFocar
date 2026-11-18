export const DEFAULT_POMODORO_MODE = '1';

export const POMODORO_MODES = Object.freeze({
  1: {
    durationInSeconds: 25 * 60,
    imageUrl: '/mode-1.png',
    label: 'Foco // MODO ATAQUE',
    title: 'Conexão estabelecida.',
    highlight: 'entre no modo ataque',
  },
  2: {
    durationInSeconds: 5 * 60,
    imageUrl: '/mode-2.png',
    label: 'Descanso curto // RECARGA',
    title: 'Sinal estabilizado.',
    highlight: 'recarregue por alguns minutos',
  },
  3: {
    durationInSeconds: 15 * 60,
    imageUrl: '/mode-3.png',
    label: 'Descanso longo // REBOOT',
    title: 'Reboot em andamento.',
    highlight: 'volte mais forte para a rede',
  },
});

export const POMODORO_MODE_IDS = Object.keys(POMODORO_MODES);

export const DEFAULT_POMODORO_DURATIONS_IN_SECONDS = Object.fromEntries(
  POMODORO_MODE_IDS.map((modeId) => [modeId, POMODORO_MODES[modeId].durationInSeconds]),
);

export function getPomodoroMode(mode) {
  return POMODORO_MODES[mode] ?? POMODORO_MODES[DEFAULT_POMODORO_MODE];
}
