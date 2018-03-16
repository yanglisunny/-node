function Page(headerContainer, listContainer){
	this.headerContainer = headerContainer;
	this.listContainer = listContainer;
	this.tbody = $("#tbody");
}

$.extend(Page.prototype, {
	init: function() {
		this.createHeader();
		this.createContext();
		this.createTableList();
		this.createPagination();
		this.bindEvents();
	},
	createHeader: function() {
		this.header = new Header(this.headerContainer);
	},
	createContext: function() {
		this.addPosition = new addPosition(this.listContainer);
	},
	createTableList: function() {
		this.tableList = new tableList(this.tbody,this.listContainer);
	},
	createPagination: function() {
		this.PaginationContainer = this.listContainer.find("#pagination");
		this.Pagination = new Pagination(this.PaginationContainer);
	},
	bindEvents: function() {
		$(this.tableList).on("showPositionSucc", $.proxy(this.handelPagSucc, this));
		$(this.Pagination).on("change", $.proxy(this.handelPagChangeSucc, this));
		$(this.addPosition).on("addPositionChange", $.proxy(this.handelAddPositionChange, this));
		$(this.tableList).on("pagechange", $.proxy(this.handelPagChange, this));
		$(this.addPosition).on("unLogin", $.proxy(this.handelUnLogin, this));
	},
	handelPagSucc: function(e) {
		this.paginationEle = $("#pagination");
		var totalPage = e.totalPage;
		this.pagination = new Pagination(this.paginationEle)
		this.pagination.setPageNumber(totalPage)
	},
	handelPagChangeSucc: function(e) {
		var pagination = e.pagination;
		this.tableList.refreshTabList(pagination);
	},
	handelAddPositionChange: function() {
		this.tableList.refreshTabList();
	},
	handelPagChange: function(e) {
		var pagination = e.pagination;
		this.Pagination.changePage(pagination);
	},
	handelUnLogin: function(){
		// $(this.header).trigger("handelLogin");
		alert(333);
	}

})                                            