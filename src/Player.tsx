import React from "react";

interface PlayerProps {
  file: string | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Player: React.FC<PlayerProps> = ({ file, onChange }) => {
  if (!file) {
    return <input type="file" accept="audio/mpeg" onChange={onChange} />;
  }
  return (
    <audio controls loop>
      <source src={file} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default Player;
