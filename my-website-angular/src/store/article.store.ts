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
      updateArticle(updatedArticle: Article) {
        const currentArticles = store.articles();
        let wasUpdated = false;

        const updatedArticles = currentArticles.map((article) => {
          if (article.slug === updatedArticle.slug) {
            wasUpdated = true;
            return updatedArticle;
          }
          return article;
        });

        const finalArticles = wasUpdated
          ? updatedArticles
          : [...currentArticles, updatedArticle];

        patchState(store, {
          articles: finalArticles,
        });
      },
    };
  })
);
