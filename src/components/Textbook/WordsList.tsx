import WordCard from './WordCard';
import './WordsList.pcss';

import Card from '../ui/Card/Card';

import type { Word } from '@/model/app-types';

interface ITextbookPage {
  words: Word[];
}

const TextbookPage = (props: ITextbookPage): JSX.Element => {
  const { words } = props;
  console.log('TextbookPage');

  return (
    <section className="words-section">
      <h3>TextbookPage words ({words.length})</h3>
      <div>
        <ul className="words-list">
          {words.map(word => (
            <li key={word.id} className="words-list-item">
              <Card>
                <WordCard word={word} />
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default TextbookPage;
