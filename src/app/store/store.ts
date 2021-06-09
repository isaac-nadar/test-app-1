import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { State } from './state';

const state: State = {
  data: undefined,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(distinctUntilChanged(), pluck(name));
  }

  set(name: string, setState: any) {
    this.subject.next({
      ...this.value,
      [name]: setState,
    });
  }
}
