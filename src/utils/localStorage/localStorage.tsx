import {KeyValueStorageInterface} from 'aws-amplify/utils';
import {MMKV} from 'react-native-mmkv';

export const localStorage = new MMKV();

export class MMKWLocaltorage implements KeyValueStorageInterface {
  async setItem(key: string, value: string): Promise<void> {
    localStorage.set(key, value);
  }
  async getItem(key: string): Promise<string | null> {
    const value = localStorage.getString(key);
    return value ? value : null;
  }
  async removeItem(key: string): Promise<void> {
    localStorage.delete(key);
  }
  async clear(): Promise<void> {
    localStorage.clearAll();
  }
}
