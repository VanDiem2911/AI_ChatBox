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
    <div className="prose prose-invert prose-sm max-w-none text-[#ececec] leading-relaxed break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          p: ({ node, ...props }) => <p {...props} className="text-[#ececec] my-1 leading-relaxed" />,
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300 hover:underline font-medium"
            />
          ),
          code: ({ node, className, children, ...props }) => (
            <code
              {...props}
              className="bg-[#2f2f2f] text-brand-300 rounded px-1.5 py-0.5 font-mono text-xs border border-[#383838]"
            >
              {children}
            </code>
          ),
          strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-white" />,
          ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 space-y-1 my-2 text-[#ececec]" />,
          ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-4 space-y-1 my-2 text-[#ececec]" />,
          li: ({ node, ...props }) => <li {...props} className="text-[#ececec]" />,
          h1: ({ node, ...props }) => <h1 {...props} className="text-base font-bold text-white mt-4 mb-2" />,
          h2: ({ node, ...props }) => <h2 {...props} className="text-sm font-bold text-white mt-3 mb-2" />,
          h3: ({ node, ...props }) => <h3 {...props} className="text-sm font-bold text-white mt-3 mb-1" />,
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-3 border border-[#383838] rounded-lg">
              <table {...props} className="w-full text-left text-xs border-collapse text-[#ececec]" />
            </div>
          ),
          th: ({ node, ...props }) => <th {...props} className="bg-[#2f2f2f] p-2 border-b border-[#383838] font-semibold text-white" />,
          td: ({ node, ...props }) => <td {...props} className="p-2 border-b border-[#2f2f2f] text-[#ececec]" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
