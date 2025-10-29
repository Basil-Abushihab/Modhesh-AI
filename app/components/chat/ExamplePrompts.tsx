import React from 'react';
import { useTranslation } from 'react-i18next';

const EXAMPLE_PROMPTS = [
  { key: 'example.create_mobile_app' },
  { key: 'example.build_todo_app' },
  { key: 'example.build_blog_astro' },
  { key: 'example.cookie_consent_form' },
  { key: 'example.space_invaders_game' },
  { key: 'example.tic_tac_toe' },
];

interface ExamplePromptsProps {
  sendMessage?: (message: string) => void;
}

export function ExamplePrompts({ sendMessage }: ExamplePromptsProps) {
  const { t } = useTranslation();

  return (
    <div id="examples" className="relative flex flex-col gap-9 w-full max-w-3xl mx-auto justify-center mt-6">
      <div
        className="flex flex-wrap justify-center gap-2"
        style={{
          animation: '.25s ease-out 0s 1 _fade-and-move-in_g2ptj_1 forwards',
        }}
      >
        {EXAMPLE_PROMPTS.map((examplePrompt, index) => (
          <button
            key={index}
            onClick={() => sendMessage?.(t(examplePrompt.key))}
            className="border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary px-3 py-1 text-xs transition-theme"
          >
            {t(examplePrompt.key)}
          </button>
        ))}
      </div>
    </div>
  );
}
