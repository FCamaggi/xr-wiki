import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import MermaidDiagram from './MermaidDiagram';
import Admonition from './Admonition';
import useMarkdown from '../hooks/useMarkdown';
import '../styles/markdown.css';

const MarkdownContent = ({ slug, content }) => {
  const { loading, error } = useMarkdown(slug);
  console.log('MarkdownContent rendering with slug:', slug);
  console.log('Content loaded:', content?.substring(0, 200));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 rounded-lg bg-red-50 border border-red-200">
        Error: {error}
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

      const match = text.match(/^\[!(\w+)\]/);
      if (!match) return <blockquote>{children}</blockquote>;

      const type = match[1].toLowerCase();

      // Procesar el contenido del admonition
      const content = children.map((child, index) => {
        if (index === 0) {
          // Remover el [!type] del primer elemento
          const newContent = child.props.children[0].replace(
            /^\[!\w+\]\s*/,
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
