import { useEffect, useMemo, useState } from 'react';

const WORDS = [
  'HARU',
  'NATSU',
  'SAKURA',
  'KEISUKE',
  'BAACHAN',
  'YURICHAN',
  'ABBORRE',
  'JÄDDA',
  'GÖS',
  'RÖDING',
  'GASHIRA',
  'SAME',
  'ABURAHAYA',
  'LACHS',
  'KAREI',
  'UNI',
];

function getRandomWordIndex(): number {
  return Math.floor(Math.random() * WORDS.length);
}

function App() {
  const [wordIndex, setWordIndex] = useState<number>(getRandomWordIndex());
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const currentWord = useMemo(() => WORDS[wordIndex], [wordIndex]);

  useEffect(() => {
    const setter = (e: KeyboardEvent) => {
      if (currentWord.length === currentCharIndex) return;

      const keyUpper = e.key.toUpperCase();

      if (keyUpper === currentWord.charAt(currentCharIndex)) {
        setCurrentCharIndex((state) => state + 1);
      }
    };

    window.addEventListener('keyup', setter);

    return () => {
      window.removeEventListener('keyup', setter);
    };
  }, [wordIndex, currentCharIndex, currentWord]);

  return (
    <div className='grid justify-center bg-slate-800 min-h-screen items-center'>
      <div>
        <h1 className='text-4xl font-bold text-red-500'>HARU GAME</h1>
        <span className='text-white text-9xl font-black'>{currentWord}</span>
        <div className='my-5 border-2 rounded-md p-5 text-center'>
          <span className='text-4xl text-sky-200 font-bold'>{currentWord.substring(0, currentCharIndex)}</span>
        </div>
        <button
          onClick={() => {
            setWordIndex(getRandomWordIndex());
            setCurrentCharIndex(0);
          }}
          className='px-4 py-2 bg-lime-500 w-full text-xl text-slate-800'
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default App;
