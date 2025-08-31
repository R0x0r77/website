INSERT INTO user_account VALUES(DEFAULT, 'qq', 'qq', '$2a$10$oY9YmLXt6woxGakZUcryGuDbIVanN2t7/Ilrc9j/ikeXAnBLr0YOq', 'qq', 'qq', 'USER', '2024-09-08 12:34:11.771038+02', '2024-09-08 12:34:11.771038+02', DEFAULT) ON CONFLICT DO NOTHING;

INSERT INTO riddle VALUES(1, 'gagged_man', 'silence', 'Name me and so shall you break me.', 2) ON CONFLICT DO NOTHING;
INSERT INTO riddle VALUES(2, 'water_keeper', 'sponge', 'I have holes throughout, from back to front and top to bottom to core. More nothing than something within, and yet I still hold water.', 6) ON CONFLICT DO NOTHING;
INSERT INTO riddle VALUES(3, 'titans', 'boots', 'Two brothers we are, great burdens we bear, all day if we are bitterly pressed; yet this will I say - we are full at day, and empty when we go at rest.', 4) ON CONFLICT DO NOTHING;
INSERT INTO riddle VALUES(4, 'snake', 'message', 'I walk the path with steady steps, Each move is taken twice, no less. The signs you see are but a trace, Unveil the path I once embraced. NESENES', 5) ON CONFLICT DO NOTHING;
INSERT INTO riddle VALUES(5, 'water-containers', 'ocean', 'Distribute the water so that 5L container and 8L container have 4L of water each and the 3L container is empty. Doing so you will receive the secret answer.', 3) ON CONFLICT DO NOTHING;
INSERT INTO riddle VALUES(6, 'citadel', 'stronghold', 'Puzzle time! Order all elements correctly to receive the secret answer.', 7) ON CONFLICT DO NOTHING;

INSERT INTO article VALUES(1, 'Ways to Improve Performance in JPA Transactions', '2025-07-26 15:13:37.335085+02', '# Ways to Improve Performance in JPA Transactions

Improving performance in JPA transactions involves strategically optimizing how data is fetched, persisted, and updated throughout the application''s lifecycle. Performance bottlenecks can arise from inefficient queries, excessive database access, suboptimal entity mappings, or poor resource management. It''s important to be mindful of these factors when working with JPA.

To help with that, I''ve gathered a collection of practical techniques and tips—all in one place—focused specifically on performance, without diving into the most basic concepts. Every example is based on **Spring Data JPA**, as it’s the framework used also throughout this site.

---

## 1.) Use @Transactional(readOnly = true) for Read-Only Transactions

The idea is simple: there''s no need to involve the full persistence context overhead during read-only operations.

By default, when fetching entities from the database, JPA places them into the persistence context and creates snapshots for each entity to enable dirty checking at the end of the transaction. This process consumes memory and CPU, even if no data is modified.

By declaring a transaction as `readOnly=true`, JPA can skip unnecessary work like snapshot creation and dirty checking. This can lead to meaningful performance improvements, especially in read-heavy endpoints or queries that load large amounts of data.

---

## 2.) Avoid Fetching Unused Relationships

Use `FetchType.LAZY` by default and fetch explicitly when needed. However, be aware of the N+1 problem which we will dive deeper into in the next section.

```java
@ManyToOne(fetch = FetchType.LAZY)
private Post post;

```

---

## 3.) Avoid the N+1 Query Problem

The N+1 problem is one of the most common performance pitfalls in JPA applications.

It occurs when your application executes one query to fetch a list of entities (`N`), and then `N` additional queries to fetch each of their associated child entities. This typically happens due to lazy loading in relationships such as `@OneToMany`, `@ManyToOne`, `@OneToOne`, and `@ManyToMany`.

When dealing with large datasets, this can quickly lead to severe performance issues.

### Example:

```java
@Entity
public class Author {
    @Id
    private Long id;

    private String name;

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
    private List<Book> books;
}

@Entity
public class Book {
    @Id
    private Long id;

    private String title;

    @ManyToOne
    private Author author;
}

```

Suppose you fetch all authors:

```java
List<Author> authors = authorRepository.findAll();

```

And then later access their books:

```java
for (Author author : authors) {
    List<Book> books = author.getBooks();
}

```

This results in N+1 queries: one for fetching all authors, and one additional query for each author''s books.

---

### Most common solutions:

- **Use EntityGraph or JOIN FETCH**

```java
@EntityGraph(attributePaths = "books")
List<Author> findAllWithBooks();

@Query("SELECT a FROM Author a LEFT JOIN FETCH a.books")
List<Author> findAllWithBooks();

```

Both approaches load the parent and child entities in a single query, avoiding the N+1 problem.
Behind the scenes SQL:

```sql
SELECT a.*, b.* FROM author a
LEFT JOIN book b ON a.id = b.author_id;

```

> **Remember:** These solutions don''t work well with pagination due to row duplication caused by the join.

- **Use DTOs or Projections**

Another effective solution is to fetch the data using DTOs or projections. This avoids loading full entity graphs and instead runs a single optimized query that joins only the necessary fields. This not only solves the N+1 issue but also reduces memory usage and improves query performance.

---

## 4.) DTOs / Projections

Often, you don''t need to fetch the entire entity, especially when it contains many fields that aren''t relevant for a particular use case. For example, if you only need a user''s username and email, fetching the entire User entity introduces unnecessary overhead.

Instead, you can use projections or DTOs to retrieve only the required fields, improving performance and reducing memory usage.

### Projection (Interface-Based)

A projection is an interface that defines getter methods for the fields you want to retrieve.

```java
public interface UserView {
    String getUsername();
    String getEmail();
}

```

In the repository:

```java
public interface UserRepository extends JpaRepository<User, Long> {
    List<UserView> findAllProjectedBy();
}

```

Spring Data JPA automatically maps the selected fields to this interface, and only the necessary data is fetched from the database.

### DTO (Class-Based)

A DTO (Data Transfer Object) is a regular class used to carry data, typically with a constructor that matches the selected fields.

```java
public class UserDto {
    private String username;
    private String email;

    public UserDto(String username, String email) {
        this.username = username;
        this.email = email;
    }

    // Getters and setters
}

```

In the repository:

```java
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT new com.example.dto.UserDto(u.username, u.email) FROM User u")
    List<UserDto> findAllUserDtos();
}

```

This approach uses a JPQL query and maps each result directly into a `UserDto` via the constructor.

---

## 5.) Bulk Operations

Standard insert, update, and delete operations in JPA involve full entity lifecycle management:

- Entities are loaded into the persistence context,
- Changes are tracked automatically (dirty checking),
- Lifecycle hooks (`@PreUpdate`, `@PostRemove`, etc.) are invoked,
- Each operation generates individual SQL statements.

This model works fine for small operations, but it doesn''t scale well. For large datasets — such as archiving thousands of records or cleaning up expired sessions — this approach becomes inefficient.

JPA supports bulk operations, which execute SQL statements directly without involving entity state management. These operations are ideal for performance-critical batch updates and deletes.

### Example:

```java
public interface BookRepository extends JpaRepository<Book, Long> {

    @Modifying(clearAutomatically = true)
    @Query("""
        UPDATE Book b
        SET b.status = ''ARCHIVED''
        WHERE b.publishDate < :publishDate
    """)
    int archiveOldBooks(LocalDate publishDate);
}

```

- This operation is executed as a single SQL statement and returns the number of affected rows.
- The `@Modifying` annotation is required because custom queries are considered read-only by default in Spring Data JPA.
- Since bulk operations bypass the persistence context, they do not interact with the first-level cache.
- To prevent inconsistencies with any managed entities, the `clearAutomatically = true` option ensures that the persistence context is cleared after the operation.

---

## 6.) Use Pagination for Large Result Sets

Pagination solves the issue of loading data from too many rows by fetching only a subset of rows at a time, using SQL’s `LIMIT`/`OFFSET` (or `TOP` in some databases). Spring Data JPA makes pagination simple using `Pageable` and `Page` interfaces.

### Example:

```java
public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findAll(Pageable pageable);
}

```

Usage:

```java
Pageable pageable = PageRequest.of(0, 10); // Page 0, size 10
Page<User> page = userRepository.findAll(pageable);

List<User> users = page.getContent();
int totalPages = page.getTotalPages();
long totalElements = page.getTotalElements();

```

You can also use sorting:

```java
Pageable pageable = PageRequest.of(0, 10, Sort.by("username").ascending());

```

---

## 7.) Use Cascading When It Makes Sense

Cascading in JPA means that when you perform an operation (like `persist`, `merge`, `remove`, etc.) on one entity, that operation is automatically applied to its related entities.

In many cases, it can result in cleaner code and reduce the number of transactions and memory usage.

```java
@OneToMany(mappedBy = "author", cascade = CascadeType.PERSIST)
private List<Book> books;

```

---

## 8.) Use @Version for Optimistic Locking (Instead of Pessimistic Locking) Whenever You Can

When working with concurrent data updates in a database, it''s important to ensure data consistency. In JPA, this is commonly achieved through locking mechanisms to prevent conflicting modifications.

One of the most efficient and recommended approaches is optimistic locking via the `@Version` annotation.

Optimistic locking assumes conflicts are rare and allows multiple users to read and update data without locking the rows. It detects conflicts only when changes are committed by maintaining a version number in each record.

### How it works:

- JPA checks that the version hasn''t changed since the entity was read.
- If it has changed, a `javax.persistence.OptimisticLockException` is thrown, preventing lost updates.

### Example:

```java
@Entity
public class Product {

    @Id
    private Long id;

    private String name;

    private int quantity;

    @Version
    private int version;
}

```

Behind the scenes, JPA uses this version in SQL like:

```sql
UPDATE product
SET quantity = ?, version = ?
WHERE id = ? AND version = ?

```

If the version isn’t updated (because it was updated in another concurrent transaction), JPA knows a conflict occurred.

> Pessimistic locking (`LockModeType.PESSIMISTIC_WRITE`) uses actual database row locks and should only be used when absolutely necessary, such as in financial systems or race-critical updates.

---

## 9.) Use Second-Level Cache for Rarely-Changing but Frequently-Read Data

The second-level cache is an optional, shared cache that stores entity data across multiple sessions or transactions. It complements the first-level cache (persistence context), which only lives for a single EntityManager or transaction.

While the first-level cache helps reduce database calls within a single transaction, the second-level cache can dramatically improve performance by reducing repetitive queries across different transactions and users.

### Configure `application.properties`:

```properties
spring.jpa.properties.hibernate.cache.use_second_level_cache=true
spring.jpa.properties.hibernate.cache.region.factory_class=org.hibernate.cache.jcache.JCacheRegionFactory

```

### Annotate your entity:

```java
@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product {
    @Id
    private Long id;
    private String name;
    private BigDecimal price;
}

```

For immutable data, use:

```java
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)

```

---

## 10.) Set JDBC Fetch Size and Query Timeout

Control how many rows are fetched at a time and limit long-running queries to optimize both performance and stability.

### Example properties:

```properties
spring.datasource.hikari.data-source-properties.defaultFetchSize=100
spring.datasource.hikari.data-source-properties.queryTimeout=5

```

---

## 11.) Use Stream Queries for Large Result Sets

Avoid loading large lists into memory when you don’t need random access to elements during complex transactions.

Define your query to return a `Stream<T>`:

```java
@Query("SELECT u FROM User u")
Stream<User> streamAllUsers();

```

Spring Data JPA translates this into a streamed result set, keeping the JDBC `ResultSet` cursor open for efficient row-by-row processing.

Always consume the stream inside a transaction:

```java
@Transactional(readOnly = true)
public void processUsers() {
    try (Stream<User> stream = userRepository.streamAllUsers()) {
        stream.forEach(this::process);
    }
}

```

- `@Transactional(readOnly = true)` ensures a transaction is active while streaming and persistence context overhead is minimized.
- `try-with-resources` ensures the stream (and underlying JDBC resources) are closed properly.

---

# Summary

Improving Spring Data JPA transaction performance is a multi-layered task that requires a careful balance between eager and lazy operations, optimized queries, efficient entity management, and good use of caching and transaction management. Understanding the implications of each strategy is key to identifying bottlenecks and implementing effective improvements.
', 'performance_in_jpa_transactions.jpg', 'ways-to-improve-performance-in-jpa-transactions') ON CONFLICT DO NOTHING;
INSERT INTO article VALUES(2, 'NgRx SignalStore Made Easy', '2025-07-29 23:22:14.365935+02', '# NgRx SignalStore Made Easy

NgRx is a powerful library used for state management in Angular applications. One of its latest advancements is the SignalStore, a modern and elegant approach tailored for new Angular apps. It’s lightweight, clean, and highly composable — built entirely around Angular signals and functional programming principles.
Even the store itself is created via a function called signalStore, which produces a class constructor. This allows developers to create multiple, isolated stores, depending on how many single sources of truth they want for their application.

----------

## Classic NgRx Store

In contrast, classic NgRx follows a centralized model. It provides a singleton global store, which acts as the one and only Single Point of Truth. While this approach is solid and time-tested, SignalStore introduces a different philosophy.

----------

## SignalStore

SignalStore lets you build multiple smaller stores, while still maintaining a unified architecture when needed. It achieves this by:

-   Injecting and composing stores

-   Sharing state via Angular’s Dependency Injection system

-   Avoiding redundant or duplicated state with tools like withState, withComputed, and withHooks


You can think of it as Redux — but more flexible, modular, and optionally centralized.

----------

## The Redux Pattern

Both classic NgRx and SignalStore follow the core principles of Redux:

-   **Immutability**: State is never mutated directly.

-   **Pure functions**: State transitions happen through pure logic.

-   **Versioned state**: Each update replaces the old state with a new version.


----------

## Let’s See an Example

Here’s a simple example of a movies feature where users can add movies to their favorites list:

### `movie.slice.ts`

```ts
export interface Movie {
  id: number;
  title: string;
  watchTime: number;
}

export const MOVIES: Movie[] = [
  { id: 1, title: ''Road 123 to Heaven'', watchTime: 95 },
  { id: 2, title: ''The Dragon Returns'', watchTime: 120 },
  { id: 3, title: ''Better call Tom'', watchTime: 87 },
  { id: 4, title: ''Lord of Cars'', watchTime: 110 },
  { id: 5, title: ''Disruptor'', watchTime: 107 },
];

export interface MovieSlice {
  readonly movies: Movie[];
  readonly favoriteList: Movie[];
}

export const initialMovieState: MovieSlice = {
  movies: MOVIES,
  favoriteList: [],
};

export type PersistedShopSlice = Pick<MovieSlice, ''favoriteList''>;

```

----------

### `movie.store.ts`

```ts
export const MovieStore = signalStore(
  { providedIn: ''root'' },

  withState(initialMovieState),
  withComputed((store) => ({
    // simple approach
    favoriteMoviesQuantity: computed(() => store.favoriteList().length),
    totalWatchTime: computed(() =>
      store.favoriteList().reduce((sum, movie) => sum + movie.watchTime, 0)
    ),
    // best practice (outsource the derived state with view model)
    favoriteListVm: computed(() =>
      buildFavoriteMoviesListVm(store.favoriteList())
    ),
  })),
  withMethods((store) => ({
    addToFavoriteList: (movie: Movie) =>
      patchState(store, addToFavoriteList(movie)),
    removeFromFavoriteList: (movieId: number) =>
      patchState(store, removeFromFavoriteList(movieId)),
    clearFavoriteList: () => patchState(store, clearFavoriteList()),
  })),
  withHooks((store) => ({
    onInit: () => {
      const json = localStorage.getItem(''favorite_movies'');
      if (json) {
        const state = JSON.parse(json) as MovieSlice;
        patchState(store, state);
      }

      effect(() => {
        const json = JSON.stringify(getState(store));
        localStorage.setItem(''favorite_movies'', json);
      });
    },
  }))
);

```

----------

### `movie.vm.ts`

```ts
import { Movie } from ''./movie.slice'';

export interface FavoriteMoviesListVm {
  readonly movies: Movie[];
  readonly quantity: number;
  readonly totalWatchTime: number;
}

```

----------

### `movie-vm.builders.ts`

```ts
import { Movie } from ''./movie.slice'';
import { FavoriteMoviesListVm } from ''./movie.vm'';

export function buildFavoriteMoviesListVm(
  favoriteList: Movie[]
): FavoriteMoviesListVm {
  return {
    movies: favoriteList,
    quantity: favoriteList.length,
    totalWatchTime: favoriteList.reduce(
      (sum, movie) => sum + movie.watchTime,
      0
    ),
  };
}

```

----------

### `movie.updaters.ts`

```ts
export function addToFavoriteList(
  movie: Movie
): PartialStateUpdater<MovieSlice> {
  return (state) => {
    const alreadyExists = state.favoriteList.some((m) => m.id === movie.id);
    return alreadyExists
      ? {}
      : { favoriteList: [...state.favoriteList, movie] };
  };
}

export function removeFromFavoriteList(
  movieId: number
): PartialStateUpdater<MovieSlice> {
  return (state) => ({
    favoriteList: state.favoriteList.filter((movie) => movie.id !== movieId),
  });
}

export function clearFavoriteList(): PartialStateUpdater<MovieSlice> {
  return (_) => ({
    favoriteList: [],
  });
}

```

----------

## Store Composition

As you can see Signal Store is composed using feature creators, chained together:

```txt
emptyStore
  → withState()
  → withComputed()
  → withMethods()
  → withHooks()
  = Store

```

Each feature adds capabilities to the store. You can use any of them multiple times, and the result is always an accumulated and fully typed store object.

----------

## Best Practices

It’s a good practice to move computed properties into view models, which you can structure and configure as needed. There''s no need to worry about duplicating similar values here, since these are the derived state — they’re simply calculated from the core state. The core state itself should remain as lean and minimal as possible, containing only the essential data.

----------

## State Updates

In SignalStore, state updates are typically done using the patchState method, which immutably creates a new copy of the state with the necessary changes. To keep the logic clean and testable, these updates are delegated to updaters — pure functions that encapsulate the transformation logic, ensuring predictable and traceable state transitions.

----------

## Lifecycle Hooks

SignalStore also supports lifecycle logic through withHooks, allowing you to run side effects and initialization code within the store. You can use onInit to trigger logic when the store is created, and effect to react to state changes or external signals. The onDestroy hook is also available, though it will never be called when the store is provided in root.

----------

## Conclusion

To sum up, SignalStore makes state management in Angular clean, reactive, and highly modular. In my opinion, signals are an elegant foundation for modern Angular applications — and NgRx SignalStore builds on them beautifully.', 'ngrx_signalstore_made_easy.jpg', 'ngrx-signalstore-made-easy') ON CONFLICT DO NOTHING;

INSERT INTO article VALUES(3, 'Spring AOP – Quick Refresher', '2025-08-31 21:40:15.378945+02', '# Spring AOP – Quick Refresher

Spring AOP (Aspect-Oriented Programming) is a framework that complements the Spring IoC and OOP in general by providing the modularization of cross-cutting concerns like: logging, transaction management (check out @Transactional), security (@Secured), caching (@Cacheable), performance monitoring, exception handling, auditing, validation, etc.

## Key Concepts in Spring AOP

1. Aspect – A module that encapsulates a cross-cutting concern (@Aspect annotation on a component).

2. Join point – A specific point in program execution where an aspect can be applied (a method execution).

3. Advice – Action taken by an aspect at a particular join point (an aspect method that is being triggered). Types of advice:
   - @Before → Runs before method execution.
   - @After → Runs after method execution (regardless of outcome).
   - @AfterReturning → Runs only if method returns normally.
   - @AfterThrowing → Runs if method throws an exception.
   - @Around → Runs before and after method execution (most powerful; can modify return values or suppress execution).

4. Pointcut – A predicate (expression) that matches join points. Example:
   execution(* com.example.service.*.*(..)) → applies to all methods in the service package.

5. Target object – The actual object whose method is being advised (proxied), also called the proxied object.

6. Proxy – A dynamically created object that wraps the target object and ensures advice is executed when methods are called.

7. Weaving – The process of applying aspects to the target objects. In Spring AOP, weaving is done at runtime.


## Example

```java
@Aspect
@Component
public class ExampleAspect {

    @Before("execution(* com.kamil.learning.service.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Calling: " + joinPoint.getSignature());
    }

    @AfterReturning(
        pointcut = "execution(* com.kamil.learning.service.*(..))",
        returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        System.out.println("Method " + joinPoint.getSignature() + " returned: " + result);
    }

    @Around("execution(* com.kamil.learning.service.*(..))")
    public Object measureExecutionTime(org.aspectj.lang.ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long executionTime = System.currentTimeMillis() - start;
        System.out.println("Method " + joinPoint.getSignature().getName() + " executed in " + executionTime + "ms");
        return result;
    }
}
```

## Explanation in terms of AOP concepts

1.  Aspect – the ExampleAspect class annotated by @Aspect and @Component.

2.  Join point – This parameter gives runtime metadata about the method being called.
    You can inspect:

    -   joinPoint.getSignature() → method signature (name, params, return type).

    -   joinPoint.getArgs() → actual arguments passed.

    -   joinPoint.getTarget() → the target object (the proxied service).

3.  Advice – the aspect method that will run, for example before (on @Before type) some com.kamil.learning.service.* bean method.

4.  Pointcut – execution(* com.kamil.learning.service.*(..))

    -   \*   → Match any return type.

    -   com.kamil.learning.service.* → Match any class inside that package.

    -   (..) → Match any number of method arguments (zero or more).

5.  Target object – an actual bean inside the Spring container instantiated from some class inside com.kamil.learning.service package, for example some UserService class.

6.  Proxy – a wrapper object that Spring creates around the target object (UserService). When you call userService.saveUser("John"), you are really calling the proxy. The proxy decides whether to run any advices, and then it delegates to the target object (UserService).

7.  Weaving – process of proxying done at runtime.', 'spring_aop_quick_refresher.jpg', 'spring-aop-quick-refresher') ON CONFLICT DO NOTHING;

INSERT INTO article_tags VALUES (1, 'java'), (1, 'spring'), (1, 'jpa'), (1, 'backend'), (2, 'angular'), (2, 'frontend'), (3, 'java'), (3, 'spring'), (3, 'backend') ON CONFLICT DO NOTHING;
