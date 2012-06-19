require('../test_helper.js').controller('exercise_defs', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        description: '',
        max_mark: '',
        difficulty: ''
    };
}

exports['exercise_defs controller'] = {

    'GET new': function (test) {
        test.get('/exercise_defs/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/exercise_defs', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = ExerciseDef.find;
        ExerciseDef.find = sinon.spy(function (id, callback) {
            callback(null, new ExerciseDef);
        });
        test.get('/exercise_defs/42/edit', function () {
            test.ok(ExerciseDef.find.calledWith('42'));
            ExerciseDef.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = ExerciseDef.find;
        ExerciseDef.find = sinon.spy(function (id, callback) {
            callback(null, new ExerciseDef);
        });
        test.get('/exercise_defs/42', function (req, res) {
            test.ok(ExerciseDef.find.calledWith('42'));
            ExerciseDef.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var exercise_def = new ValidAttributes;
        var create = ExerciseDef.create;
        ExerciseDef.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, exercise_def);
            callback(null, exercise_def);
        });
        test.post('/exercise_defs', {ExerciseDef: exercise_def}, function () {
            test.redirect('/exercise_defs');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var exercise_def = new ValidAttributes;
        var create = ExerciseDef.create;
        ExerciseDef.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, exercise_def);
            callback(new Error, exercise_def);
        });
        test.post('/exercise_defs', {ExerciseDef: exercise_def}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        ExerciseDef.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/exercise_defs/1', new ValidAttributes, function () {
            test.redirect('/exercise_defs/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        ExerciseDef.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/exercise_defs/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

