function Pagination(candiContainer) {
	this.candiContainer = candiContainer;
	this.bindEvents();
}

$.extend(Pagination.prototype, {
	bindEvents: function() {
		this.candiContainer.on("click",".page-item",$.proxy(this.handelPaginationClick, this));
	},
	setPageNumber: function(totalPage) {
		var str = '';
		for (var i = 1; i <= totalPage; i++) {
			str += "<li class='page-lis'><a class='page-item' href='javascript:;'>" + i +"</a></li>"
		}
		this.candiContainer.html(str);
	},
	handelPaginationClick: function(e) {
		var pagination = $(e.target).html();
		$(this).trigger(new $.Event("change", {
			pagination: pagination
		}))
	},
	changePage: function(pagination) {
		var lis = this.candiContainer.find(".page-lis").eq(pagination-1);
		 var ass = lis.find(".page-item");
			ass.trigger("click")
	}
})