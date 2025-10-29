import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';
import { localeStore } from '~/lib/stores/locale';

export function Header() {
  const chat = useStore(chatStore);
  const locale = useStore(localeStore);

  return (
    <header
      className={classNames('flex items-center px-4 border-b h-[var(--header-height)]', {
        'border-transparent': !chat.started,
        'border-bolt-elements-borderColor': chat.started,
      })}
    >
      {/* Left Section (Logo) */}
      <div className="flex items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl" />
        <a href="/" className="text-2xl font-semibold text-accent flex items-center">
          {locale === 'en' ? (
            <>
              <img
                src="/modhesh-en-light.svg"
                alt="Modhesh.AI logo (light)"
                className="w-[120px] inline-block dark:hidden"
              />
              <img
                src="/modhesh-en-dark.svg"
                alt="Modhesh.AI logo (dark)"
                className="w-[120px] inline-block hidden dark:block"
              />
            </>
          ) : (
            <>
              <img
                src="/modhesh-ar-light.svg"
                alt="مدهش.AI شعار (فاتح)"
                className="w-[120px] inline-block dark:hidden"
              />
              <img
                src="/modhesh-ar-dark.svg"
                alt="مدهش.AI شعار (داكن)"
                className="w-[120px] inline-block hidden dark:block"
              />
            </>
          )}
        </a>
      </div>

      {/* Right Section (Chat Description + Actions) */}
      {chat.started && (
        <>
          <span className="flex-1 px-4 truncate text-center text-bolt-elements-textPrimary">
            <ClientOnly>{() => <ChatDescription />}</ClientOnly>
          </span>
          <ClientOnly>
            {() => (
              <div>
                <HeaderActionButtons chatStarted={chat.started} />
              </div>
            )}
          </ClientOnly>
        </>
      )}
    </header>
  );
}
