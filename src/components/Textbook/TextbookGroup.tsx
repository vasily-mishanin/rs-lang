import { useParams, useNavigate, Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import WordsList from './WordsList';

import * as api from '../../model/api-words';
import Pagination from '../Pagination/Pagination';

import type { Word } from '@/model/app-types';

import './TextbookGroup.pcss';

const TextbookGroup = (): JSX.Element => {
  const params = useParams();
  const { group, page } = params;
  const [loading, setLoading] = useState(false);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const navigate = useNavigate();

  console.log('TextbookGroup', params);

  const TOTAL_WORDS = 3600;
  const TOTAL_GROUPS = 6;
  const WORDS_PER_PAGE = 20;
  const WORDS_PER_GROUP = TOTAL_WORDS / TOTAL_GROUPS;

  useEffect(() => {
    if (group && page) {
      console.log('useEffect');
      setLoading(true);
      api
        .getWords(group, page)
        .then(res => {
          setLoading(false);
          return res.json();
        })
        .then((words: Word[]) => {
          console.log('useEffect-words', words);
          setCurrentWords(words);
        })
        .catch(err => console.log(err));
    }
  }, [group, page]);

  const paginate = (pageNumber: number) => {
    if (group) {
      navigate(`/textbook/${group}/${pageNumber - 1}`);
    }
  };

  const gamePath = (gameName:string) =>{
    let path = `/games/${gameName}`;
    if(group){
      path += `/${group}`;
      if(page){
        path+=`/${page}`;
      }
    }
    console.log(path);
    return path;
  };

  return (
    <section className='textbook-group'>
      <h1>
        {params.group && parseInt(params.group, 10) + 1} -{' '}
        {params.page && parseInt(params.page, 10) + 1}
      </h1>
      <div className='textbook-group-controls'>
        <Pagination
          totalElements={WORDS_PER_GROUP}
          elementsPerPage={WORDS_PER_PAGE}
          paginate={paginate}
        />
        <div className='textbook-group-games-links' >
          <Link to={gamePath('sprint')}>Sprint</Link>
          <Link to={gamePath('audio')}>Audio</Link>
        </div>
      </div>

      {loading ? 'LOADING...' : <WordsList words={currentWords} />}
    </section>
  );
};

export default TextbookGroup;
