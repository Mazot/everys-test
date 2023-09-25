import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './ui/App';

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);

root.render(<App />);