define 'User', ->
    property 'email', String, index: true
    property 'password', String
    property 'activated', Boolean, default: false


# ## Tecnology
# Definição de tecnologia,
# utilizada para determinar funcionalidade
# para **Exercícios**, **Conteúdo**, etc.
Technology = describe 'Technology', () ->
    # ### Nome da tecnologia
    # ex.: 'Javascript'
    property 'name', String

    # ### Comando para testes
    # comando utilizado para rodar testes associados aos **Exercícios**
    # ex.: "nodeunit %f"
    property 'test_command', String

    # ### Ace_layout
    # Layout associado para o [ace](http://ace.ajax.org)
    property 'ace_layout', String

    # ### Extensão
    # extensão atribuída para documentos desta tecnologia
    property 'extension', String

    # ### Extensão para testes
    # extensão dos arquivos de teste associados
    property 'test_extension', String

# ## Definição de exercício
# Definição estática de um exercício
# Resultados individuais devem ser armazenados em um
# **Exercise** vinculado a um **Student**
Exercise_def = describe 'Exercise_def', () ->
    # ### Descrição
    # Descrição do exercício
    property 'description', String

    # ### Nota máxima
    property 'max_mark', Number

    # ### Dificuldade
    # dificuldade relativa do exercício
    property 'difficulty', Number


#
Content = describe 'Content', () ->
    property 'type', String
    property 'text', String
    property 'filename', String
    property 'editable_begin', Number
    property 'editable_end', Number
