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

  const filter = '{"$and":[{"userWord.difficulty":"hard"}]}';
  // const groupPage = { group: '5', page:'0' };

  useEffect(() => {
    apiUserWords.getUserAggregatedWords(authState.userId, authState.token, { filter })
      .then(res => {
        console.log(res);
        if(res){
          setWords(res);
        }
      })
      .catch(() => {});
  }, []);

  return <section className='difficult-words'>
    <h1>DifficultWords</h1>
    <WordsList words={words}/>
  </section>;
};
export default DifficultWords;
