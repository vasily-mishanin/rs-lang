import gitHubImage from '@/assets/images/logo-github.png';
import linkedinImage from '@/assets/images/logo-linkedin.png';

import './SocialLink.pcss';

type LinkType = 'github' | 'linkedin';
type LinkTypeMap = {
  [key in LinkType]: string;
};
export const linkImageMap: LinkTypeMap = {
  github: gitHubImage,
  linkedin: linkedinImage,
};

export interface SocialLinkProps {
  type: LinkType;
  link: string;
}

export const SocialLink = ({ type, link  }: SocialLinkProps): JSX.Element => (
  <div className="social_link">
    <a href={link}>
      <img className='social_image'
        src={linkImageMap[type]}
        alt="gitHub profile"
      />
    </a>
  </div>

);
