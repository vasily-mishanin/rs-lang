import type { Word } from '@/model/app-types';

interface ITextbookPage {
  words: Word[];
}

const TextbookPage = (props: ITextbookPage): JSX.Element => {
  const { words } = props;
  console.log('TextbookPage', words);
  return (
    <section>
      <h3>TextbookPage words ({words.length})</h3>
      <div>
        <ul>
          {words.map(word => (
            <li key={word.id}>{word.word}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default TextbookPage;
