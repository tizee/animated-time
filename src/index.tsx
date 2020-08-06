import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { CodeCard } from 'tz-codecard';
import Graph from './components/Graph';
import Card from './components/Card';

import 'highlight.js/styles/atom-one-dark.css';

import { timings } from './components/timings';
import './index.scss';
const names = Object.keys(timings);

const App = () => {
  const [idx, set] = useState(0);
  console.log(timings[names[idx]][1]);
  return (
    <div className='wrapper'>
      <header className='header'>
        <div className='header-wrapper'>
          <h3>Animated Time</h3>
        </div>
      </header>
      <div className='canvas-wrapper'>
        <Graph
          timingFunc={timings[names[idx]][0]}
          pointJoin='line'
          pointsNum={15}
        />
      </div>
      <div className='list-wrapper'>
        <div className='card-list'>
          {names.map((el, i) => {
            const cls = i === idx ? 'selected' : '';
            return (
              <Card
                key={el}
                title={el}
                className={cls}
                onClick={() => {
                  set(i);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className='code-display'>
        <CodeCard languages={['javascript']}>{timings[names[idx]][1]}</CodeCard>
      </div>
      <footer className='footer'>
        Made by <a href='https://github.com/tizee'>tizee</a>
      </footer>
    </div>
  );
};

ReactDOM.render(<App></App>, document.querySelector('.app-root'));
