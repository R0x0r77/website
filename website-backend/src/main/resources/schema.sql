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