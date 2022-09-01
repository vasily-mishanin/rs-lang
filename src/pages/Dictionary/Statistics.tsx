import { useSelector } from 'react-redux';

import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/Button/Button';
import { deleteUserWord, getUserWords } from '@/model/api-userWords';
import { RootState } from '@/store/store';

const Statistics = (): JSX.Element => {

  // const [words, setWords] = useState<GameStatsProgressWord[]>([]);
  const learned = useRef<Array<string>>([]);
  const hard = useRef<Array<string>>([]);
  const neww = useRef<Array<string>>([]);

  const authState = useSelector((state: RootState) => state.authentication);

  const loadData = async () =>{
    // const currentStatistic = await getUserStatistic(authState.userId, authState.token);

    const allWords = await getUserWords(authState.userId, authState.token);
    learned.current = allWords!.filter(el => el.difficulty === 'learned').map(el => el.optional.wordId);
    hard.current = allWords!.filter(el => el.difficulty === 'hard').map(el => el.optional.wordId);
    neww.current = allWords!.filter(el => el.difficulty === 'new').map(el => el.optional.wordId);

  };

  const dropItem = async (el: string) =>{
    await deleteUserWord(authState.userId, el, authState.token);
  };

  const dropLearned = () =>{
    learned.current.forEach(el => {
      dropItem(el).catch(()=>{});
    });

  };
  const dropHard = () =>{
    hard.current.forEach(el => {
      dropItem(el).catch(()=>{});
    });
  };
  const dropNew = () =>{
    neww.current.forEach(el => {
      dropItem(el).catch(()=>{});
    });
  };

  useEffect(() => {
    loadData().catch(()=>{});
  });

  return (
    <section className='difficult-words w-full flex flex-col items-center'>
      <h1>Debug and test tools</h1>
      <div className="flex justify-around">
        <Button
          text='Drop Learned'
          buttonType='primary'
          onClick={dropLearned}
        />
        <Button
          text='Drop Hard'
          buttonType='primary'
          onClick={dropHard}
        />
        <Button
          text='Drop New'
          buttonType='primary'
          onClick={dropNew}
        />
      </div>

    </section>
  );};
export default Statistics;
