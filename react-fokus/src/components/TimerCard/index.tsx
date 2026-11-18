import { useActionState, useState } from 'react';
import type { Dispatch, FormEvent, SetStateAction } from 'react';
import { POMODORO_MODE_IDS, getPomodoroMode } from '../../constants/pomodoroModes';
import { useMusic } from '../../hooks/useMusic';
import { useTimer } from '../../hooks/useTimer';
import { combineDuration, splitDuration } from '../../utils/time';
import { Button } from '../Button';
import styles from './TimerCard.module.css';

interface TimerCardProps {
  durationsInSeconds: Record<string, number>;
  mode?: string;
  onDurationsChange?: (durations: Record<string, number>) => void;
  onModeChange?: (mode: string) => void;
  durationInSeconds: number;
}

type DurationUnit = 'hours' | 'minutes' | 'seconds';

interface DurationParts {
  hours: string;
  minutes: string;
  seconds: string;
}

interface DurationField {
  key: DurationUnit;
  label: string;
  max: number;
}

type DurationDraft = Record<string, DurationParts>;

export function TimerCard({
  durationsInSeconds,
  mode = '1',
  onDurationsChange,
  onModeChange,
  durationInSeconds,
}: TimerCardProps) {
  const [isMusicEnabled, setIsMusicEnabled] = useMusic() as [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ];
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [draftDurations, setDraftDurations] = useState(() =>
    createDurationDraft(durationsInSeconds),
  );
  const { formattedTime, isRunning, toggleTimer } = useTimer(mode, durationInSeconds);

  function cancelSettings() {
    setDraftDurations(createDurationDraft(durationsInSeconds));
    setIsSettingsOpen(false);
  }

  const [, modeAction, isModePending] = useActionState(
    async (_previousState: string, formData: FormData): Promise<string> => {
    const nextMode = String(formData.get('mode') ?? mode);
    onModeChange?.(nextMode);
    return nextMode;
    }, mode);
  const [, settingsAction, isSettingsPending] = useActionState(
    async (_previousState: string | null, formData: FormData): Promise<string> => {
    const action = String(formData.get('action') ?? 'save');

    if (action === 'cancel') {
      cancelSettings();
      return action;
    }

    const nextDurations = Object.fromEntries(
      POMODORO_MODE_IDS.map((modeId) => [
        modeId,
        combineDuration({
          hours: Number(formData.get(`${modeId}-hours`)),
          minutes: Number(formData.get(`${modeId}-minutes`)),
          seconds: Number(formData.get(`${modeId}-seconds`)),
        }),
      ]),
    );

    onDurationsChange?.(nextDurations);
    setIsSettingsOpen(false);
    return action;
    }, null);

  function handleTimerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toggleTimer();
  }

  function handleDurationChange(modeId: string, unit: DurationUnit, value: string) {
    setDraftDurations((currentDurations) => ({
      ...currentDurations,
      [modeId]: {
        ...currentDurations[modeId],
        [unit]: value,
      },
    }));
  }

  function toggleSettings() {
    if (!isSettingsOpen) {
      setDraftDurations(createDurationDraft(durationsInSeconds));
    }

    setIsSettingsOpen(!isSettingsOpen);
  }

  return (
    <section aria-label="Timer" className={styles.card}>
      <form action={modeAction} className={styles.tabsForm}>
        <div role="tablist" aria-label="Tipo de timer" className={styles.tabs}>
          {POMODORO_MODE_IDS.map((modeId) => (
            <button
              aria-selected={modeId === mode}
              className={`${styles.tab} ${modeId === mode ? styles.active : ''}`}
              disabled={isModePending}
              key={modeId}
              name="mode"
              role="tab"
              type="submit"
              value={modeId}
            >
              {getPomodoroMode(modeId).label}
            </button>
          ))}
        </div>
      </form>

      <button
        aria-controls="pomodoro-settings"
        aria-expanded={isSettingsOpen}
        aria-label={`Tempo restante: ${formattedTime}. Clique para ajustar os tempos.`}
        className={styles.time}
        aria-live="polite"
        onClick={toggleSettings}
        title="Clique para ajustar os tempos"
        type="button"
      >
        {formattedTime}
      </button>

      {isSettingsOpen && (
        <form
          action={settingsAction}
          className={styles.settings}
          id="pomodoro-settings"
        >
          <fieldset className={styles.settingsFields}>
            <legend>Ajustar tempos</legend>
            {Object.keys(durationsInSeconds).map((modeId) => (
              <div className={styles.durationSetting} key={modeId}>
                <span className={styles.durationLabel}>{getPomodoroMode(modeId).label}</span>
                <div className={styles.durationInputs}>
                  {DURATION_FIELDS.map(({ key, label, max }) => (
                    <label className={styles.durationField} key={key}>
                      <span>{label}</span>
                      <input
                        max={max}
                        min="0"
                        name={`${modeId}-${key}`}
                        onChange={(event) => handleDurationChange(modeId, key, event.target.value)}
                        required
                        type="number"
                        value={draftDurations[modeId][key]}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>

          <div className={styles.settingsActions}>
            <button
              className={styles.cancelButton}
              disabled={isSettingsPending}
              formNoValidate
              name="action"
              type="submit"
              value="cancel"
            >
              Cancelar
            </button>
            <Button disabled={isSettingsPending} name="action" type="submit" value="save">
              Salvar tempos
            </Button>
          </div>
        </form>
      )}

      <label className={styles.musicToggle} htmlFor="toggle-music">
        <input
          checked={isMusicEnabled}
          className={styles.musicInput}
          id="toggle-music"
          onChange={(event) => setIsMusicEnabled(event.target.checked)}
          type="checkbox"
        />
        Trilha neural
      </label>

      <form className={styles.form} onSubmit={handleTimerSubmit}>
        <Button type="submit" icon={isRunning ? 'pause' : 'play'}>
          {isRunning ? 'Pausar sinal' : 'Iniciar protocolo'}
        </Button>
      </form>
    </section>
  );
}

const DURATION_FIELDS: DurationField[] = [
  { key: 'hours', label: 'Horas', max: 24 },
  { key: 'minutes', label: 'Minutos', max: 59 },
  { key: 'seconds', label: 'Segundos', max: 59 },
];

function createDurationDraft(durationsInSeconds: Record<string, number>): DurationDraft {
  const entries: Array<[string, DurationParts]> = Object.entries(durationsInSeconds).map(
    ([modeId, duration]) => {
      const parts = splitDuration(duration);

      return [
        modeId,
        {
          hours: String(parts.hours),
          minutes: String(parts.minutes),
          seconds: String(parts.seconds),
        },
      ];
    },
  );

  return Object.fromEntries(entries);
}
