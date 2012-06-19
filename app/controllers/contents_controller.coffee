load 'application'

before 'load content', ->
    Content.find params.id, (err, content) =>
        if err
            redirect path_to.contents()
        else
            @content = content
            next()
, only: ['show', 'edit', 'update', 'destroy']

action 'new', ->
    @content = new Content
    @title = 'New content'
    render()

action 'create', ->
    Content.create body.Content, (err, content) =>
        if err
            flash 'error', 'Content can not be created'
            @content = content
            @title = 'New content'
            render 'new'
        else
            flash 'info', 'Content created'
            redirect path_to.contents()

action 'index', ->
    Content.all (err, contents) =>
        @contents = contents
        @title = 'Contents index'
        render()

action 'show', ->
    @title = 'Content show'
    render()

action 'edit', ->
    @title = 'Content edit'
    render()

action 'update', ->
    @content.updateAttributes body.Content, (err) =>
        if !err
            flash 'info', 'Content updated'
            redirect path_to.content(@content)
        else
            flash 'error', 'Content can not be updated'
            @title = 'Edit content details'
            render 'edit'

action 'destroy', ->
    @content.destroy (error) ->
        if error
            flash 'error', 'Can not destroy content'
        else
            flash 'info', 'Content successfully removed'
        send "'" + path_to.contents() + "'"

