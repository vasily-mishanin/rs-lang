import './WordCard.pcss';
import htmlParser from 'html-react-parser';

import { API_ENDPOINT } from '@/model/api-words';
import type { Word } from '@/model/app-types';

const WordCard = (props: { word: Word }): JSX.Element => {
  const { word: wordObj } = props;
  const {
    id,
    group,
    page,
    word,
    image,
    audio,
    audioMeaning,
    audioExample,
    textMeaning,
    textExample,
    transcription,
    wordTranslate,
    textMeaningTranslate,
    textExampleTranslate,
  } = wordObj;

  return (
    <article className="word-card">
      <img src={`${API_ENDPOINT}/${image}`} alt={word} />
      <div>
        {' '}
        <p>
          {word} <span>{transcription}</span>
        </p>
        <p>{wordTranslate}</p>
        <hr />
        <p>{htmlParser(textMeaning)}</p>
        <p>{`${textMeaningTranslate}`}</p>
        <hr />
        <p>{htmlParser(textExample)}</p>
        <p>{textExampleTranslate}</p>
      </div>
      <audio controls src={`${API_ENDPOINT}/${audio}`}>
        {' '}
        <track kind="captions" />
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </article>
  );
};
export default WordCard;
