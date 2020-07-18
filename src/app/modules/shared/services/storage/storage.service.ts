import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  public static setItem(key: string, model: { [key: string]: any }) {
    sessionStorage.setItem(key, JSON.stringify(model));
  }

  public static removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  public static getItem(key: string): {[key: string]: any} {
    return JSON.parse(sessionStorage.getItem(key));
  }
}
