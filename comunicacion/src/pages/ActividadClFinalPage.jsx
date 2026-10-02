import {
    useRef,
    useState,
} from 'react'
import {
    ArrowRight,
    Check,
    RotateCcw,
    Trophy,
} from 'lucide-react'

import AudioPlaceholderButton from '../components/common/AudioPlaceholderButton'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
    clSentenceExercises,
    clWordBuilding,
} from '../data/clData'
import {
    registrarLeccionCompletada,
    registrarProgreso,
} from '../lib/progreso'
import '../styles/completion.css'
import '../styles/selection.css'

function ActividadClFinalPage() {
    const [phase, setPhase] =
        useState('palabras')

    const [wordIndex, setWordIndex] =
        useState(0)

    const [
        selectedSyllables,
        setSelectedSyllables,
    ] = useState([])

    const [wordFeedback, setWordFeedback] =
        useState('')

    const [sentenceIndex, setSentenceIndex] =
        useState(0)

    const [
        selectedSentenceId,
        setSelectedSentenceId,
    ] = useState(null)

    const [
        sentenceFeedback,
        setSentenceFeedback,
    ] = useState('')

    const [finished, setFinished] =
        useState(false)

    const completedRef = useRef(false)

    const themeClass =
        getLessonThemeClass('cl')

    const currentWord =
        clWordBuilding[wordIndex]

    const currentSentence =
        clSentenceExercises[sentenceIndex]

    const totalSteps =
        clWordBuilding.length +
        clSentenceExercises.length

    const completedSteps =
        phase === 'palabras'
            ? wordIndex
            : clWordBuilding.length +
            sentenceIndex

    function selectSyllable(syllable) {
        if (wordFeedback === 'correct') return

        if (
            selectedSyllables.includes(syllable)
        ) {
            return
        }

        if (
            selectedSyllables.length >=
            currentWord.correctOrder.length
        ) {
            return
        }

        setWordFeedback('')

        setSelectedSyllables((current) => [
            ...current,
            syllable,
        ])
    }

    function removeLastSyllable() {
        if (wordFeedback === 'correct') return

        setWordFeedback('')

        setSelectedSyllables((current) =>
            current.slice(0, -1),
        )
    }

    function checkWord() {
        const isCorrect =
            selectedSyllables.length ===
            currentWord.correctOrder.length &&
            selectedSyllables.every(
                (syllable, index) =>
                    syllable ===
                    currentWord.correctOrder[index],
            )

        setWordFeedback(
            isCorrect ? 'correct' : 'retry',
        )

        registrarProgreso({
            actividad: 'cl-final',
            correcto: isCorrect,
            detalle: {
                leccionId: 'cl',
                fase: 'ordenar-silabas',
                ejercicioId: currentWord.id,
                respuesta: selectedSyllables,
            },
        })
    }

    function retryWord() {
        setSelectedSyllables([])
        setWordFeedback('')
    }

    function nextWord() {
        if (
            wordIndex <
            clWordBuilding.length - 1
        ) {
            setWordIndex(
                (current) => current + 1,
            )
            setSelectedSyllables([])
            setWordFeedback('')
            return
        }

        setPhase('oraciones')
        setSelectedSyllables([])
        setWordFeedback('')
    }

    function selectSentence(optionId) {
        if (
            sentenceFeedback === 'correct'
        ) {
            return
        }

        setSelectedSentenceId(optionId)
        setSentenceFeedback('')
    }

    function checkSentence() {
        const isCorrect =
            selectedSentenceId ===
            currentSentence.answer

        setSentenceFeedback(
            isCorrect ? 'correct' : 'retry',
        )

        registrarProgreso({
            actividad: 'cl-final',
            correcto: isCorrect,
            detalle: {
                leccionId: 'cl',
                fase: 'oraciones',
                ejercicioId: currentSentence.id,
                respuesta: selectedSentenceId,
            },
        })
    }

    function retrySentence() {
        setSelectedSentenceId(null)
        setSentenceFeedback('')
    }

    function nextSentence() {
        if (
            sentenceIndex <
            clSentenceExercises.length - 1
        ) {
            setSentenceIndex(
                (current) => current + 1,
            )
            setSelectedSentenceId(null)
            setSentenceFeedback('')
            return
        }

        if (!completedRef.current) {
            completedRef.current = true

            registrarLeccionCompletada('cl')
        }

        setFinished(true)
    }

    function restartActivity() {
        completedRef.current = false

        setPhase('palabras')
        setWordIndex(0)
        setSelectedSyllables([])
        setWordFeedback('')
        setSentenceIndex(0)
        setSelectedSentenceId(null)
        setSentenceFeedback('')
        setFinished(false)
    }

    if (finished) {
        return (
            <main
                className={
                    `page completion-page ${themeClass}`
                }
                aria-labelledby="cl-finished-title"
            >
                <Card className="completion-card">
                    <Trophy
                        className="finish-icon"
                        aria-hidden="true"
                    />

                    <h1 id="cl-finished-title">
                        ¡Completaste la lección CL!
                    </h1>

                    <p className="text-instruction">
                        Ordenaste palabras y relacionaste
                        correctamente las oraciones.
                    </p>

                    <Button
                        icon={RotateCcw}
                        size="large"
                        fullWidth
                        onClick={restartActivity}
                    >
                        Practicar de nuevo
                    </Button>

                    <Button
                        to="/lecciones/unidad/4"
                        variant="secondary"
                        icon={ArrowRight}
                        iconPosition="right"
                        size="large"
                        fullWidth
                    >
                        Volver a la Unidad 4
                    </Button>
                </Card>
            </main>
        )
    }

    return (
        <main
            className={
                `page completion-page ${themeClass}`
            }
            aria-labelledby="cl-final-title"
        >
            <BackButton
                label="Volver a la lección"
                to="/lecciones/cl"
            />

            <header className="text-center">
                <span className="text-ui-label">
                    Actividad final
                </span>

                <h1 id="cl-final-title">
                    Practiquemos la combinación CL
                </h1>
            </header>

            <ProgressBar
                value={completedSteps + 1}
                max={totalSteps}
                label={
                    `Paso ${completedSteps + 1} ` +
                    `de ${totalSteps}`
                }
            />

            {phase === 'palabras' && (
                <Card className="completion-card">
                    <div className="completion-instructions">
                        <p className="text-instruction">
                            Ordena las sílabas para formar
                            la palabra correcta.
                        </p>

                        <AudioPlaceholderButton>
                            Escuchar instrucción
                        </AudioPlaceholderButton>
                    </div>

                    <span className="text-ui-label">
                        Palabra {wordIndex + 1} de{' '}
                        {clWordBuilding.length}
                    </span>

                    <div
                        className={[
                            'completion-target',
                            wordFeedback === 'correct'
                                ? 'completion-correct'
                                : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        aria-label="Sílabas seleccionadas"
                    >
                        {selectedSyllables.length ===
                            0 && (
                                <span className="text-instruction">
                                    Selecciona las sílabas
                                </span>
                            )}

                        {selectedSyllables.map(
                            (syllable) => (
                                <span
                                    className="completion-chip"
                                    key={syllable}
                                >
                                    <span className="selection-word">
                                        {syllable}
                                    </span>
                                </span>
                            ),
                        )}
                    </div>

                    <div
                        className="completion-bank"
                        aria-label="Sílabas disponibles"
                    >
                        {currentWord.syllables.map(
                            (syllable) => (
                                <button
                                    className="completion-chip"
                                    type="button"
                                    key={syllable}
                                    disabled={
                                        selectedSyllables.includes(
                                            syllable,
                                        )
                                    }
                                    onClick={() =>
                                        selectSyllable(syllable)
                                    }
                                >
                                    <span className="selection-word">
                                        {syllable}
                                    </span>
                                </button>
                            ),
                        )}
                    </div>

                    {!wordFeedback && (
                        <>
                            <Button
                                variant="secondary"
                                icon={RotateCcw}
                                fullWidth
                                disabled={
                                    selectedSyllables.length === 0
                                }
                                onClick={removeLastSyllable}
                            >
                                Quitar última sílaba
                            </Button>

                            <Button
                                icon={Check}
                                size="large"
                                fullWidth
                                disabled={
                                    selectedSyllables.length !==
                                    currentWord.correctOrder.length
                                }
                                onClick={checkWord}
                            >
                                Comprobar
                            </Button>
                        </>
                    )}

                    {wordFeedback === 'correct' && (
                        <>
                            <p
                                className={
                                    'selection-feedback ' +
                                    'selection-feedback--correct'
                                }
                                role="status"
                            >
                                ¡Muy bien! Formaste la palabra{' '}
                                {currentWord.word}.
                            </p>

                            <Button
                                icon={ArrowRight}
                                iconPosition="right"
                                size="large"
                                fullWidth
                                onClick={nextWord}
                            >
                                {wordIndex ===
                                    clWordBuilding.length - 1
                                    ? 'Continuar con las oraciones'
                                    : 'Siguiente palabra'}
                            </Button>
                        </>
                    )}

                    {wordFeedback === 'retry' && (
                        <>
                            <p
                                className={
                                    'selection-feedback ' +
                                    'selection-feedback--retry'
                                }
                                role="status"
                            >
                                Revisa el orden de las sílabas.
                            </p>

                            <Button
                                variant="retry"
                                icon={RotateCcw}
                                size="large"
                                fullWidth
                                onClick={retryWord}
                            >
                                Intentar de nuevo
                            </Button>
                        </>
                    )}
                </Card>
            )}

            {phase === 'oraciones' && (
                <Card className="completion-card">
                    <div className="completion-instructions">
                        <p className="text-instruction">
                            Observa la imagen y selecciona
                            la oración que le corresponde.
                        </p>

                        <AudioPlaceholderButton>
                            Escuchar instrucción
                        </AudioPlaceholderButton>
                    </div>

                    <img
                        className={
                            'selection-image ' +
                            'selection-image--featured'
                        }
                        src={currentSentence.image}
                        alt={currentSentence.imageAlt}
                    />

                    <div className="selection-options">
                        {currentSentence.options.map(
                            (option) => {
                                const isSelected =
                                    selectedSentenceId ===
                                    option.id

                                const answerClass =
                                    isSelected &&
                                        sentenceFeedback
                                        ? option.id ===
                                            currentSentence.answer
                                            ? 'selection-button--correct'
                                            : 'selection-button--incorrect'
                                        : isSelected
                                            ? 'selection-button--selected'
                                            : ''

                                return (
                                    <button
                                        className={[
                                            'selection-button',
                                            answerClass,
                                        ]
                                            .filter(Boolean)
                                            .join(' ')}
                                        type="button"
                                        key={option.id}
                                        aria-pressed={isSelected}
                                        onClick={() =>
                                            selectSentence(option.id)
                                        }
                                    >
                                        <span className="selection-word">
                                            {option.text}
                                        </span>
                                    </button>
                                )
                            },
                        )}
                    </div>

                    {!sentenceFeedback && (
                        <Button
                            icon={Check}
                            size="large"
                            fullWidth
                            disabled={!selectedSentenceId}
                            onClick={checkSentence}
                        >
                            Comprobar
                        </Button>
                    )}

                    {sentenceFeedback ===
                        'correct' && (
                            <>
                                <p
                                    className={
                                        'selection-feedback ' +
                                        'selection-feedback--correct'
                                    }
                                    role="status"
                                >
                                    ¡Excelente! Elegiste la oración
                                    correcta.
                                </p>

                                <Button
                                    icon={ArrowRight}
                                    iconPosition="right"
                                    size="large"
                                    fullWidth
                                    onClick={nextSentence}
                                >
                                    {sentenceIndex ===
                                        clSentenceExercises.length - 1
                                        ? 'Terminar lección'
                                        : 'Siguiente oración'}
                                </Button>
                            </>
                        )}

                    {sentenceFeedback ===
                        'retry' && (
                            <>
                                <p
                                    className={
                                        'selection-feedback ' +
                                        'selection-feedback--retry'
                                    }
                                    role="status"
                                >
                                    Esa oración no corresponde
                                    a la imagen.
                                </p>

                                <Button
                                    variant="retry"
                                    icon={RotateCcw}
                                    size="large"
                                    fullWidth
                                    onClick={retrySentence}
                                >
                                    Intentar de nuevo
                                </Button>
                            </>
                        )}
                </Card>
            )}
        </main>
    )
}

export default ActividadClFinalPage