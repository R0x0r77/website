-- Table: public.user_account

-- DROP TABLE IF EXISTS public.user_account;

CREATE TABLE IF NOT EXISTS public.user_account
(
    user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    first_name character varying COLLATE pg_catalog."default",
    last_name character varying COLLATE pg_catalog."default",
    role character varying COLLATE pg_catalog."default" NOT NULL,
    created_timestamp timestamp with time zone NOT NULL,
    modified_timestamp timestamp with time zone NOT NULL,
    level integer NOT NULL DEFAULT 1,
    CONSTRAINT user_account_pkey PRIMARY KEY (user_id),
    CONSTRAINT unique_username UNIQUE (username)
    )

    TABLESPACE pg_default;


-- Table: public.riddle

-- DROP TABLE IF EXISTS public.riddle;

ALTER TABLE IF EXISTS public.user_account
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.riddle
(
    riddle_id integer NOT NULL,
    key character varying COLLATE pg_catalog."default" NOT NULL,
    answer character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default",
    level_reward integer,
    CONSTRAINT riddle_pkey PRIMARY KEY (riddle_id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.riddle
    OWNER to postgres;


-- Table: public.article

-- DROP TABLE IF EXISTS public.article;

CREATE TABLE IF NOT EXISTS public.article
(
    article_id integer NOT NULL,
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    published_date timestamp with time zone NOT NULL,
                                 markdown_content text COLLATE pg_catalog."default" NOT NULL,
                                 cover_image_url character varying(255) COLLATE pg_catalog."default",
    slug character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT article_pkey PRIMARY KEY (article_id),
    CONSTRAINT unique_slug UNIQUE (slug)
    )

    TABLESPACE pg_default;

ALTER TABLE public.article
    ADD COLUMN content_preview VARCHAR(255) GENERATED ALWAYS AS (LEFT(markdown_content, 250)) STORED;

ALTER TABLE IF EXISTS public.article
    OWNER to postgres;


-- Table: public.article_tags

-- DROP TABLE IF EXISTS public.article_tags;

CREATE TABLE IF NOT EXISTS public.article_tags
(
    article_article_id integer NOT NULL,
    tags character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT fk7ca4g2ftit1urmwivh06yqvjd FOREIGN KEY (article_article_id)
    REFERENCES public.article (article_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.article_tags
    OWNER to postgres;