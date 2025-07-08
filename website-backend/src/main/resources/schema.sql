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
                                     CONSTRAINT user_account_pkey PRIMARY KEY (user_id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_account
    OWNER to postgres;