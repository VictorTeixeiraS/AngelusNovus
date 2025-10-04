import { GameState, SaveData } from '@/types';

const SAVE_KEY = 'farm-navigators-save';
const CURRENT_VERSION = '1.0.0';

export class SaveGameService {
  static save(gameState: GameState): void {
    try {
      const saveData: SaveData = {
        version: CURRENT_VERSION,
        gameState,
        savedAt: Date.now()
      };
      
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      console.log('[SaveGameService] Game saved successfully');
    } catch (error) {
      console.error('[SaveGameService] Failed to save game:', error);
    }
  }

  static load(): GameState | null {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (!saved) return null;

      const saveData: SaveData = JSON.parse(saved);
      
      // Version migration logic (future-proof)
      if (saveData.version !== CURRENT_VERSION) {
        console.log('[SaveGameService] Migrating save data from', saveData.version, 'to', CURRENT_VERSION);
        // Add migration logic here when needed
      }

      return saveData.gameState;
    } catch (error) {
      console.error('[SaveGameService] Failed to load game:', error);
      return null;
    }
  }

  static hasSave(): boolean {
    return localStorage.getItem(SAVE_KEY) !== null;
  }

  static clearSave(): void {
    localStorage.removeItem(SAVE_KEY);
    console.log('[SaveGameService] Save data cleared');
  }
}
