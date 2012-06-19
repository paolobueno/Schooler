load 'application'

before 'load exercise_def', ->
    ExerciseDef.find params.id, (err, exercise_def) =>
        if err
            redirect path_to.exercise_defs()
        else
            @exercise_def = exercise_def
            next()
, only: ['show', 'edit', 'update', 'destroy']

action 'new', ->
    @exercise_def = new ExerciseDef
    @title = 'New exercise_def'
    render()

action 'create', ->
    ExerciseDef.create body.ExerciseDef, (err, exercise_def) =>
        if err
            flash 'error', 'ExerciseDef can not be created'
            @exercise_def = exercise_def
            @title = 'New exercise_def'
            render 'new'
        else
            flash 'info', 'ExerciseDef created'
            redirect path_to.exercise_defs()

action 'index', ->
    ExerciseDef.all (err, exercise_defs) =>
        @exercise_defs = exercise_defs
        @title = 'ExerciseDefs index'
        render()

action 'show', ->
    @title = 'ExerciseDef show'
    render()

action 'edit', ->
    @title = 'ExerciseDef edit'
    render()

action 'update', ->
    @exercise_def.updateAttributes body.ExerciseDef, (err) =>
        if !err
            flash 'info', 'ExerciseDef updated'
            redirect path_to.exercise_def(@exercise_def)
        else
            flash 'error', 'ExerciseDef can not be updated'
            @title = 'Edit exercise_def details'
            render 'edit'

action 'destroy', ->
    @exercise_def.destroy (error) ->
        if error
            flash 'error', 'Can not destroy exercise_def'
        else
            flash 'info', 'ExerciseDef successfully removed'
        send "'" + path_to.exercise_defs() + "'"

