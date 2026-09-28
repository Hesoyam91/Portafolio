import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      "sysTime": "SYS_TIME",
      "changeLang": "EN",
      "heroRole": "Desarrollador Full-Stack",
      "resumeTitle": "Resumen Profesional",
      "resumeText": "Desarrollador Full-Stack con sólida formación en Ingeniería en Informática y experiencia práctica en el ciclo completo de desarrollo de software: desde arquitecturas backend e inteligencia artificial hasta interfaces frontend modernas y despliegue en la nube. Desarrollo con criterio técnico, visión de producto y capacidad de entrega.",
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
      "p4": "Dashboard Ejecutivo",
      "p4d": "Dashboard en tiempo real con Vite, React, TypeScript, Tailwind y Recharts. Capa de ETL propia para métricas (conteo vs. promedio), indicadores de tendencia dinámicos y vista por defecto centrada en el último día.",
      "p5": "LinkePost",
      "p5d": "Extensión de navegador (Chrome, Firefox y Safari) que genera publicaciones de LinkedIn con un backend propio sobre Llama 3.1. Rate limiting por IP y despliegue serverless-friendly.",
      "p6": "Modelo 3D Interactivo",
      "p6d": "Optimización de modelos 3D y entorno WebGL / Three.js para la cuenca del Lago Chapo. Interacciones de alto rendimiento.",
      "repoBtn": "Ver Repositorio",
      "nextSection": "Siguiente"
    }
  },
  en: {
    translation: {
      "sysTime": "SYS_TIME",
      "changeLang": "ES",
      "heroRole": "Full-Stack Developer",
      "resumeTitle": "Professional Summary",
      "resumeText": "Full-Stack Developer with a solid background in Computer Engineering and hands-on experience across the entire software development lifecycle: from backend architectures and artificial intelligence to modern frontend interfaces and cloud deployments. Driven by technical insight and product vision with strong delivery capacity.",
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
      "p4": "Executive Dashboard",
      "p4d": "Real-time dashboard built with Vite, React, TypeScript, Tailwind and Recharts. Custom ETL layer for metrics (count vs. average), dynamic trend indicators, and a default view centered on the latest day.",
      "p5": "LinkePost",
      "p5d": "Browser extension (Chrome, Firefox and Safari) that generates LinkedIn posts through a self-hosted backend on Llama 3.1. Per-IP rate limiting and serverless-friendly deployment.",
      "p6": "Interactive 3D Model",
      "p6d": "3D model geometry corrections and advanced rendering optimization using purely WebGL / Three.js for interactive topography.",
      "repoBtn": "View Repository",
      "nextSection": "Next"
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
