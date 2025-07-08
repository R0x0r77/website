import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { computed } from '@angular/core';
import Cookies from 'js-cookie';
import User from '../app/data/user';

export const UserStore = signalStore(
  { providedIn: 'root' },

  withState({
    user: null as User | null,
    loggedIn: false,
  }),

  withComputed((store) => ({
    // isLoggedIn: computed(() => store.user() !== null),
  })),

  withMethods((store) => ({
    setUser(user: User) {
      Cookies.set('username', user.username, { expires: 1 });
      let modifiedUser = { ...user, password: undefined };
      patchState(store, { user: modifiedUser });
      Cookies.set('user', JSON.stringify(modifiedUser), { expires: 1 });
    },

    setLoggedIn(value: boolean) {
      patchState(store, { loggedIn: value });
    },

    clearUser() {
      patchState(store, { user: null });
      Cookies.remove('username');
      Cookies.remove('user');
    },

    logOut() {
      Cookies.remove('authToken');
      this.setLoggedIn(false);
      this.clearUser();
    },
  }))
);
