import classNames from 'classnames';
import './Button.pcss';

type ButtonType = 'primary' | 'secondary';
type ButtonTypeMap = {
  [key in ButtonType]: string;
};
export const buttonTypeMap: ButtonTypeMap = {
  primary: 'button_primary',
  secondary: 'button_secondary',
};

interface ButtonProps {
  text: string;
  buttonType: ButtonType;
}

export const Button = ({ text, buttonType }: ButtonProps): JSX.Element => (
  <div className="button_wrapper">
    <button
      type = 'button'
      className={
        classNames(
          'cta_button',
          buttonType && buttonTypeMap[buttonType],
        )
      }
    >
      {text}
    </button>
  </div>

);
