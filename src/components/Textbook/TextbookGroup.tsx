import { useMatch, useNavigate, Link } from '@tanstack/react-location';

import WordsList from './WordsList';

import Pagination from '../Pagination/Pagination';

import type { LocationGenerics } from '@/model/app-types';

import './TextbookGroup.pcss';

const TextbookGroup = (): JSX.Element => {
  const {
    data: { words: currentWords },
  } = useMatch<LocationGenerics>();

  console.log('TextbookGroup-words', currentWords);

  const { params } = useMatch();
  const navigate = useNavigate();

  const TOTAL_WORDS = 3600;
  const TOTAL_GROUPS = 6;
  const WORDS_PER_PAGE = 20;
  const WORDS_PER_GROUP = TOTAL_WORDS / TOTAL_GROUPS;

  const paginate = (pageNumber: number) => {
    console.log('paginate', pageNumber);
    navigate({ to: `/textbook/${params.group}/${pageNumber - 1}` });
  };

  const gamePath = (gameName: string) => {
    let path = `/games/${gameName}`;
    if (params.group) {
      path += `/?group=${params.group}`;
      if (params.page) {
        path += `&page=${params.page}`;
      }
    }
    return path;
  };

  return (
    <section className="textbook-group">
      <h1>
        {params.group && parseInt(params.group, 10) + 1} -{' '}
        {params.page && parseInt(params.page, 10) + 1}
      </h1>
      <div className="textbook-group-controls">
        <Pagination
          totalElements={WORDS_PER_GROUP}
          elementsPerPage={WORDS_PER_PAGE}
          paginate={paginate}
        />
        <div className="textbook-group-games-links">
          <Link to={gamePath('sprint')}>Sprint</Link>
          <Link to={gamePath('audio')}>Audio</Link>
        </div>
      </div>

      {currentWords && <WordsList words={currentWords} />}
    </section>
  );
};

export default TextbookGroup;
