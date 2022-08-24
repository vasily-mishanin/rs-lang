import classNames from 'classnames';
import './Button.pcss';

type ButtonType = 'primary' | 'secondary' | 'accept' | 'decline';
type ButtonTypeMap = {
  [key in ButtonType]: string;
};
export const buttonTypeMap: ButtonTypeMap = {
  primary: 'button_primary',
  secondary: 'button_secondary',
  accept: 'button_accept',
  decline: 'button_decline',
};

interface ButtonProps {
  text: string;
  buttonType: ButtonType;
  onClick?: ()=>void;
}

export const Button = ({ text, buttonType, onClick }: ButtonProps): JSX.Element => (
  <div className="button_wrapper">
    <button
      type = 'button'
      className={
        classNames(
          'cta_button',
          buttonType && buttonTypeMap[buttonType],
        )
      }
      onClick = {onClick}
    >
      {text}
    </button>
  </div>

);
