import React from 'react';
import './index.scss';

interface Props {
  title: string;
  className: string;
  onClick: any;
}

const Card: React.FC<Props> = ({ title, onClick, className }) => {
  return (
    <div className={['card', className].join(' ')} onClick={onClick}>
      {title}
    </div>
  );
};

export default Card;
