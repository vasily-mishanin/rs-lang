import './WordCard.pcss';
import { CheckIcon, PuzzleIcon } from '@heroicons/react/solid';
import htmlParser from 'html-react-parser';
import { useSelector } from 'react-redux';

import * as apiUsersWords from '../../model/api-userWords';
import { PlayAudio } from '../PlayAudio/PlayAudio';

import { API_ENDPOINT } from '@/model/api-words';
import type { Word } from '@/model/app-types';
import { RootState } from '@/store/store';

// export interface IconPack {
//   hardWord: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
//   learnedWord: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
// };

type TSVGIcon = {
  icon:(props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const WordCard = (props: { word: Word }): JSX.Element => {
  const authState = useSelector((state:RootState) => state.authentication);

  const { word: wordObj } = props;
  const {
    // id,
    // group,
    // page,
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

  const audioSources = [audio, audioMeaning, audioExample].map(source=>`${API_ENDPOINT}/${source}`);
  const wordAudio = audioSources[0];
  const additionalAudio = audioSources.slice(1);

  const hardWordIcon:TSVGIcon = { icon:PuzzleIcon };
  const learnedWord:TSVGIcon = { icon:CheckIcon };

  const handleHardWord = async () => {
    console.log('handleHardWord');
    await apiUsersWords.createUserWord(authState.userId, wordObj, 'hard', authState.token).catch(() => {});
  };

  const handleLearnedWord = async () => {
    console.log('handleLearnedWord');
    await apiUsersWords.createUserWord(authState.userId, wordObj, 'learned', authState.token).catch(() => {});

  };

  return (
    <article className="word-card">
      <div className='word-card-essence'>

        <div>
          <p>
            {word} <span>{transcription}</span>
          </p>
          <p>
            {wordTranslate}
          </p>
        </div>
        <PlayAudio source={wordAudio} additionalSources={additionalAudio} type='single-button'/>

        <div className='word-card-controls'>
          <button  type='button' onClick={() => {handleHardWord().catch(() => {});}}>
            <hardWordIcon.icon/>
          </button>
          <button type='button' onClick={handleLearnedWord}>
            <learnedWord.icon/>
          </button>

        </div>
      </div>

      <img src={`${API_ENDPOINT}/${image}`} alt={word} />

      <div>
        <hr />
        <p>{htmlParser(textMeaning)}</p>
        <p>{`${textMeaningTranslate}`}</p>
        <hr />
        <p>{htmlParser(textExample)}</p>
        <p>{textExampleTranslate}</p>
      </div>

    </article>
  );
};
export default WordCard;
