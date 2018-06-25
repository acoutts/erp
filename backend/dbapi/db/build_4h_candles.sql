SELECT
    (date_trunc('day', dt) + date_part('hour', dt)::int / 4 * interval '4 hour') dt,
    (array_agg(peos ORDER BY dt ASC))[1] o,
    MAX(peos) h,
    MIN(peos) l,
    (array_agg(peos ORDER BY dt DESC))[1] c
FROM "eosram"
WHERE dt BETWEEN $1::timestamp AND $2::timestamp
GROUP BY date_trunc('day', dt) + date_part('hour', dt)::int / 4 * interval '4 hour'
ORDER BY dt;
