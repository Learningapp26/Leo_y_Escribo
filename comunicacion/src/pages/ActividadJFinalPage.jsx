import { useEffect, useState } from 'react'
import {ArrowRight,Check,RotateCcw,Volume2,} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import {jPracticeWords,jSentenceCompletion,jWordImageMatch,} from '../data/jActivities'
import { getLessonThemeClass } from '../data/lessonColors'
import { playAudio } from '../lib/audioPlayer'
import {registrarLeccionCompletada,registrarProgreso,} from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = [
    'palabras',
    'oraciones',
    'relacionar',
]

const totalExercises =
    jSentenceCompletion.length * 2 +
    jWordImageMatch.length

function playIfAvailable(audio) {
    if (audio) playAudio(audio)
}

function ActividadJFinalPage() {
    const [phaseIndex, setPhaseIndex] = useState(0)
    const [stars, setStars] = useState(0)
    const [finished, setFinished] = useState(false)

    const [practiceIndex, setPracticeIndex] =
        useState(0)

    const [sentenceIndex, setSentenceIndex] =
        useState(0)
    const [selectedOption, setSelectedOption] =
        useState('')
    const [sentenceResult, setSentenceResult] =
        useState('')
    const [selectedCount, setSelectedCount] =
        useState(null)
    const [countResult, setCountResult] =
        useState('')

    const [matchIndex, setMatchIndex] =
        useState(0)
    const [selectedImage, setSelectedImage] =
        useState('')
    const [matchResult, setMatchResult] =
        useState('')

    const phase = PHASES[phaseIndex]
    const themeClass = getLessonThemeClass('j')

    const practiceWord =
        jPracticeWords[practiceIndex]

    const sentence =
        jSentenceCompletion[sentenceIndex]

    const matchItem =
        jWordImageMatch[matchIndex]

    const countOptions = [
        sentence.wordCount - 1,
        sentence.wordCount,
        sentence.wordCount + 1,
    ]
    const sentenceWords =
        sentence.completeSentence
            .replace(/[.,¿?¡!]/g, '')
            .split(' ')

    const checkSentence = () => {
        if (
            !selectedOption ||
            sentenceResult === 'correct'
        ) {
            return
        }

        const isCorrect =
            selectedOption === sentence.answer

        setSentenceResult(
            isCorrect ? 'correct' : 'retry',
        )

        if (isCorrect) {
            setStars((current) =>
                Math.min(
                    current + 1,
                    totalExercises,
                ),
            )

            playIfAvailable(sentence.audio)
        }

        registrarProgreso({
            actividad: 'j-final',
            correcto: isCorrect,
            detalle: {
                leccionId: 'j',
                fase: 'completar-oracion',
                ejercicioId: sentence.answer,
            },
        })
    }

    const checkCount = () => {
        if (
            selectedCount === null ||
            countResult === 'correct'
        ) {
            return
        }

        const isCorrect =
            selectedCount === sentence.wordCount

        setCountResult(
            isCorrect ? 'correct' : 'retry',
        )

        if (isCorrect) {
            setStars((current) =>
                Math.min(
                    current + 1,
                    totalExercises,
                ),
            )
        }

        registrarProgreso({
            actividad: 'j-final',
            correcto: isCorrect,
            detalle: {
                leccionId: 'j',
                fase: 'contar-palabras',
                ejercicioId: sentence.answer,
            },
        })
    }

    const nextSentence = () => {
        setSelectedOption('')
        setSentenceResult('')
        setSelectedCount(null)
        setCountResult('')

        if (
            sentenceIndex ===
            jSentenceCompletion.length - 1
        ) {
            setPhaseIndex(2)
            return
        }

        setSentenceIndex(
            (current) => current + 1,
        )
    }

    const checkMatch = () => {
        if (
            !selectedImage ||
            matchResult === 'correct'
        ) {
            return
        }

        const isCorrect =
            selectedImage === matchItem.answerImage

        setMatchResult(
            isCorrect ? 'correct' : 'retry',
        )

        if (isCorrect) {
            setStars((current) =>
                Math.min(
                    current + 1,
                    totalExercises,
                ),
            )
        }

        registrarProgreso({
            actividad: 'j-final',
            correcto: isCorrect,
            detalle: {
                leccionId: 'j',
                fase: 'relacionar',
                ejercicioId: matchItem.word,
            },
        })
    }

    const nextMatch = () => {
        setSelectedImage('')
        setMatchResult('')

        if (
            matchIndex ===
            jWordImageMatch.length - 1
        ) {
            setFinished(true)
            return
        }

        setMatchIndex((current) => current + 1)
    }

    useEffect(() => {
        if (finished) {
            registrarLeccionCompletada('j')
        }
    }, [finished])

    if (finished) {
        return (
            <main className={`page ${themeClass}`}>
                <Card className="selection-card">
                    <span
                        className="finish-icon"
                        aria-hidden="true"
                    >
                        ⭐
                    </span>

                    <h1>
                        ¡Terminaste la lección de la letra J!
                    </h1>

                    <p className="text-instruction">
                        Aprendiste el sonido /j/, sus sílabas
                        ja, je, ji, jo y ju, y nuevas palabras.
                    </p>

                    <StarsCounter
                        current={stars}
                        total={totalExercises}
                        label="Estrellas"
                    />

                    <Button
                        variant="audio"
                        icon={Volume2}
                        fullWidth
                        onClick={() =>
                            playAudio(
                                '/audio/lecciones/j/felicitacion-final.mp3',
                            )
                        }
                    >
                        Escuchar felicitación
                    </Button>

                    <Button
                        to="/lecciones/unidad/3"
                        icon={ArrowRight}
                        iconPosition="right"
                        size="large"
                        fullWidth
                    >
                        Volver a las lecciones
                    </Button>
                </Card>
            </main>
        )
    }

    return (
        <main
            className={`page ${themeClass}`}
            aria-labelledby="j-final-title"
        >
            <BackButton
                label="Volver a la lección"
                to="/lecciones/j"
            />

            <header className="text-center">
                <span className="text-ui-label">
                    Actividad final
                </span>

                <h1 id="j-final-title">
                    Practica todo lo aprendido
                </h1>
            </header>

            <ProgressBar
                value={phaseIndex + 1}
                max={PHASES.length}
                label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
            />

            <StarsCounter
                current={stars}
                total={totalExercises}
                label="Estrellas"
            />

            {phase === 'palabras' && (
                <Card className="selection-card">
                    <p className="text-instruction">
                        Observa cada imagen, lee la palabra y
                        repítela en voz alta.
                    </p>

                    {practiceWord.isProperNoun && (
                        <p className="text-instruction">
                            Recuerda: los nombres propios se
                            escriben con mayúscula.
                        </p>
                    )}

                    <img
                        className="selection-image selection-image--featured"
                        src={practiceWord.image}
                        alt={practiceWord.word}
                    />

                    <span className="text-word">
                        {practiceWord.word}
                    </span>

                    <Button
                        variant="audio"
                        size="large"
                        icon={Volume2}
                        onClick={() =>
                            playIfAvailable(practiceWord.audio)
                        }
                    >
                        Escuchar {practiceWord.word}
                    </Button>

                    <Button
                        icon={ArrowRight}
                        iconPosition="right"
                        size="large"
                        fullWidth
                        onClick={() => {
                            if (
                                practiceIndex ===
                                jPracticeWords.length - 1
                            ) {
                                setPhaseIndex(1)
                                return
                            }

                            setPracticeIndex(
                                (current) => current + 1,
                            )
                        }}
                    >
                        {practiceIndex ===
                            jPracticeWords.length - 1
                            ? 'Continuar'
                            : 'Siguiente palabra'}
                    </Button>
                </Card>
            )}

            {phase === 'oraciones' && (
                <Card className="selection-card">
                    <p className="text-instruction">
                        Selecciona la palabra que completa
                        correctamente la oración.
                    </p>

                    <p className="text-sentence">
                        {sentence.sentence.replace(
                            '___',
                            selectedOption || '________',
                        )}
                    </p>

                    <div className="selection-options">
                        {sentence.options.map((option) => {
                            const selected =
                                selectedOption === option

                            const stateClass =
                                sentenceResult && selected
                                    ? sentenceResult === 'correct'
                                        ? 'selection-button--correct'
                                        : 'selection-button--incorrect'
                                    : selected
                                        ? 'selection-button--selected'
                                        : ''

                            return (
                                <button
                                    className={[
                                        'selection-button',
                                        stateClass,
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    type="button"
                                    key={option}
                                    aria-pressed={selected}
                                    onClick={() => {
                                        if (
                                            sentenceResult === 'correct'
                                        ) {
                                            return
                                        }

                                        setSelectedOption(option)
                                        setSentenceResult('')
                                    }}
                                >
                                    <span className="selection-word">
                                        {option}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    {sentenceResult === 'correct' && (
                        <>
                            <p
                                className="selection-feedback selection-feedback--correct"
                                role="status"
                            >
                                ¡Correcto!{' '}
                                {sentence.completeSentence}
                            </p>

                            <Button
                                variant="audio"
                                icon={Volume2}
                                onClick={() =>
                                    playIfAvailable(sentence.audio)
                                }
                            >
                                Escuchar la oración
                            </Button>

                            <p className="text-instruction">
                                Escucha la oración y cuenta cada palabra.
                            </p>

                            <div
                                className="completion-bank sentence-word-bank"
                                aria-label="Palabras de la oración"
                            >
                                {sentenceWords.map((word, index) => (
                                    <span
                                        className="completion-chip sentence-word-chip"
                                        key={`${word}-${index}`}
                                    >
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}

                    {sentenceResult === 'retry' && (
                        <p
                            className="selection-feedback selection-feedback--retry"
                            role="status"
                        >
                            Esa palabra no completa correctamente
                            la oración.
                        </p>
                    )}

                    {sentenceResult !== 'correct' && (
                        <Button
                            icon={Check}
                            size="large"
                            fullWidth
                            disabled={!selectedOption}
                            onClick={checkSentence}
                        >
                            Comprobar palabra
                        </Button>
                    )}

                    {sentenceResult === 'retry' && (
                        <Button
                            variant="retry"
                            icon={RotateCcw}
                            size="large"
                            fullWidth
                            onClick={() => {
                                setSelectedOption('')
                                setSentenceResult('')
                            }}
                        >
                            Intentar nuevamente
                        </Button>
                    )}

                    {sentenceResult === 'correct' && (
                        <>
                            <p className="text-instruction">
                                ¿Cuántas palabras tiene la oración?
                            </p>

                            <div className="completion-bank">
                                {countOptions.map((option) => {
                                    const selected =
                                        selectedCount === option

                                    const stateClass =
                                        countResult && selected
                                            ? countResult === 'correct'
                                                ? 'completion-correct'
                                                : 'completion-incorrect'
                                            : selected
                                                ? 'completion-active'
                                                : ''

                                    return (
                                        <button
                                            className={[
                                                'completion-chip',
                                                'text-word',
                                                stateClass,
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                            type="button"
                                            key={option}
                                            aria-pressed={selected}
                                            onClick={() => {
                                                if (
                                                    countResult === 'correct'
                                                ) {
                                                    return
                                                }

                                                setSelectedCount(option)
                                                setCountResult('')
                                            }}
                                        >
                                            {option}
                                        </button>
                                    )
                                })}
                            </div>

                            {countResult === 'correct' && (
                                <p
                                    className="selection-feedback selection-feedback--correct"
                                    role="status"
                                >
                                    ¡Muy bien! La oración tiene{' '}
                                    {sentence.wordCount} palabras.
                                </p>
                            )}

                            {countResult === 'retry' && (
                                <p
                                    className="selection-feedback selection-feedback--retry"
                                    role="status"
                                >
                                    Cuenta nuevamente todas las
                                    palabras de la oración.
                                </p>
                            )}

                            {countResult !== 'correct' && (
                                <Button
                                    icon={Check}
                                    size="large"
                                    fullWidth
                                    disabled={selectedCount === null}
                                    onClick={checkCount}
                                >
                                    Comprobar cantidad
                                </Button>
                            )}

                            {countResult === 'retry' && (
                                <Button
                                    variant="retry"
                                    icon={RotateCcw}
                                    size="large"
                                    fullWidth
                                    onClick={() => {
                                        setSelectedCount(null)
                                        setCountResult('')
                                    }}
                                >
                                    Intentar nuevamente
                                </Button>
                            )}

                            {countResult === 'correct' && (
                                <Button
                                    icon={ArrowRight}
                                    iconPosition="right"
                                    size="large"
                                    fullWidth
                                    onClick={nextSentence}
                                >
                                    {sentenceIndex ===
                                        jSentenceCompletion.length - 1
                                        ? 'Siguiente parte'
                                        : 'Siguiente oración'}
                                </Button>
                            )}
                        </>
                    )}
                </Card>
            )}

            {phase === 'relacionar' && (
                <Card className="selection-card">
                    <p className="text-instruction">
                        Escucha la palabra y selecciona la
                        imagen que corresponde.
                    </p>

                    <span className="text-word">
                        {matchItem.word}
                    </span>

                    <Button
                        variant="audio"
                        icon={Volume2}
                        onClick={() =>
                            playIfAvailable(matchItem.audio)
                        }
                    >
                        Escuchar {matchItem.word}
                    </Button>

                    <div className="selection-options">
                        {matchItem.options.map((option) => {
                            const selected =
                                selectedImage === option.image

                            const stateClass =
                                matchResult && selected
                                    ? matchResult === 'correct'
                                        ? 'selection-button--correct'
                                        : 'selection-button--incorrect'
                                    : selected
                                        ? 'selection-button--selected'
                                        : ''

                            return (
                                <button
                                    className={[
                                        'selection-button',
                                        stateClass,
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    type="button"
                                    key={option.name}
                                    aria-pressed={selected}
                                    onClick={() => {
                                        if (
                                            matchResult === 'correct'
                                        ) {
                                            return
                                        }

                                        setSelectedImage(option.image)
                                        setMatchResult('')
                                    }}
                                >
                                    <img
                                        className="selection-image"
                                        src={option.image}
                                        alt={option.name}
                                    />

                                    <span className="selection-word">
                                        {option.name}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    {matchResult === 'correct' && (
                        <p
                            className="selection-feedback selection-feedback--correct"
                            role="status"
                        >
                            ¡Correcto! Esa es la imagen de{' '}
                            {matchItem.word}.
                        </p>
                    )}

                    {matchResult === 'retry' && (
                        <p
                            className="selection-feedback selection-feedback--retry"
                            role="status"
                        >
                            Esa no es la imagen correcta.
                        </p>
                    )}

                    {matchResult !== 'correct' && (
                        <Button
                            icon={Check}
                            size="large"
                            fullWidth
                            disabled={!selectedImage}
                            onClick={checkMatch}
                        >
                            Comprobar
                        </Button>
                    )}

                    {matchResult === 'retry' && (
                        <Button
                            variant="retry"
                            icon={RotateCcw}
                            size="large"
                            fullWidth
                            onClick={() => {
                                setSelectedImage('')
                                setMatchResult('')
                            }}
                        >
                            Intentar nuevamente
                        </Button>
                    )}

                    {matchResult === 'correct' && (
                        <Button
                            icon={ArrowRight}
                            iconPosition="right"
                            size="large"
                            fullWidth
                            onClick={nextMatch}
                        >
                            {matchIndex ===
                                jWordImageMatch.length - 1
                                ? 'Finalizar lección'
                                : 'Siguiente palabra'}
                        </Button>
                    )}
                </Card>
            )}
        </main>
    )
}

export default ActividadJFinalPage