import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  private nameSubject = new BehaviorSubject<string>('');
  private playerIdSubject = new BehaviorSubject<string|undefined>(undefined);
  private isSpectatorSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    let name = this.loadFromLocalStorage('name');
    let isSpectator = this.loadFromLocalStorage('isSpectator') === "true";
    this.nameSubject.next(name);
    this.isSpectatorSubject.next(isSpectator)
  }

  setName(name: string): void {
    this.nameSubject.next(name);
    this.saveToLocalStorage('name', name);
  }

  setSpectator(isSpectator: boolean): void {
    this.isSpectatorSubject.next(isSpectator);
    this.saveToLocalStorage('isSpectator', isSpectator);
  }

  setPlayerIdSubject(playerId: string | undefined) {
    this.playerIdSubject.next(playerId);
  }

  nameObservable(): Observable<string> {
    return this.nameSubject.asObservable();
  }

  getName(): string {
    return this.nameSubject.getValue();
  }

  spectatorObservable(): Observable<boolean> {
    return this.isSpectatorSubject.asObservable();
  }

  isSpectator(): boolean {
    return this.isSpectatorSubject.getValue();
  }

  getPlayerId(): string | undefined {
    return this.playerIdSubject.getValue();
  }

  private loadFromLocalStorage(key: string): any {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.debug('Localstorage is either unavailable or disabled');
      return null;
    }
  }

  private saveToLocalStorage(key: string, value: any): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.debug('Localstorage is either unavailable or disabled');
    }
  }
}
