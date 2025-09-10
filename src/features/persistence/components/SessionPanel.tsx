
import React from 'react';
import { Button } from '../../../shared/components/ui/Button';
import { ToolPanel } from '../../../shared/components/ui/ToolPanel';

const LOCAL_STORAGE_KEY = 'chromalab-editor-state';

export const SessionPanel: React.FC = () => {

  const handleClearSession = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.location.reload();
  };

  return (
    <ToolPanel title="Session">
      <div className="space-y-4">
        <p className='text-sm text-gray-400'>Your session is automatically saved.</p>
        <Button onClick={handleClearSession} variant="primary" className="w-full">
          Clear Session
        </Button>
      </div>
    </ToolPanel>
  );
};
