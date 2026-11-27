import SyllableCards from '../components/lessons/SyllableCards'
import useSyllablePractice from '../hooks/useSyllablePractice'
import ActivityFeedback from '../components/common/ActivityFeedback'
import { LetterSound } from '../components/lessons/SoundIntroduction'
import { formatLetterGroup } from '../data/lessonLabels'
import { useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import AudioPlaceholderButton from '../components/common/AudioPlaceholderButton'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  sLetterPresentation,
  sReadWords,
  sSyllableImages,
  sSyllableSearch,
  sSyllables,
} from '../data/sData'
import { registrarProgreso } from '../lib/progreso'

import '../styles/selection.css'
import '../styles/syllables.css'

// Páginas 22 y 23 del libro: letra y sílabas, leer palabras,
// buscar la sílaba en palabras y nombrar dibujos.
const PHASES = ['letra', 'leer', 'buscar', 'imagenes']

function ActividadSSilabasPage() {
  const syllablePractice = useSyllablePractice(sLetterPresentation.combinations)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('s')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 3: buscar la sílaba en las palabras de cada fila
  const [searchIndex, setSearchIndex] = useState(0)
  const [selectedWords, setSelectedWords] = useState([])
  const [searchFeedback, setSearchFeedback] = useState('')

  const searchExercise = sSyllableSearch[searchIndex]
  const isLastSearch = searchIndex === sSyllableSearch.length - 1

  const toggleSearchWord = (word) => {
    if (searchFeedback === 'correct') return
    setSearchFeedback('')
    setSelectedWords((current) =>
      current.includes(word)
        ? current.filter((item) => item !== word)
        : [...current, word],
    )
  }

  const checkSearch = () => {
    const { answers } = searchExercise
    const isCorrect =
      selectedWords.length === answers.length &&
      selectedWords.every((word) => answers.includes(word))

    setSearchFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 's-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 's', fase: 'buscar', ejercicioId: searchExercise.target },
    })
  }

  const resetSearch = () => {
    setSelectedWords([])
    setSearchFeedback('')
  }

  const nextSearch = () => {
    resetSearch()
    if (isLastSearch) {
      goToNextPhase()
      return
    }
    setSearchIndex((current) => current + 1)
  }

  // Fase 4: nombrar el dibujo y elegir la sílaba con S
  const [imageIndex, setImageIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [imageFeedback, setImageFeedback] = useState('')

  const imageExercise = sSyllableImages[imageIndex]
  const isLastImage = imageIndex === sSyllableImages.length - 1

  const checkImage = () => {
    if (!selectedSyllable) return
    const isCorrect = selectedSyllable === imageExercise.answer

    setImageFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 's-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 's', fase: 'imagenes', ejercicioId: imageExercise.id },
    })
  }

  const resetImage = () => {
    setSelectedSyllable('')
    setImageFeedback('')
  }

  const nextImage = () => {
    resetImage()
    setImageIndex((current) => current + 1)
  }

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="s-silabas-title">
      <BackButton label="Volver a la lección" to="/lecciones/s" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>
        <h1 id="s-silabas-title">Sílabas con S</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'letra' && (
        <Card className="syllables-card">
          <div className="syllables-instructions">
            <p className="text-instruction">
              Fíjate en la S mayúscula y la s minúscula. Toca cada combinación
              para escucharla: sa, se, si, so y su.
            </p>
            <AudioPlaceholderButton>Escuchar instrucción</AudioPlaceholderButton>
          </div>

          <LetterSound letter="s">{formatLetterGroup('s')}</LetterSound>

          <SyllableCards items={sLetterPresentation.combinations} {...syllablePractice} />

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            disabled={!syllablePractice.allTouched}
            onClick={goToNextPhase}
          >
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'leer' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Observa las imágenes e intenta leer cada palabra. Fíjate en las
              sílabas con S.
            </p>
            <AudioPlaceholderButton>Escuchar instrucción</AudioPlaceholderButton>
          </div>

          <div className="selection-options">
            {sReadWords.map((item) => (
              <Card
                key={item.id}
                imageSrc={item.image}
                imageAlt={item.word}
                title={item.word}
                footer={<AudioPlaceholderButton fullWidth>Escuchar</AudioPlaceholderButton>}
              />
            ))}
          </div>

          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={goToNextPhase}>
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'buscar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca todas las palabras que tengan la sílaba{' '}
              <strong>{searchExercise.target}</strong>.
            </p>
            <AudioPlaceholderButton>Escuchar instrucción</AudioPlaceholderButton>
          </div>

          <span className="text-syllable">{searchExercise.target}</span>

          <div className="selection-options">
            {searchExercise.words.map((word) => {
              const selected = selectedWords.includes(word)
              const stateClass = selected && searchFeedback === 'correct'
                ? 'selection-button--correct'
                : selected && searchFeedback === 'retry' && !searchExercise.answers.includes(word)
                  ? 'selection-button--incorrect'
                  : selected
                    ? 'selection-button--selected'
                    : ''

              return (
                <button
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={word}
                  aria-pressed={selected}
                  onClick={() => toggleSearchWord(word)}
                >
                  <span className="selection-word">{word}</span>
                </button>
              )
            })}
          </div>

          {searchFeedback === 'correct' && (
            <ActivityFeedback correct message={<>
              ¡Muy bien! Encontraste todas las palabras con {searchExercise.target}.
            </>} />
          )}
          {searchFeedback === 'retry' && (
            <ActivityFeedback correct={false} message={<>
              Revisa otra vez. Puede faltar alguna palabra o haber una que no
              tiene {searchExercise.target}.
            </>} />
          )}

          {!searchFeedback && (
            <Button icon={Check} size="large" fullWidth disabled={selectedWords.length === 0} onClick={checkSearch}>
              Comprobar selección
            </Button>
          )}
          {searchFeedback === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={resetSearch}>
              Intentar nuevamente
            </Button>
          )}
          {searchFeedback === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextSearch}>
              {isLastSearch ? 'Siguiente parte' : 'Siguiente sílaba'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'imagenes' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Nombra el dibujo lentamente. Identifica el sonido y elige la
              sílaba que corresponde: sa, se, si, so o su.
            </p>
            <AudioPlaceholderButton>Escuchar instrucción</AudioPlaceholderButton>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={imageExercise.image}
            alt={imageExercise.word}
          />

          <span className="text-word">{imageExercise.word}</span>

          <AudioPlaceholderButton>Escuchar palabra</AudioPlaceholderButton>

          <div className="syllables-options">
            {sSyllables.map((syllable) => {
              const selected = selectedSyllable === syllable
              const stateClass = selected && imageFeedback
                ? imageFeedback === 'correct'
                  ? 'syllable-button--correct'
                  : 'syllable-button--incorrect'
                : selected
                  ? 'syllable-button--selected'
                  : ''

              return (
                <button
                  className={['syllable-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={syllable}
                  aria-pressed={selected}
                  onClick={() => {
                    if (imageFeedback === 'correct') return
                    setSelectedSyllable(syllable)
                    setImageFeedback('')
                  }}
                >
                  {syllable}
                </button>
              )
            })}
          </div>

          {imageFeedback === 'correct' && (
            <ActivityFeedback correct message={<>
              ¡Correcto! {imageExercise.word} lleva {imageExercise.answer}.
            </>} />
          )}
          {imageFeedback === 'retry' && (
            <ActivityFeedback correct={false} message={<>
              Esa no es la sílaba. Nombra el dibujo otra vez y escucha el sonido.
            </>} />
          )}

          {!imageFeedback && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedSyllable} onClick={checkImage}>
              Comprobar
            </Button>
          )}
          {imageFeedback === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={resetImage}>
              Intentar nuevamente
            </Button>
          )}
          {imageFeedback === 'correct' && !isLastImage && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextImage}>
              Siguiente palabra
            </Button>
          )}
          {imageFeedback === 'correct' && isLastImage && (
            <Button to="/actividad/s-completar" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
              Formar palabras
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadSSilabasPage