require('../test_helper.js').controller('technologies', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        name: '',
        test_command: '',
        ace_layout: '',
        extension: '',
        test_extension: ''
    };
}

exports['technologies controller'] = {

    'GET new': function (test) {
        test.get('/technologies/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/technologies', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Technology.find;
        Technology.find = sinon.spy(function (id, callback) {
            callback(null, new Technology);
        });
        test.get('/technologies/42/edit', function () {
            test.ok(Technology.find.calledWith('42'));
            Technology.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Technology.find;
        Technology.find = sinon.spy(function (id, callback) {
            callback(null, new Technology);
        });
        test.get('/technologies/42', function (req, res) {
            test.ok(Technology.find.calledWith('42'));
            Technology.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var technology = new ValidAttributes;
        var create = Technology.create;
        Technology.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, technology);
            callback(null, technology);
        });
        test.post('/technologies', {Technology: technology}, function () {
            test.redirect('/technologies');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var technology = new ValidAttributes;
        var create = Technology.create;
        Technology.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, technology);
            callback(new Error, technology);
        });
        test.post('/technologies', {Technology: technology}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Technology.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/technologies/1', new ValidAttributes, function () {
            test.redirect('/technologies/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Technology.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/technologies/1', new ValidAttributes, function () {
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

