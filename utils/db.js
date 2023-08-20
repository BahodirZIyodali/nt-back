import pkg from "pg";
const { Pool } = pkg;

//  sqlga ulash
const pool = new Pool({
  connectionString: "postgres://xiksihvq:jcA5Hk_V_6xrIce-pFgcj9nBEahbPUor@ruby.db.elephantsql.com/xiksihvq",
});



//  sqlda read qilib kelish
const dataFetcher = async (sql, data) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(sql, data);
    return rows;
  } finally {
    client.release();
  }
};

export { dataFetcher };