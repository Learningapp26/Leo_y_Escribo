import { useState } from 'react'
import {
    ArrowRight,
    Check,
    RotateCcw,
    Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import {
    jSyllableJoin,
    jSyllableOptions,
    jWordCompletion,
} from '../data/jActivities'
import { getLessonThemeClass } from '../data/lessonColors'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/completion.css'
import '../styles/selection.css'
import '../styles/syllables.css'

const PHASES = ['completar', 'formar']

function playIfAvailable(audio) {
    if (audio) playAudio(audio)
}

function ActividadJCompletarPage() {
    const [phaseIndex, setPhaseIndex] = useState(0)

    const [wordIndex, setWordIndex] = useState(0)
    const [
        selectedSyllable,
        setSelectedSyllable,
    ] = useState('')
    const [
        completionResult,
        setCompletionResult,
    ] = useState('')

    const [joinIndex, setJoinIndex] = useState(0)
    const [
        selectedJoinIds,
        setSelectedJoinIds,
    ] = useState([])
    const [joinResult, setJoinResult] = useState('')

    const phase = PHASES[phaseIndex]
    const themeClass = getLessonThemeClass('j')

    const currentWord =
        jWordCompletion[wordIndex]

    const currentJoin =
        jSyllableJoin[joinIndex]

    const joinOptions = currentJoin.syllables
        .map((syllable, index) => ({
            id: `${currentJoin.id}-${index}`,
            syllable,
        }))
        .reverse()

    const selectedJoinOptions =
        selectedJoinIds
            .map((id) =>
                joinOptions.find(
                    (option) => option.id === id,
                ),
            )
            .filter(Boolean)

    const checkCompletion = () => {
        if (!selectedSyllable) return

        const isCorrect =
            selectedSyllable === currentWord.answer

        setCompletionResult(
            isCorrect ? 'correct' : 'retry',
        )

        registrarProgreso({
            actividad: 'j-completar',
            correcto: isCorrect,
            detalle: {
                leccionId: 'j',
                fase: 'completar',
                ejercicioId: currentWord.word,
            },
        })

        if (isCorrect) {
            playIfAvailable(currentWord.audio)
        }
    }

    const retryCompletion = () => {
        setSelectedSyllable('')
        setCompletionResult('')
    }

    const nextCompletionWord = () => {
        setSelectedSyllable('')
        setCompletionResult('')

        if (
            wordIndex ===
            jWordCompletion.length - 1
        ) {
            setPhaseIndex(1)
            return
        }

        setWordIndex((current) => current + 1)
    }

    const selectJoinSyllable = (option) => {
        if (joinResult === 'correct') return

        setJoinResult('')

        setSelectedJoinIds((current) =>
            current.includes(option.id)
                ? current
                : [...current, option.id],
        )
    }

    const removeJoinSyllable = (id) => {
        if (joinResult === 'correct') return

        setJoinResult('')

        setSelectedJoinIds((current) =>
            current.filter(
                (selectedId) => selectedId !== id,
            ),
        )
    }

    const checkJoin = () => {
        if (
            selectedJoinIds.length !==
            currentJoin.syllables.length
        ) {
            return
        }

        const formedWord =
            selectedJoinOptions
                .map((option) => option.syllable)
                .join('')

        const isCorrect =
            formedWord === currentJoin.word

        setJoinResult(
            isCorrect ? 'correct' : 'retry',
        )

        registrarProgreso({
            actividad: 'j-completar',
            correcto: isCorrect,
            detalle: {
                leccionId: 'j',
                fase: 'formar',
                ejercicioId: currentJoin.id,
            },
        })

        if (isCorrect) {
            playIfAvailable(currentJoin.wordAudio)
        }
    }

    const resetJoin = () => {
        setSelectedJoinIds([])
        setJoinResult('')
    }

    const nextJoinWord = () => {
        setSelectedJoinIds([])
        setJoinResult('')

        if (
            joinIndex <
            jSyllableJoin.length - 1
        ) {
            setJoinIndex((current) => current + 1)
        }
    }

    const isJoinFinished =
        joinIndex === jSyllableJoin.length - 1 &&
        joinResult === 'correct'

    return (
        <main
            className={`page ${themeClass}`}
            aria-labelledby="j-completar-title"
        >
            <BackButton
                label="Volver a la lección"
                to="/lecciones/j"
            />

            <header className="text-center">
                <span className="text-ui-label">
                    Actividad 3
                </span>

                <h1 id="j-completar-title">
                    Completa y forma palabras
                </h1>
            </header>

            <ProgressBar
                value={phaseIndex + 1}
                max={PHASES.length}
                label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
            />

            {phase === 'completar' && (
                <Card className="completion-card">
                    <p className="text-instruction">
                        Observa la imagen y selecciona la sílaba
                        que falta.
                    </p>

                    <img
                        className="completion-word-image"
                        src={currentWord.image}
                        alt={currentWord.word}
                    />

                    <Button
                        variant="audio"
                        icon={Volume2}
                        onClick={() =>
                            playIfAvailable(currentWord.audio)
                        }
                    >
                        Escuchar la palabra
                    </Button>

                    <p
                        className="text-word"
                        aria-live="polite"
                    >
                        {currentWord.pattern.replace(
                            '__',
                            selectedSyllable || '__',
                        )}
                    </p>

                    <div className="syllables-options">
                        {jSyllableOptions.map((syllable) => {
                            const selected =
                                selectedSyllable === syllable

                            const stateClass =
                                completionResult && selected
                                    ? completionResult === 'correct'
                                        ? 'syllable-button--correct'
                                        : 'syllable-button--incorrect'
                                    : selected
                                        ? 'syllable-button--selected'
                                        : ''

                            return (
                                <button
                                    className={[
                                        'syllable-button',
                                        stateClass,
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    type="button"
                                    key={syllable}
                                    aria-pressed={selected}
                                    onClick={() => {
                                        if (
                                            completionResult ===
                                            'correct'
                                        ) {
                                            return
                                        }

                                        setSelectedSyllable(syllable)
                                        setCompletionResult('')
                                    }}
                                >
                                    {syllable}
                                </button>
                            )
                        })}
                    </div>

                    {completionResult === 'correct' && (
                        <div
                            className="join-result"
                            role="status"
                        >
                            <p className="selection-feedback selection-feedback--correct">
                                ¡Muy bien! Completaste la palabra{' '}
                                {currentWord.word}.
                            </p>

                            <img
                                className="join-result__image"
                                src={currentWord.image}
                                alt={`Ilustración de ${currentWord.word}`}
                            />

                            <p className="join-result__word">
                                {currentWord.word}
                            </p>
                        </div>
                    )}

                    {completionResult === 'retry' && (
                        <p
                            className="selection-feedback selection-feedback--retry"
                            role="status"
                        >
                            Esa sílaba no completa la palabra.
                            Escucha nuevamente e intenta otra vez.
                        </p>
                    )}

                    {completionResult === '' && (
                        <Button
                            icon={Check}
                            size="large"
                            fullWidth
                            disabled={!selectedSyllable}
                            onClick={checkCompletion}
                        >
                            Comprobar palabra
                        </Button>
                    )}

                    {completionResult === 'retry' && (
                        <Button
                            variant="retry"
                            icon={RotateCcw}
                            size="large"
                            fullWidth
                            onClick={retryCompletion}
                        >
                            Intentar nuevamente
                        </Button>
                    )}

                    {completionResult === 'correct' && (
                        <Button
                            icon={ArrowRight}
                            iconPosition="right"
                            size="large"
                            fullWidth
                            onClick={nextCompletionWord}
                        >
                            {wordIndex ===
                                jWordCompletion.length - 1
                                ? 'Siguiente parte'
                                : 'Siguiente palabra'}
                        </Button>
                    )}
                </Card>
            )}

            {phase === 'formar' && (
                <Card className="completion-card">
                    <p className="text-instruction">
                        Observa la imagen y toca las sílabas en
                        el orden correcto para formar su nombre.
                    </p>

                    <img
                        className="completion-word-image"
                        src={currentJoin.image}
                        alt="Palabra por formar"
                    />

                    <Button
                        variant="audio"
                        icon={Volume2}
                        onClick={() =>
                            playIfAvailable(
                                currentJoin.wordAudio,
                            )
                        }
                    >
                        Escuchar la palabra
                    </Button>

                    <div
                        className="completion-bank"
                        aria-label="Sílabas disponibles"
                    >
                        {joinOptions.map((option) => {
                            const selected =
                                selectedJoinIds.includes(option.id)

                            return (
                                <button
                                    className={[
                                        'completion-chip',
                                        'text-syllable',
                                        selected
                                            ? 'completion-active'
                                            : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    type="button"
                                    key={option.id}
                                    disabled={
                                        selected ||
                                        joinResult === 'correct'
                                    }
                                    onClick={() =>
                                        selectJoinSyllable(option)
                                    }
                                >
                                    {option.syllable}
                                </button>
                            )
                        })}
                    </div>

                    <p className="text-instruction">
                        Palabra formada:
                    </p>

                    <div
                        className="completion-bank"
                        aria-live="polite"
                    >
                        {selectedJoinOptions.length === 0 ? (
                            <span className="text-instruction">
                                Toca una sílaba para comenzar.
                            </span>
                        ) : (
                            selectedJoinOptions.map((option) => (
                                <button
                                    className="completion-chip text-syllable"
                                    type="button"
                                    key={option.id}
                                    disabled={
                                        joinResult === 'correct'
                                    }
                                    onClick={() =>
                                        removeJoinSyllable(option.id)
                                    }
                                >
                                    {option.syllable}
                                </button>
                            ))
                        )}
                    </div>

                    {joinResult === 'correct' && (
                        <div
                            className="join-result"
                            role="status"
                        >
                            <p className="selection-feedback selection-feedback--correct">
                                ¡Muy bien! Formaste la palabra{' '}
                                {currentJoin.word}.
                            </p>

                            <img
                                className="join-result__image"
                                src={currentJoin.image}
                                alt={`Ilustración de ${currentJoin.word}`}
                            />

                            <p className="join-result__word">
                                {currentJoin.word}
                            </p>
                        </div>
                    )}

                    {joinResult === 'retry' && (
                        <p
                            className="selection-feedback selection-feedback--retry"
                            role="status"
                        >
                            Revisa el orden de las sílabas e
                            intenta nuevamente.
                        </p>
                    )}

                    {joinResult === '' && (
                        <Button
                            icon={Check}
                            size="large"
                            fullWidth
                            disabled={
                                selectedJoinIds.length !==
                                currentJoin.syllables.length
                            }
                            onClick={checkJoin}
                        >
                            Comprobar palabra
                        </Button>
                    )}

                    {joinResult === 'retry' && (
                        <Button
                            variant="retry"
                            icon={RotateCcw}
                            size="large"
                            fullWidth
                            onClick={resetJoin}
                        >
                            Intentar nuevamente
                        </Button>
                    )}

                    {joinResult === 'correct' &&
                        !isJoinFinished && (
                            <Button
                                icon={ArrowRight}
                                iconPosition="right"
                                size="large"
                                fullWidth
                                onClick={nextJoinWord}
                            >
                                Formar otra palabra
                            </Button>
                        )}

                    {isJoinFinished && (
                        <Button
                            to="/actividad/j-final"
                            icon={ArrowRight}
                            iconPosition="right"
                            size="large"
                            fullWidth
                        >
                            Ir a la actividad final
                        </Button>
                    )}
                </Card>
            )}
        </main>
    )
}

export default ActividadJCompletarPage