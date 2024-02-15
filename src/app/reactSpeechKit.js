/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

export default function ReactSpeechKit() {
  const [text, setText] = useState('I am a robot');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(null);

  const [value, setValue] = useState('');
  // const { speak } = useSpeechSynthesis();

  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  const voice = voices[voiceIndex] || null;

  const styleFlexRow = { display: 'flex', flexDirection: 'row' };
  const styleContainerRatePitch = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 12,
  };

  return (
    <div>
      <div className='row'>
        <div className='col-12'>
          <label htmlFor="voice">Voice</label>
          <select
            id="voice"
            name="voice"
            value={voiceIndex || ''}
            onChange={(event) => {
              setVoiceIndex(event.target.value);
            }}
          >
            <option value="">Default</option>
            {voices.map((option, index) => (
              <option key={option.voiceURI} value={index}>
                {`${option.lang} - ${option.name}`}
              </option>
            ))}
          </select>
        </div>
        <div className='col-12'>
          <label htmlFor="rate">Rate: </label>
          <div className="rate-value">{rate}</div>
          <input
            type="range"
            min="0.5"
            max="2"
            defaultValue="1"
            step="0.1"
            id="rate"
            onChange={(event) => {
              setRate(event.target.value);
            }}
          />
        </div>
        <div className='col-12'>
          <label htmlFor="pitch">Pitch: </label>
          <div className="pitch-value">{pitch}</div>
          <input
            type="range"
            min="0"
            max="2"
            defaultValue="1"
            step="0.1"
            id="pitch"
            onChange={(event) => {
              setPitch(event.target.value);
            }}
          />
        </div>

      </div>
      <div className='col-12'>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        {speaking ? (
          <button type="button" onClick={cancel}>
            Stop
          </button>
        ) : (
          <button
            type="button"
            onClick={() => speak({ text, voice, rate, pitch })}
          >
            Speak
          </button>
        )}
      </div>
      {/* <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={() => speak({ text: value })}>Speak</button> */}
    </div>
  );
}
