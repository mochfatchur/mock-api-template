-- public.instansi_gol_score definition

-- Drop table

-- DROP TABLE public.instansi_gol_score;

CREATE TABLE public.instansi_gol_score (
	id serial4 NOT NULL,
	instansi_id_gol int4 NOT NULL,
	score numeric(8, 2) NULL,
	created_at timestamp DEFAULT now() NULL,
	"year" int4 NULL,
	keterangan text NULL,
	CONSTRAINT instansi_gol_score_pkey PRIMARY KEY (id)
);