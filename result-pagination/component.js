import Ember from 'ember';

export default Ember.Component.extend({
  current: '1',
  totalPages: null,
  pages: Ember.computed('totalPages', function() {
    var pages = [];
    var totalPages = this.get('totalPages');
    for(var i = 1; i <= totalPages; i++){
      pages.push(i);
    }
    return pages;
  }),
  actions:  {
    gotoPage(pagenum) {
      //this.set('current', pagenum);
    }
  }
});
