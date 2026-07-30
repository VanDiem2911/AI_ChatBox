'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none text-zinc-800 leading-relaxed break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-500 hover:underline font-medium"
            />
          ),
          code: ({ node, className, children, ...props }) => (
            <code
              {...props}
              className="bg-zinc-100 text-brand-700 rounded px-1.5 py-0.5 font-mono text-xs"
            >
              {children}
            </code>
          ),
          strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-zinc-900" />,
          ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 space-y-1 my-2" />,
          ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-4 space-y-1 my-2" />,
          h3: ({ node, ...props }) => <h3 {...props} className="text-sm font-bold text-zinc-900 mt-3 mb-1" />,
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-3 border border-zinc-200 rounded-lg">
              <table {...props} className="w-full text-left text-xs border-collapse" />
            </div>
          ),
          th: ({ node, ...props }) => <th {...props} className="bg-zinc-100 p-2 border-b border-zinc-200 font-semibold" />,
          td: ({ node, ...props }) => <td {...props} className="p-2 border-b border-zinc-100" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
