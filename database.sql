-- Database: movies

-- DROP DATABASE IF EXISTS movies;

CREATE DATABASE movies
    WITH
    OWNER = localuser
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.Movie

-- DROP TABLE IF EXISTS public."Movie";

CREATE TABLE IF NOT EXISTS public."Movie"
(
    title text COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    description text COLLATE pg_catalog."default" NOT NULL,
    release_year date NOT NULL,
    duration integer NOT NULL,
    rating integer NOT NULL,
    likes integer,
    deslikes integer,
    CONSTRAINT "Movie_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Movie"
    OWNER to postgres;

GRANT SELECT ON TABLE public."Movie" TO localuser;

GRANT ALL ON TABLE public."Movie" TO postgres;