window.ContactManager = {
    Models: {},
    Collections: {},
    Views: {},

    start: function (data) {
        var items = new ContactManager.Collections.Items(data.defaults),
            router = new ContactManager.Router();

        router.on('route:home', function () {
            router.navigate('items', {
                trigger: true,
                replace: true
            });
        });

        router.on('route:showItems', function () {
            var itemsView = new ContactManager.Views.Items({
                collection: items
            });

            $('#coreCont').html(itemsView.render().$el);
        });

        router.on('route:newItem', function () {
            var itemForm = new ContactManager.Views.ItemForm({
                model: new ContactManager.Models.Item()
            });

            itemForm.on('form:submitted', function (attrs) {
                attrs.id = items.isEmpty() ? 1 : (_.max(items.pluck('id')) + 1);
                items.add(attrs);
                router.navigate('items', true);
            });

            $('#coreCont').html(itemForm.render().$el);
        });

        router.on('route:editItem', function (id) {
            var item = items.get(id),
                itemForm;

            if (item) {
                itemForm = new ContactManager.Views.ItemForm({
                    model: item
                });

                itemForm.on('form:submitted', function (attrs) {
                    item.set(attrs);
                    router.navigate('items', true);
                });

                $('#coreCont').html(itemForm.render().$el);
            } else {
                router.navigate('items', true);
            }
        });

        router.on('route:other', function (url) {
            console.log('jump to items') ;
            router.navigate('items');
        });

        Backbone.history.start();
    }
};

//=====from router.js
ContactManager.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'items': 'showItems',
        'items/new': 'newItem',
        'items/edit/:id': 'editItem'
        ,'*other': 'other'
    }
});
