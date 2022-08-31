import './WordCard.pcss';
import { CheckIcon, PuzzleIcon } from '@heroicons/react/solid';
import htmlParser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import * as apiUsersWords from '../../model/api-userWords';
import { setUserWordDifficulty } from '../../model/api-userWords';
import { PlayAudio } from '../PlayAudio/PlayAudio';

import { API_ENDPOINT } from '@/model/api-words';
import type { UserWord, Word } from '@/model/app-types';
import { RootState } from '@/store/store';
import { userWordsActions } from '@/store/userWordSlice';

// export interface IconPack {
//   hardWord: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
//   learnedWord: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
// };

type TSVGIcon = {
  icon:(props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const WordCard = (props: { word: Word }): JSX.Element => {
  const { word: wordObj } = props;
  const authState = useSelector((state:RootState) => state.authentication);
  const userWordsState = useSelector((state:RootState) => state.userWords);
  const wordInUsersWords = userWordsState.userWords.find(w => w.optional.wordId === wordObj.id);
  const dispatch = useDispatch();

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

  const controlHardBtnClasses = () => {
    const baseClass = 'usual hard';
    if(wordInUsersWords && wordInUsersWords.difficulty === 'hard') {
      return `${baseClass} active-hard`;
    }
    return baseClass;
  };

  const controlLearnedBtnClasses = () => {
    const baseClass = 'usual learned';
    if(wordInUsersWords && wordInUsersWords.difficulty === 'learned') {
      return `${baseClass} active-learned`;
    }
    return baseClass;
  };

  const handleHardWord = async () => {

    console.log('handleHardWord');
    await setUserWordDifficulty(authState.userId, authState.token, wordObj.id, wordObj.word, 'hard').catch(() => {});
    const newWord:UserWord = {
      difficulty: 'hard',
      optional:{
        wordId: wordObj.id,
        theWord: wordObj.word,
        postDate: new Date().toISOString(),
      },
    };
    dispatch(userWordsActions.addUserWord(newWord));

    // else => update Word (state and server)
  };

  const handleLearnedWord = async () => {

    console.log('handleLearnedWord');
    await setUserWordDifficulty(authState.userId, authState.token, wordObj.id, wordObj.word, 'learned').catch(() => {});
    const newWord:UserWord = {
      difficulty: 'learned',
      optional:{
        wordId: wordObj.id,
        theWord: wordObj.word,
        postDate: new Date().toISOString(),
      },
    };
    dispatch(userWordsActions.addUserWord(newWord));

    // else => update Word (state and server)

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

        { authState.isLoggedIn && <div className='word-card-controls'>
          <button className={controlHardBtnClasses()}  type='button' onClick={() => {handleHardWord().catch(() => {});}} data-tip="Добавить в сложные">
            <hardWordIcon.icon/>
          </button>
          <button className={controlLearnedBtnClasses()} type='button' onClick={()=>{handleLearnedWord().catch(()=>{});}} data-tip="Добавить в изученные">
            <learnedWord.icon/>
          </button>

        </div> }

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
      <ReactTooltip type='info' delayShow={500}/>
    </article>
  );
};
export default WordCard;
