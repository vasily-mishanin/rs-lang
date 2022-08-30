import WordCard from './WordCard';
import './WordsList.pcss';

import Card from '../ui/Card/Card';

import type { Word } from '@/model/app-types';

interface IWordsList {
  words: Word[];
}

const WordsList = (props: IWordsList): JSX.Element => {
  const { words } = props;

  return (
    <ul className="words-list">
      {words.map(word => {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
        const id = word.id ? word.id : word._id;
        return (
          <li key={id} className="words-list-item">
            <Card>
              <WordCard word={word} />
            </Card>
          </li>
        );
      })}
    </ul>
  );
};
export default WordsList;
