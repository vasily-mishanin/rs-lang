import './DifficultWords.pcss';
import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import * as apiUserWords  from '../../model/api-userWords';

import WordsList from '@/components/Textbook/WordsList';
import type { Word } from '@/model/app-types';
import type { RootState } from '@/store/store';

const LearnedWords = (): JSX.Element => {
  const [words, setWords] = useState<Word []>([]);
  const authState = useSelector((state: RootState) => state.authentication);

  const filter = '{"$and":[{"userWord.difficulty":"learned"}]}';

  useEffect(() => {
    apiUserWords.getUserAggregatedWords(authState.userId, authState.token, { group: '5', page:'0', filter })
      .then(res => {
        console.log(res);
        if(res){
          setWords(res);
        }
      })
      .catch(() => {});
  }, [authState.userId, authState.token]);

  return (<section className='difficult-words'>
    <h1>Learned Words</h1>
    {words.length > 0 && <WordsList words={words}/>}
  </section>);
};
export default LearnedWords;
