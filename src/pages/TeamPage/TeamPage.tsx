import { ITeamMember, TeamCard } from './TeamCard/TeamCard';
import './TeamPage.pcss';

import teamPhoto1 from '@/assets/photos/team-member-1.jpg';
import teamPhoto2 from '@/assets/photos/team-member-2.jpg';
import teamPhoto3 from '@/assets/photos/team-member-3.jpg';

const members: ITeamMember[] = [
  { name : 'Василий Мишанин',
    role : 'Full stack developer',
    description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, architecto.',
    photo: teamPhoto1,
    links: {
      github: 'https://github.com/vasily-mishanin',
      linkedin: 'https://ru.linkedin.com',
    },
  },
  { name : 'Артем Ромаскевич',
    role : 'Front end developer',
    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et autem sapiente quisquam delectus perspiciatis eos laudantium quas consequuntur. Necessitatibus, repellat repellendus? Obcaecati quia aliquam nemo?',
    photo: teamPhoto2,
    links: {
      github: 'https://github.com/romaskevich',
      linkedin: 'https://ru.linkedin.com',
    },
  },
  { name : 'Андрей Комиссаров',
    role : 'Team lead',
    description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, architecto.',
    photo: teamPhoto3,
    links: {
      github: 'https://github.com/m208',
      linkedin: 'https://ru.linkedin.com',
    },
  },
];

export const TeamPage = (): JSX.Element => (

  <div className="team">
    <h2 className="team_heading">Знакомьтесь с нашей командой</h2>

    <div className="team_members">
      {members.map(member=>(<TeamCard member={member} key={parseInt(member.links.github, 16)} />))}
    </div>
  </div>

);
