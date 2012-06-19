require('../test_helper.js').controller('contents', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        type: '',
        text: '',
        filename: '',
        editable_begin: '',
        editable_end: ''
    };
}

exports['contents controller'] = {

    'GET new': function (test) {
        test.get('/contents/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/contents', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Content.find;
        Content.find = sinon.spy(function (id, callback) {
            callback(null, new Content);
        });
        test.get('/contents/42/edit', function () {
            test.ok(Content.find.calledWith('42'));
            Content.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Content.find;
        Content.find = sinon.spy(function (id, callback) {
            callback(null, new Content);
        });
        test.get('/contents/42', function (req, res) {
            test.ok(Content.find.calledWith('42'));
            Content.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var content = new ValidAttributes;
        var create = Content.create;
        Content.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, content);
            callback(null, content);
        });
        test.post('/contents', {Content: content}, function () {
            test.redirect('/contents');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var content = new ValidAttributes;
        var create = Content.create;
        Content.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, content);
            callback(new Error, content);
        });
        test.post('/contents', {Content: content}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Content.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/contents/1', new ValidAttributes, function () {
            test.redirect('/contents/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Content.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/contents/1', new ValidAttributes, function () {
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

