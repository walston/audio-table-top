import { useMemo, useRef } from "react";
import "./Player.css";

interface PlayerProps {
  file: File | null;
  onChange: (file: File) => void;
}

function AudioPlayer({ file }: { file: File }) {
  const url = useMemo(() => URL.createObjectURL(file), [file]);
  return (
    <div>
      <h5 className="filename">{file.name}</h5>
      <audio key={url} controls loop>
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export function Player({ file, onChange }: PlayerProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  return (
    <>
      {file && <AudioPlayer file={file} />}
      <button
        className="upload-button"
        onClick={() => uploadRef.current?.click()}
      >
        Import
      </button>
      <input
        className="hidden"
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
}

export default Player;
