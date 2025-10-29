import React from 'react';
import type { Template } from '~/types/template';
import { STARTER_TEMPLATES } from '~/utils/constants';
import { useTranslation } from 'react-i18next';

interface FrameworkLinkProps {
  template: Template;
}

const FrameworkLink: React.FC<FrameworkLinkProps> = ({ template }) => {
  const { t } = useTranslation();

  return (
    <a
      href={`/git?url=https://github.com/${template.githubRepo}.git`}
      data-state="closed"
      data-discover="true"
      className="items-center justify-center"
    >
      <div
        className={`inline-block ${template.icon} w-8 h-8 text-4xl transition-theme hover:text-blue-500 dark:text-white dark:opacity-50 dark:hover:opacity-100 dark:hover:text-blue-400 transition-all grayscale hover:grayscale-0 transition`}
        title={t(`starterTemplates.${template.name}.label`)}
      />
    </a>
  );
};

const StarterTemplates: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-sm text-gray-500">
        {t('starterTemplates.description', 'or start a blank app with your favorite stack')}
      </span>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center items-center gap-4 max-w-sm">
          {STARTER_TEMPLATES.map((template) => (
            <FrameworkLink key={template.name} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarterTemplates;
