import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import MermaidDiagram from './MermaidDiagram';
import Admonition from './Admonition';
import '../styles/markdown.css';

const MarkdownContent = ({ content, currentPage }) => {
  if (!currentPage) {
    return (
      <div className="text-center text-slate-500">
        <p>Selecciona una página para comenzar</p>
      </div>
    );
  }

  if (currentPage.isPdf) {
    return (
      <div className="w-full h-screen">
        <iframe
          src={`/content/tests/${currentPage.slug}.pdf`}
          className="w-full h-full"
          title={currentPage.title}
        />
      </div>
    );
  }

  const components = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      if (match && match[1] === 'mermaid') {
        return <MermaidDiagram content={String(children)} />;
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    blockquote: ({ children }) => {
      // Buscar el texto del admonition en el primer hijo
      const firstChild = children[0];
      if (!firstChild) return <blockquote>{children}</blockquote>;

      // Intentar encontrar el tipo de admonition
      const text = firstChild.props?.children?.[0];
      if (typeof text !== 'string') return <blockquote>{children}</blockquote>;

      const match = text.match(/^$$!(\w+)$$/);
      if (!match) return <blockquote>{children}</blockquote>;

      const type = match[1].toLowerCase();

      // Procesar el contenido del admonition
      const content = children.map((child, index) => {
        if (index === 0) {
          // Remover el [!type] del primer elemento
          const newContent = child.props.children[0].replace(
            /^$$!\w+$$\s*/,
            ''
          );
          return React.cloneElement(child, {
            children: newContent,
          });
        }
        return child;
      });

      return <Admonition type={type}>{content}</Admonition>;
    },
    h1: ({ children }) => {
      const id = children
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      console.log('Rendering h1:', { children, id });
      return <h1 id={id}>{children}</h1>;
    },
    h2: ({ children }) => {
      const id = children
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      console.log('Rendering h2:', { children, id });
      return <h2 id={id}>{children}</h2>;
    },
    h3: ({ children }) => {
      const id = children
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      console.log('Rendering h3:', { children, id });
      return <h3 id={id}>{children}</h3>;
    },
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
