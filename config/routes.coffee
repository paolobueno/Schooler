exports.routes = (map) ->
  map.resources 'contents'
  map.resources 'exercise_defs'
  map.resources "technologies"
  map.all ":controller/:action"
  map.all ":controller/:action/:id"