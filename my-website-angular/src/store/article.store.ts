import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Article } from '../app/views/home-view/services/article.service';

export const ArticleStore = signalStore(
  { providedIn: 'root' },

  withState({
    articles: [] as Article[],
  }),

  withMethods((store) => {
    return {
      setArticles(updatedArticles: Article[]) {
        patchState(store, {
          articles: updatedArticles,
        });
      },
    };
  })
);
