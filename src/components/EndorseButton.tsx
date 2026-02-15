import React from 'react';

const EndorseButton: React.FC<{ onClick: () => void; count: number; disabled?: boolean }> = ({
  onClick,
  count,
  disabled,
}) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      Endorse ({count})
    </button>
  );
};

export default EndorseButton;
