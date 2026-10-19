SELECT 
  u.username,
  u.user_uuid,
  MAX(g.result) AS high_score,
  COUNT(g.game_id) AS total_games_played,
  MAX(g.game_end_time) AS achieved_at
FROM game_sessions g
JOIN users u ON g.user_id = u.user_id
WHERE g.status = 'completed' AND g.game_type = $1
GROUP BY u.user_id, u.username, u.user_uuid
ORDER BY high_score DESC
LIMIT $2;