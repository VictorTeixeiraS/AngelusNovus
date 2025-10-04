import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/services/LocalizationService';
import { SaveGameService } from '@/services/SaveGameService';
import { ArrowLeft, Globe, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: 'en' | 'pt') => {
    changeLanguage(lang);
    toast.success(`Language changed to ${lang === 'en' ? 'English' : 'Português'}`);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress?')) {
      SaveGameService.clearSave();
      toast.success('Progress reset successfully');
    }
  };

  return (
    <div className="min-h-screen bg-game-bg p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Language */}
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5" />
              <h2 className="text-lg font-semibold">{t('settings.language')}</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={i18n.language === 'en' ? 'default' : 'outline'}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </Button>
              <Button
                variant={i18n.language === 'pt' ? 'default' : 'outline'}
                onClick={() => handleLanguageChange('pt')}
              >
                Português
              </Button>
            </div>
          </div>

          {/* Reset Progress */}
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Trash2 className="w-5 h-5" />
              <h2 className="text-lg font-semibold">{t('settings.reset')}</h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              This will delete all saved game progress and cannot be undone.
            </p>
            
            <Button
              variant="destructive"
              onClick={handleResetProgress}
              className="w-full"
            >
              Reset All Progress
            </Button>
          </div>

          {/* About */}
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">About Farm Navigators</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Farm Navigators is an educational card game that uses NASA Earth observation data 
              to help players understand the complex decisions facing modern agriculture. 
              Balance economy, sustainability, technology, and social factors to build a thriving farm.
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              Version 1.0.0 • Built with React + TypeScript
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
