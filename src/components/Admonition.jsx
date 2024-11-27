import React from 'react';
import { Info, AlertTriangle, CheckCircle2, BookOpen } from 'lucide-react';

const AdmonitionIcon = ({ type }) => {
  switch (type) {
    case 'note':
      return <Info className="w-5 h-5" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5" />;
    case 'tip':
      return <CheckCircle2 className="w-5 h-5" />;
    case 'example':
      return <BookOpen className="w-5 h-5" />;
    default:
      return <Info className="w-5 h-5" />;
  }
};

const Admonition = ({ children, type = 'note', title }) => {
  const styles = {
    note: {
      container: 'bg-blue-50 border-blue-500',
      icon: 'text-blue-500',
      title: 'text-blue-800',
      content: 'text-blue-700',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-500',
      icon: 'text-yellow-500',
      title: 'text-yellow-800',
      content: 'text-yellow-700',
    },
    tip: {
      container: 'bg-green-50 border-green-500',
      icon: 'text-green-500',
      title: 'text-green-800',
      content: 'text-green-700',
    },
    example: {
      container: 'bg-purple-50 border-purple-500',
      icon: 'text-purple-500',
      title: 'text-purple-800',
      content: 'text-purple-700',
    },
  };

  const style = styles[type] || styles.note;

  return (
    <div className={`rounded-lg p-4 my-6 border-l-4${style.container}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={style.icon}>
          <AdmonitionIcon type={type} />
        </span>
        <h5 className={`font-semibold text-sm uppercase${style.title}`}>
          {title || type}
        </h5>
      </div>
      <div className={`prose prose-sm max-w-none${style.content}`}>
        {children}
      </div>
    </div>
  );
};

export default Admonition;
