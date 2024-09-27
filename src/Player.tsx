import { useRef } from "react";
import "./Player.css";

interface PlayerProps {
  file: File | null;
  onChange: (file: File) => void;
}

export function Player({ file, onChange }: PlayerProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const button = (
    <>
      <button
        className="upload-button"
        onClick={() => uploadRef.current?.click()}
      >
        Import
      </button>
      <input
        ref={uploadRef}
        type="file"
        accept="audio/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
          }
        }}
      />
    </>
  );

  if (!file) {
    return button;
  }

  console.log("file", file);
  return (
    <>
      <div>
        <h5 className="filename">{file.name}</h5>
        <audio controls loop>
          <source src={URL.createObjectURL(file)} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {button}
    </>
  );
}

export default Player;
