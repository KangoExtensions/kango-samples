function GmailChecker() {
	var self = this;
	self.refresh();	
	kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.Command, function() {
		kango.browser.tabs.create({url: 'https://mail.google.com/'});
		self.refresh();
	});
	window.setInterval(function(){self.refresh()}, self._refreshTimeout);
}

GmailChecker.prototype = {

	_refreshTimeout: 60*1000*15,	// 15 minutes
	_feedUrl: 'https://mail.google.com/mail/feed/atom',
	
	_setOffline: function() {
		kango.ui.browserButton.setTooltipText('Offline');
		kango.ui.browserButton.setIcon('icons/button_gray.png');
		kango.ui.browserButton.setBadgeValue(0);
	},
	
	_setUnreadCount: function(count) {
		kango.ui.browserButton.setTooltipText('Unread count: ' + count);
		kango.ui.browserButton.setIcon('icons/button.png');
		kango.ui.browserButton.setBadgeValue(count);
	},
	
	refresh: function() {		
		var details = {
			url: this._feedUrl,
			method: 'GET',
			async: true,
			contentType: 'text'	
		};
		var self = this;
		kango.xhr.send(details, function(data) {
			if(data.status == 200 && data.response != null) {
				var text = data.response;
				var count = 0;
				var re = /<fullcount>(\d+)<\/fullcount>/;
				var matches = text.match(re);
				if(matches != null && matches.length > 0) {
					count = matches[1];
				}
				self._setUnreadCount(count);
			}
			else { // something went wrong
				self._setOffline();
			}
		});
	}
};

new GmailChecker();