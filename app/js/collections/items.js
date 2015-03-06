AlexMoney.Collections.Items = Backbone.Collection.extend({
    //use this?
    model: AlexMoney.Models.Item
    ,localStorage: new Backbone.LocalStorage('Money')
});
