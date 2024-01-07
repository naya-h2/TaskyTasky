import ButtonBase from './ButtonBase';
import { AddButton } from './AddButton/AddButton';
import { ArrowButton } from './ArrowButton/ArrowButton';
import { DashBoardButton } from './DashBoardButton/DashBoardButton';

const Button = Object.assign(ButtonBase, {
  Plain: ButtonBase,
  Add: AddButton,
  Arrow: ArrowButton,
  DashBoard: DashBoardButton,
});

export default Button;
