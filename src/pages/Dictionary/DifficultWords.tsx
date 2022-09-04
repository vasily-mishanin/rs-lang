import './DifficultWords.pcss';
import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import * as apiUserWords  from '../../model/api-userWords';

import WordsList from '@/components/Textbook/WordsList';
import type { Word } from '@/model/app-types';
import type { RootState } from '@/store/store';

const DifficultWords = (): JSX.Element =>{
  const [words, setWords] = useState<Word[]>([]);
  const authState = useSelector((state: RootState) => state.authentication);
  const userWordsState = useSelector((state:RootState) => state.userWords);

  const filter = '{"$and":[{"userWord.difficulty":"hard"}]}'; // 'hard' words

  useEffect(() => {
    apiUserWords.getUserAggregatedWords(authState.userId, authState.token, { filter, wordsPerPage: '600' })
      .then(res => {
        console.log('getUserAggregatedWords', res);
        if(res){
          setWords(res);
        }
      })
      .catch(() => {});
  }, [authState.userId, authState.token, userWordsState.userWords]);

  return <section className='difficult-words'>
    <WordsList words={words}/>
  </section>;
};
export default DifficultWords;
