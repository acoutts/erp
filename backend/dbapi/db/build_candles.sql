SELECT
    date_trunc($1, dt) dt,
    (array_agg(peos ORDER BY dt ASC))[1] o,
    MAX(peos) h,
    MIN(peos) l,
    (array_agg(peos ORDER BY dt DESC))[1] c
FROM "eosram"
WHERE dt BETWEEN $2::timestamp AND $3::timestamp
GROUP BY date_trunc($1, dt)
ORDER BY dt;
