'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type SoundMode = 'ready' | 'on' | 'off';

export default function AmbientSound() {
  const audio = useRef<HTMLAudioElement>(null);
  const [mode, setMode] = useState<SoundMode>('ready');

  useEffect(() => {
    const player = audio.current;
    if (!player) return;
    player.volume = .38;

    const preference = window.localStorage.getItem('decolab-sound');
    if (preference === 'off') { setMode('off'); return; }

    let listening = false;
    const stopListening = () => {
      if (!listening) return;
      window.removeEventListener('pointerdown', unlock, true);
      window.removeEventListener('keydown', unlock, true);
      listening = false;
    };
    const begin = () => player.play().then(() => {
      setMode('on');
      window.localStorage.setItem('decolab-sound', 'on');
      stopListening();
    }).catch(() => setMode('ready'));
    const unlock = () => { void begin(); };

    void player.play().then(() => {
      setMode('on');
      window.localStorage.setItem('decolab-sound', 'on');
    }).catch(() => {
      setMode('ready');
      listening = true;
      window.addEventListener('pointerdown', unlock, true);
      window.addEventListener('keydown', unlock, true);
    });

    return stopListening;
  }, []);

  const toggle = () => {
    const player = audio.current;
    if (!player) return;
    if (mode === 'on') {
      player.pause();
      setMode('off');
      window.localStorage.setItem('decolab-sound', 'off');
      return;
    }
    void player.play().then(() => {
      setMode('on');
      window.localStorage.setItem('decolab-sound', 'on');
    });
  };

  return (
    <>
      <audio ref={audio} src="/audio/decolab-ambient.mp3" loop preload="metadata" />
      <button className={`sound-toggle is-${mode}`} onClick={toggle} aria-label={mode === 'on' ? 'Turn ambient sound off' : 'Turn ambient sound on'}>
        <span className="sound-bars"><i/><i/><i/></span>
        <span>{mode === 'ready' ? 'SOUND / START' : `SOUND / ${mode.toUpperCase()}`}</span>
        {mode === 'on' ? <Volume2 size={13}/> : <VolumeX size={13}/>}
      </button>
    </>
  );
}
