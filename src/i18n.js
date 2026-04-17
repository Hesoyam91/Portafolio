import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      "sysTime": "SYS_TIME",
      "changeLang": "EN",
      "resumeTitle": "Resumen Profesional",
      "resumeText": "Desarrollador Full-Stack con sólida formación en Ingeniería en Informática y experiencia práctica en el ciclo completo de desarrollo de software: desde arquitecturas backend e inteligencia artificial hasta interfaces frontend modernas y despliegue en la nube. Desarrollo con criterio técnico, visión de producto y capacidad de entrega. Proactivo, orientado a resultados y con alta adaptabilidad a nuevas tecnologías.",
      "resumeHighlight": "Desarrollo con criterio técnico, visión de producto y capacidad de entrega.",
      "contactMe": "Contacto // Enlace Seguro",
      "contactSub": "¿Tienes un proyecto en mente? Conversemos.",
      "techStack": "Tecnologías y Especialidades",
      "tech1": "Backend & Machine Learning",
      "tech1Desc": "Arquitecturas RAG (LangChain, Llama 3, ChromaDB). Lenguajes: Python, Node.js, TypeScript, C#, SQL. Frameworks: FastAPI, Django, Express. Integraciones y automatizaciones.",
      "tech2": "Frontend & Mobile",
      "tech2Desc": "React 18, Tailwind CSS v4, HTML5, CSS3. Aplicaciones híbridas (Ionic). Visualización avanzada de datos.",
      "tech3": "Infraestructura & Cloud",
      "tech3Desc": "Gestión en Azure Cloud. Bases de datos SQL Server (diseño y optimización). Control de versiones (Git/GitHub), ISO 27001.",
      "eduTitle": "Educación & Certificaciones",
      "edu1": "Ingeniería en Informática — Duoc UC",
      "cert1": "Microsoft Certified: Azure Fundamentals (AZ-900)",
      "cert2": "EF SET English Certificate: C1 Advanced",
      "projectsTitle": "Proyectos Destacados",
      "pArea": "Desarrollo Freelance & Personal",
      "p1": "ZoneShuffle",
      "p1d": "Plataforma de radio online full-stack con reproducción global sincronizada mediante SSE. Incluye panel de DJ, visualizador estilo WMP 2008 y procesamiento automático de archivos ZIP.",
      "p2": "YTAgent",
      "p2d": "Asistente personal en desarrollo con IA para YT Music. Utiliza LangChain y Grok para interactuar y analizar el historial musical mediante lenguaje natural.",
      "p3": "ArchiveRewritter",
      "p3d": "Aplicación de escritorio ligera en Electron diseñada para renombrar archivos masivamente bajo estructuras personalizadas de tipo [Nombre][Separador][NúmeroCorrelativo].",
      "p4": "Plataforma Manga & Cómics",
      "p4d": "Arquitectura íntegra: Backend rápido en FastAPI, Frontend en React 18, bases de datos SQL Server y despliegue completo en entorno Azure.",
      "p5": "Modelo 3D Interactivo",
      "p5d": "Optimización de modelos 3D y entorno WebGL / Three.js para la cuenca del Lago Chapo. Interacciones de alto rendimiento.",
      "repoBtn": "Ver Repositorio"
    }
  },
  en: {
    translation: {
      "sysTime": "SYS_TIME",
      "changeLang": "ES",
      "resumeTitle": "Professional Summary",
      "resumeText": "Full-Stack Developer with a solid background in Computer Engineering and hands-on experience across the entire software development lifecycle: from backend architectures and artificial intelligence to modern frontend interfaces and cloud deployments. Driven by technical insight and product vision with strong delivery capacity. Proactive, results-oriented, and highly adaptable to new technologies.",
      "resumeHighlight": "Driven by technical insight and product vision with strong delivery capacity.",
      "contactMe": "Contact // Secure Link",
      "contactSub": "Have a project in mind? Let's talk.",
      "techStack": "Technologies & Stack",
      "tech1": "Backend & Machine Learning",
      "tech1Desc": "RAG Architectures (LangChain, Llama 3, ChromaDB). Languages: Python, Node.js, TypeScript, C#, SQL. Frameworks: FastAPI, Django, Express. Automations.",
      "tech2": "Frontend & Mobile",
      "tech2Desc": "React 18, Tailwind CSS v4, HTML5, CSS3. Hybrid apps (Ionic). Advanced data visualization.",
      "tech3": "Cloud & Infrastructure",
      "tech3Desc": "Azure Cloud management. SQL Server databases (design and query tuning). CI/CD Git flows, ISO 27001.",
      "eduTitle": "Education & Certifications",
      "edu1": "B.S. Computer Engineering — Duoc UC",
      "cert1": "Microsoft Certified: Azure Fundamentals (AZ-900)",
      "cert2": "EF SET English Certificate: C1 Advanced",
      "projectsTitle": "Selected Projects",
      "pArea": "Freelance & Personal Engineering",
      "p1": "ZoneShuffle",
      "p1d": "Full-stack online radio platform with globally synchronized playback via SSE. Features a secured DJ Panel, retro-modern WMP 2008 visualizer, and automated ZIP file data extraction.",
      "p2": "YTAgent",
      "p2d": "WIP AI-powered personal assistant for YouTube Music. Leverages LangChain and Grok to analyze history, manage playlists, and recommend tracks through natural language queries.",
      "p3": "ArchiveRewritter",
      "p3d": "Lightweight Electron desktop application designed to easily rename files in bulk following customizable [Name][Separator][Number] patterns.",
      "p4": "Manga reading platform",
      "p4d": "End-to-end fullstack platform: High-performance FastAPI backend, React 18 UI, paired with SQL Server databases and Azure Deployments.",
      "p5": "Interactive 3D Model",
      "p5d": "3D model geometry corrections and advanced rendering optimization using purely WebGL / Three.js for interactive topography.",
      "repoBtn": "View Repository"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "es", // idioma por defecto
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
