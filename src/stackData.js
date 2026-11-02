import {
  siPython, siNodedotjs, siTypescript, siJavascript, siReact, siExpress, siFastapi,
  siDjango, siTailwindcss, siVite, siElectron, siLangchain, siThreedotjs, siIonic,
  siGooglechrome, siHtml5, siCss, siMeta, siDocker, siGit, siGithub, siVitest,
} from 'simple-icons';

// `icon` is a simple-icons entry; items without one render a text monogram instead
const item = (name, icon, mono) => ({ name, icon, mono });

export const STACK_GROUPS = [
  {
    key: 'stackCore',
    items: [
      item('React', siReact),
      item('TypeScript', siTypescript),
      item('JavaScript', siJavascript),
      item('Node.js', siNodedotjs),
      item('Python', siPython),
      item('Tailwind CSS', siTailwindcss),
      item('HTML5', siHtml5),
      item('CSS3', siCss),
    ],
  },
  {
    key: 'stackProjects',
    items: [
      item('Express', siExpress),
      item('FastAPI', siFastapi),
      item('Django', siDjango),
      item('Vite', siVite),
      item('Electron', siElectron),
      item('Three.js / WebGL', siThreedotjs),
      item('Ionic', siIonic),
      item('Chrome Extensions', siGooglechrome),
      item('LangChain', siLangchain),
      item('Llama 3', siMeta),
      item('ChromaDB', null, 'Ch'),
      item('Recharts', null, 'Rc'),
    ],
  },
  {
    key: 'stackTools',
    items: [
      item('SQL', null, 'SQL'),
      item('SQL Server', null, 'MS'),
      item('Azure', null, 'Az'),
      item('Docker', siDocker),
      item('Git', siGit),
      item('GitHub', siGithub),
      item('Vitest', siVitest),
    ],
  },
];
