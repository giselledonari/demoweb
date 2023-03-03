const { Pool } = require("pg");
require('dotenv').config();
const contraseña=process.env.PASSWORD_DB

const pool = new Pool({
    connectionString: `postgres://omtxueck:${contraseña}@mahmud.db.elephantsql.com/omtxueck`,
    ssl: {
      rejectUnauthorized: false
    }
  });

async function init() {
  const client = await pool.connect();
  await client.query({
    text: `
    DROP TABLE IF EXISTS paises_pib;
    CREATE TABLE paises_pib
    (
        nombre character varying(200) NOT NULL,
        pib_2019 integer,
        pib_2020 integer,
        PRIMARY KEY (nombre)
    );

    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Luxemburgo', 115200, 116730);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Suiza', 85160, 86670);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Noruega', 82770, 78330);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Estados Unidos', 65060, 67430);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Holanda', 54130, 53870);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Finlandia', 50880, 50770);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Alemania', 49690, 47990);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Japon', 41420, 43040);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('España', 31910, 30730);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Chile', 16280, 15850);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Mexico', 9870, 10410);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Brasil', 9160, 8960);
    INSERT INTO paises_pib (nombre, pib_2019, pib_2020) values ('Argentina', 9050, 9730);

    `,
  });
  client.release();
}

async function getPib() {
  const client = await pool.connect();
  const respuesta = await client.query("select*from paises_pib");

  client.release();

  return respuesta.rows;
}



module.exports = { init, getPib };
