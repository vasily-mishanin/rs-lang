import { PuzzleIcon, AcademicCapIcon, SparklesIcon } from '@heroicons/react/outline';
import { Outlet } from '@tanstack/react-location';

import { NavButton } from '@/components/ui/NavButton/NavButton';
import './DictionaryPage.pcss';

const DictionaryPage = (): JSX.Element => (
  <section className='dictionary'>

    <div className="flex w-full justify-center my-8">

      <NavButton
        href='difficult'
        icon={{ icon: PuzzleIcon }}
        name='Сложные слова'
        description='Которые Вы отметили'
      />

      <NavButton
        href='learned'
        icon={{ icon: AcademicCapIcon }}
        name='Изученные слова'
        description='Все которые изучены'
      />

      <NavButton
        href='progress'
        icon={{ icon: SparklesIcon }}
        name='Новые слова'
        description='Слова встреченные в играх'
      />

    </div>

    <Outlet />

  </section>
);
export default DictionaryPage;
