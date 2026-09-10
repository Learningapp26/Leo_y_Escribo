import { ArrowRight, BookOpen, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import {
  vowelAudioPaths,
  vowelLesson,
  vowelOptions,
} from '../data/vocalesData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/vowels.css'

function LeccionVocalesPage() {
  return (
    <main className="page vowels-page lesson-theme--unit-1">
      <section
        className="vowels-page__content"
        aria-labelledby="titulo-vocales"
      >
        <BackButton
          label="Volver a la Unidad 1"
          to="/lecciones/unidad/1"
        />

        <header className="vowels-page__header">
          <span className="vowels-page__unit">
            {vowelLesson.unitLabel}
          </span>

          <h1 id="titulo-vocales">
            {vowelLesson.title}
          </h1>

          <p className="text-instruction vowels-page__instruction">
            {vowelLesson.instruction}
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(vowelLesson.instructionAudio)
            }
            data-audio-src={vowelLesson.instructionAudio}
          >
            Escuchar instrucción
          </Button>
        </header>

        <ProgressBar
          value={1}
          max={2}
          label={vowelLesson.progressLabel}
        />

        <Card className="vowels-review-card">
          <BookOpen
            className="vowels-review-card__icon"
            aria-hidden="true"
          />

          <h2>{vowelLesson.reviewTitle}</h2>

          <div
            className="vowels-list"
            aria-label="a, e, i, o, u"
          >
            {vowelOptions.map((vocal) => (
              <Button
                key={vocal}
                variant="audio"
                size="large"
                className="vowels-list__item text-letter"
                onClick={() => playAudio(vowelAudioPaths[vocal])}
              >
                {vocal}
              </Button>
            ))}
          </div>

          <p className="text-reading">
            {vowelLesson.reviewInstruction}
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            fullWidth
            onClick={() =>
              playAudio(vowelLesson.allVowelsAudio)
            }
            data-audio-src={vowelLesson.allVowelsAudio}
          >
            Escuchar las vocales
          </Button>
        </Card>

        <Card
          className="vowels-activity-summary"
          title={vowelLesson.activityTitle}
          description={vowelLesson.activityDescription}
          footer={
            <Button
              to={vowelLesson.activityRoute}
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Comenzar actividad
            </Button>
          }
        />
      </section>
    </main>
  )
}

export default LeccionVocalesPage
