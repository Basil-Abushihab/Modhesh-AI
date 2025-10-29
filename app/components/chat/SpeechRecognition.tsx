import { IconButton } from '~/components/ui/IconButton';
import { classNames } from '~/utils/classNames';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface SpeechRecognitionButtonProps {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled: boolean;
}

export const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({
  isListening,
  onStart,
  onStop,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <IconButton
      title={
        isListening
          ? t('chat.stop_voice_input', 'Stop speech recognition')
          : t('chat.start_voice_input', 'Start speech recognition')
      }
      disabled={disabled}
      className={classNames('transition-all', {
        'text-bolt-elements-item-contentAccent': isListening,
      })}
      onClick={isListening ? onStop : onStart}
    >
      {isListening ? <div className="i-ph:microphone-slash text-xl" /> : <div className="i-ph:microphone text-xl" />}
    </IconButton>
  );
};
