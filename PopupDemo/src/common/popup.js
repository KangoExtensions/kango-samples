var StorageTest = {
	
	init: function() {
		$('#storage-get').click(function(event) {
			StorageTest.testGet();
		});	
		
		$('#storage-set').click(function(event) {
			StorageTest.testSet();
		});	
		
		$('#storage-remove').click(function(event) {
			StorageTest.testRemove();
		});	
		
		$('#storage-keys').click(function(event) {
			StorageTest.testKeys();
		});	
	},
	
	testGet: function() {
		$('#storage-value').val(kango.storage.getItem($('#storage-key').val()) || 'null');
	},
	
	testSet: function() {
		kango.storage.setItem($('#storage-key').val(), $('#storage-value').val());
	},
	
	testRemove: function() {
		kango.storage.removeItem($('#storage-key').val());
		$('#storage-value').val('null');
	},
	
	testKeys: function() {
		$('#storage-value').val(kango.storage.getKeys().toString());
	}
};

var XhrTest = {
	
	init: function() {
		$('#xhr-get').click(function(event) {
			XhrTest.testGet();
		});	
	},
	
	testGet: function() {
		var details = {
			url: $('#xhr-url').val(),
			method: 'GET',
			async: true,
			contentType: 'text'
		};
		kango.xhr.send(details, function(data) {
			$('#xhr-result').val((data.status == 200 && data.response != null) ? data.response : 'Error. Status=' + data.status);
		});
	}
};

function showPopupProperies() {
	var props = 'window.outerWidth='+window.outerWidth+'\n';
	props += 'window.outerHeight='+window.outerHeight+'\n';
	props += 'document.documentElement.clientWidth='+document.documentElement.clientWidth+'\n';
	props += 'document.documentElement.clientHeight='+document.documentElement.clientHeight+'\n';
	props += 'document.body.clientWidth='+document.body.clientWidth+'\n';
	props += 'document.body.clientHeight='+document.body.clientHeight+'\n';
	props += 'document.body.offsetWidth='+document.body.offsetWidth+'\n';
	props += 'document.body.offsetHeight='+document.body.offsetHeight+'\n';
	$('#popup-properies').val(props);
}

KangoAPI.onReady(function() {
	$('#ready').show();
	$('#not-ready').hide();
	
	showPopupProperies();
	
	$('#form').submit(function() {
		return false;
	});
	
	$('#popup-close').click(function(event) {
		KangoAPI.closeWindow()
	});	
	
	XhrTest.init();
	StorageTest.init();
});