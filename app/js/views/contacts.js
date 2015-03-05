ContactManager.Views.Contacts = Backbone.View.extend({
  template: _.template($('#tplAllMoney').html()),

  renderOne: function(contact) {
    var itemView = new ContactManager.Views.Contact({model: contact});
    this.$('#moneyCont').append(itemView.render().$el);
  },

  render: function() {
    var html = this.template();
    this.$el.html(html);

    this.collection.each(this.renderOne, this);

    return this;
  }
});
