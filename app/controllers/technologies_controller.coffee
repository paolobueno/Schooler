load 'application'

before 'load technology', ->
    Technology.find params.id, (err, technology) =>
        if err
            redirect path_to.technologies()
        else
            @technology = technology
            next()
, only: ['show', 'edit', 'update', 'destroy']

action 'new', ->
    @technology = new Technology
    @title = 'New technology'
    render()

action 'create', ->
    Technology.create body.Technology, (err, technology) =>
        if err
            flash 'error', 'Technology can not be created'
            @technology = technology
            @title = 'New technology'
            render 'new'
        else
            flash 'info', 'Technology created'
            redirect path_to.technologies()

action 'index', ->
    Technology.all (err, technologies) =>
        @technologies = technologies
        @title = 'Technologys index'
        render()

action 'show', ->
    @title = 'Technology show'
    render()

action 'edit', ->
    @title = 'Technology edit'
    render()

action 'update', ->
    @technology.updateAttributes body.Technology, (err) =>
        if !err
            flash 'info', 'Technology updated'
            redirect path_to.technology(@technology)
        else
            flash 'error', 'Technology can not be updated'
            @title = 'Edit technology details'
            render 'edit'

action 'destroy', ->
    @technology.destroy (error) ->
        if error
            flash 'error', 'Can not destroy technology'
        else
            flash 'info', 'Technology successfully removed'
        send "'" + path_to.technologies() + "'"

