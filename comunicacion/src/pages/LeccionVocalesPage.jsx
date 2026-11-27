import { formatLetterGroup, getLessonHeading } from '../data/lessonLabels'
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
    <main className="page selection-page vowels-page planet--0">
      <section
        className="vowels-page__content"
        aria-labelledby="titulo-vocales"
      >
        <BackButton
          label="Volver a la Unidad 1"
          to="/lecciones/unidad/1"
        />

        <header className="text-center vowels-page__header">
          <span className="text-ui-label">
            {vowelLesson.unitLabel}
          </span>

          <h1 id="titulo-vocales">{getLessonHeading('vocales')}</h1>

          <div className="selection-instructions">
            <p className="text-instruction">
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
          </div>
        </header>

        <ProgressBar
          value={1}
          max={2}
          label={vowelLesson.progressLabel}
        />

        <Card className="selection-card vowels-review-card">
          <BookOpen
            className="vowels-review-card__icon"
            aria-hidden="true"
          />

          <div className="vowels-review-card__heading">
            <Button
              variant="audio"
              className="btn--audio-round"
              icon={Volume2}
              aria-label="Escuchar las vocales"
              onClick={() => playAudio(vowelLesson.allVowelsAudio)}
              data-audio-src={vowelLesson.allVowelsAudio}
            />
            <h2>{vowelLesson.reviewTitle}</h2>
          </div>

          <div
            className="vowels-list"
            aria-label="a, e, i, o, u"
          >
            {vowelOptions.map((vocal) => (
              <Button
                key={formatLetterGroup(vocal)}
                variant="audio"
                size="large"
                className="vowels-list__item text-letter"
                onClick={() => playAudio(vowelAudioPaths[vocal])}
              >
                {formatLetterGroup(vocal)}
              </Button>
            ))}
          </div>

          <p className="text-reading">
            {vowelLesson.reviewInstruction}
          </p>

        </Card>

        <Card
          className="lesson-activity-menu__card"
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
