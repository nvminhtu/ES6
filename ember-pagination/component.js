import Ember from 'ember';
const { Component, computed, A } = Ember;

export default Component.extend({

  classNames: ['pagination'],
  min: 1,
  max: 1,
  more: 3, //number of display in first part / last past
  current: 1,
  range: 5,
  tagName: 'ul',
  windowRange: computed('min', 'max', 'range', 'current', function() {
    let max = this.get('max'); // 14
    let min = this.get('min'); // 1
    const range = this.get('range'); // import = 3
    const current = this.get('current');

    const middle = Math.floor((max - min) / 2); // 7

    // max = (ac < 1) ? max:"run";
    let dist = Math.abs(max - min); //1 2 3---
    if( dist > 1) { //check if pager has only 2 pages
      min = min + 1;
      max = max - 1;
    }

    let low = Math.max(min, current - Math.floor(range / 2)); // 1,2 => 2
    let high = Math.min(max, current + Math.floor(range / 2)); // 14, 2 => 2

    if (high - low < range - 1) {
      if (current <= middle) {
        high = Math.min(max, low + range - 1); // (14,(2+3-1)) => 4
      } else {
        low = Math.max(min, high - (range - 1)); // (1,2-(3-1)) => 1
      }
    }
    return {
      low, high
    };
  }),

  _pages: computed('windowRange.low', 'windowRange.high', 'current', function() {
    const a = new A([]);
    const winRange = this.get('windowRange');
    const current = this.get('current');
    for (let i = winRange.low; i <= winRange.high; i += 1) { // 2 <= i < 4
      a.addObject({ val: i, cssClass: (current === i ? 'active' : 'waves-effect') });
    }
    return a;
  }),

  _canGoBack: computed('min', 'current', function() {
    return this.get('current') > this.get('min');
  }),

  _canGoFwd: computed('max', 'current', function() {
    return this.get('current') < this.get('max');
  }),

  _beInFirst: computed('max', 'current', function() {
    return this.get('current') < this.get('max');
  }),

  _beLimited: computed('min','max','current', function(){
    return (this.get('current') === this.get('min') || this.get('current') === this.get('max'));
  }),

  hiddenClass: computed('_beLimited',function(){
    return this.get('_beLimited') ? 'disabled' : '';
  }),

  incrementClass: computed('_canGoFwd', function() {
    return this.get('_canGoFwd') ? '' : 'disabled';
  }),

  decrementClass: computed('_canGoBack', function() {
    return this.get('_canGoBack') ? '' : 'disabled';
  }),

  actions: {
    oneBack() {
      if (this.get('_canGoBack')) {
        this.decrementProperty('current');
      }
    },
    oneFwd() {
      if (this.get('_canGoFwd')) {
        this.incrementProperty('current');
      }
    },
    gotoPage(pagenum) {
      this.set('current', pagenum);
    }
  }
});
