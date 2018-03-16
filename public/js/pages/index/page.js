function Page(container){
	this.container = container;
}

$.extend(Page.prototype, {
	init: function() {
		this.createHeader();
	},
	createHeader: function() {
		var header = new Header(this.container)
	}
})