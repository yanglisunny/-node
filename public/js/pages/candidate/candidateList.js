function CandidateList(candiContainer, tbody) {
	this.candiContainer = candiContainer;
	this.tbody = tbody;
	this.createDom();
	this.setDom();
	this.bindEvents();
	this.pagination = 1;
	this.pageNum = 10;
}

CandidateList.Template = 
`<div class="modal fade" id="addCandidateModel" tabindex="-1" role="dialog" aria-labelledby="addCandateLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="addPos">修改候选人</h4>
      </div>
      <div class="modal-body">
        <form>
            <div class="form-group">
            <label for="position" class="control-label">求职职位:</label>
            <input type="text" class="form-control" id="position">
          </div>
          <div class="form-group">
            <label for="username" class="control-label">姓名:</label>
            <input type="text" class="form-control" id="username">
          </div>
           <div class="form-group">
            <label for="worktime" class="control-label">工作时间:</label>
            <select id="worktime" class="form-control">
			    <option>1年以下</option>
			    <option>1-3年</option>
			    <option>3-5年</option>
			    <option>5年以上</option>
			</select>
          </div>
           <div class="form-group">
            <label for="salary" class="control-label">薪资范围:</label>
	            <select id="salary" class="form-control">
				    <option>5000-10000</option>
				    <option>10000-15000</option>
				    <option>15000-25000</option>
				    <option>25000-50000</option>
				</select>
          </div>
           <div class"form-group">
            <label for="major" class="control-label">专业:</label>
            <input type="text" class="form-control" id="major">
          </div>
           <div class"form-group">
            <label for="picture" class="control-label">照片:</label>
            <input type="file" class="form-control" id="picture">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" id="addCandidateBtn"  class="btn btn-primary">修改</button>
      </div>
    </div>
</div>`;

$.extend(CandidateList.prototype, {
	createDom: function() {
		$.ajax({
			url: "/api/candidate/show",
			data: {
				pagination: this.pagination,
				pageNum: this.pageNum
			},
			success: $.proxy(this.handelShowCandidateSucc, this)
		})
	},
	setDom: function() {
		this.updateCandidateEle = $(CandidateList.Template)
		this.candiContainer.append(this.updateCandidateEle);
		
		this.positionInput = this.updateCandidateEle.find("#position");
		this.usernameInput = this.updateCandidateEle.find("#username");
		this.worktimeInput = this.updateCandidateEle.find("#worktime");
		this.salaryInput = this.updateCandidateEle.find("#salary");
		this.majorInput = this.updateCandidateEle.find("#major");
		this.pictureInput = this.updateCandidateEle.find("#picture");
	},

	showList: function(pagination) {
		if(pagination){
			this.pagination = pagination;
		}
		this.createDom();
	},
	handelShowCandidateSucc: function(result) {
		const length = result.data.show.length;
		let str = "";
		// (res.data.pagination-1)*(res.data.pageNum)+i+1
		for(var i = 0 ; i < length ; i++) {
			const item = result.data.show[i];
			const picture = item.picture ?  item.picture : 'default.png';
			str += `<tr><td><a href='javascript:;' class="orderNum" class="data-id">${i+1}</a></td>
					<td><a href='javascript:;'>${item.position}</a></td>
					<td><a href='javascript:;'>${item.username}</a></td>
					<td><a href='javascript:;'>${item.worktime}</a></td>
					<td><a href='javascript:;'>${item.salary}</a></td>
					<td><a href='javascript:;'>${item.major}</a></td>
					<td><img src='uploads/${picture}' width="30px" height="30px"></td>
					<td><a href='javascript:;' class="js-update" data-id="${item._id}">修改 </a><a href='javascript:;' class="js-delete" data-id="${item._id}">删除</a></td>
					</tr>`;
		}
		this.tbody.html(str);

	},
	bindEvents: function() {
		this.tbody.on("click", ".js-update", $.proxy(this.handelUpdateClick, this))
		this.addCandidateBtn = this.updateCandidateEle.find("#addCandidateBtn");
		this.addCandidateBtn.on("click", $.proxy(this.handelUpdateTwoClick, this));
	},
	handelUpdateClick: function(e) {
		this.updateCandidateEle.modal("show");
		this.updataId = $(e.target).attr("data-id");
		$.ajax({
			url: '/api/candidate/getItem',
			data: {
				id: this.updataId
			},
			success: $.proxy(this.handelUpdateItem, this)
		})
	},
	handelUpdateItem: function(res) {
		const item = res.data.candidateInfo;
		this.positionInput.val(item.position);
		this.usernameInput.val(item.username);
		this.worktimeInput.val(item.worktime);
		this.salaryInput.val(item.salary);
		this.majorInput.val(item.major);
	},
	handelUpdateTwoClick: function() {
		var formData = new FormData();
		formData.append("id", this.updataId);
		formData.append("position", this.positionInput.val());
		formData.append("username", this.usernameInput.val());
		formData.append("worktime", this.worktimeInput.val());
		formData.append("salary", this.salaryInput.val());
		formData.append("major", this.majorInput.val());
		formData.append("picture", this.pictureInput[0].files[0]);

		$.ajax({
			url: "/api/candidate/update",
			type: "post",
			cache: false,
			processData: false,
    		contentType: false,
			data: formData,
			success: $.proxy(this.addCandidateSucc, this)
		})
	},
	addCandidateSucc: function(res) {
		if(res){
			this.updateCandidateEle.modal("hide");
			this.showList();
			// $.trigger("pageChange")
		}
	}
})