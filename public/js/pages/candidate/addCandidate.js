function addCandidate(candiContainer) {
	this.candiContainer = candiContainer;
	this.createDom();
	this.bindEvents();
}
addCandidate.Template = 
	`<div class="modal fade" id="addCandidateModel" tabindex="-1" role="dialog" aria-labelledby="addCandateLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="addPos">新增候选人</h4>
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
	        <button type="button" id="addCandidateBtn"  class="btn btn-primary">添加</button>
	      </div>
	    </div>
	  </div>
	</div>`;

$.extend(addCandidate.prototype, {
	createDom: function() {
		this.addCandidateEle = $(addCandidate.Template);
		this.candiContainer.append( this.addCandidateEle );
		this.newBtn = this.candiContainer.find("#newBtn");
	},
	bindEvents: function() {
		this.newBtn.on("click", $.proxy(this.newBtnClick, this))
		this.addCandiBtn = this.candiContainer.find("#addCandidateBtn");
		this.addCandiBtn.on("click", $.proxy(this.addCandiBtnClickSucc, this))
	},
	newBtnClick: function() {
		this.addCandidateEle.modal("show");
	},
	addCandiBtnClickSucc: function() {
		var position = this.candiContainer.find("#position").val(),
		    username = this.candiContainer.find("#username").val(),
			worktime = this.candiContainer.find("#worktime").val(),
			salary = this.candiContainer.find("#salary").val(),
			major = this.candiContainer.find("#major").val(),
			picture = this.candiContainer.find("#picture");

		var formData = new FormData();
		formData.append("position", position);
		formData.append("username", username);
		formData.append("worktime", worktime);
		formData.append("salary", salary);
		formData.append("major", major);
		formData.append("picture", picture[0].files[0]);
		$.ajax({
			url: "/api/candidate/add",
			type: "post",
			cache: false,
			processData: false,
    		contentType: false,
			data: formData,
			success: $.proxy(this.addCandidateSucc, this)
		})
	},
	addCandidateSucc: function() {
		this.addCandidateEle.modal("hide");
		$(this).trigger("addCandidateSucc");
	}
})