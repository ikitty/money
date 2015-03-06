ContactManager.Views.Items = Backbone.View.extend({
  template: _.template($('#tplAllMoney').html()),

  renderOne: function(model) {
    var itemView = new ContactManager.Views.Item({model: model});
    this.$('#moneyCont').append(itemView.render().$el);
  },

  render: function() {
    var html = this.template();
    this.$el.html(html);

    this.collection.each(this.renderOne, this);

    return this;
  }
});
