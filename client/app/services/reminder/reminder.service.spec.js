'use strict';

describe('Service: reminder', function () {

  // load the service's module
  beforeEach(module('slackbotRemindersApp'));

  // instantiate service
  var reminder;
  beforeEach(inject(function (_reminder_) {
    reminder = _reminder_;
  }));

  it('should do something', function () {
    expect(!!reminder).toBe(true);
  });

});
