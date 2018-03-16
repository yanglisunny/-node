function Page(headerContainer, candiContainer) {
	this.headerContainer = headerContainer;
	this.candiContainer = candiContainer;
	this.tbody = $("#tbody");
}


$.extend(Page.prototype, {
	init: function() {
		this.createHeader();
		this.createAddCandidate();
		this.createCandidateList();
		this.createPage();
		this.bindEvents();
	},
	createHeader: function() {
		this.header = new Header(this.headerContainer);
	},
	createAddCandidate: function() {
		this.addCandidate = new addCandidate(this.candiContainer);
	},
	createCandidateList: function() {
		this.candidateList = new CandidateList(this.candiContainer, this.tbody);
	},
	createPage: function() {
		this.pagination = new Pagination(this.candiContainer)
	},
	bindEvents: function() {
		$(this.addCandidate).on("addCandidateSucc", $.proxy(this.handelAddCandidateSucc,this));
	},
	handelAddCandidateSucc:function() {
		this.candidateList.showList();
	}
})