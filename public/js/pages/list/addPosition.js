function addPosition(listContainer) {
	this.listContainer = listContainer;
	this.createDom();
	this.bindEvents();
}

addPosition.Template = 
	`<div class="modal fade" id="addPositionModel" tabindex="-1" role="dialog" aria-labelledby="addPositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="addPos">新增职位</h4>
	      </div>
	      <div class="modal-body">
	        <form>
	            <div class="form-group">
	            <label for="name" class="control-label">职位名称:</label>
	            <input type="text" class="form-control" id="name">
	          </div>
	          <div class="form-group">
	            <label for="company" class="control-label">公司:</label>
	            <input type="text" class="form-control" id="company">
	          </div>
	           <div class="form-group">
	            <label for="salary" class="control-label">薪资:</label>
		            <select id="salary" class="form-control">
					    <option>5000-10000</option>
					    <option>10000-15000</option>
					    <option>15000-25000</option>
					    <option>25000-50000</option>
					</select>
	          </div>
	           <div class"form-group">
	            <label for="address" class="control-label">地址:</label>
	            <input type="text" class="form-control" id="address">
	          </div>
	           <div class"form-group">
	            <label for="logo" class="control-label">文件:</label>
	            <input type="file" class="form-control" id="logo">
	          </div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" id="addPositionBtn"  class="btn btn-primary">添加</button>
	      </div>
	    </div>
	  </div>
	</div>`;

$.extend(addPosition.prototype, {
	createDom: function() {
		this.addPositionEle = $(addPosition.Template);
		this.listContainer.append( this.addPositionEle );
		this.newBtn = this.listContainer.find("#newBtn");
	},
	bindEvents: function() {
		this.addPositionBtn = $("#addPositionBtn");
		this.addPositionBtn.on("click", $.proxy(this.handelAddPositionClick, this));
		this.newBtn.on("click", $.proxy(this.newBtnClick, this))
	},
	handelAddPositionClick: function(res) {
		var name = this.addPositionEle.find("#name").val(),
			company = this.addPositionEle.find("#company").val(),
			salary = this.addPositionEle.find("#salary").val(),
			address = this.addPositionEle.find("#address").val(),
			logo = this.addPositionEle.find("#logo");

		var formData = new FormData();

		formData.append("name", name);
		formData.append("company", company);
		formData.append("salary", salary);
		formData.append("address", address);
		formData.append("logo", logo[0].files[0]);
		console.log(logo[0],logo[0].files[0])
		
		$.ajax({
			url: "/api/position/add",
			type: "post",
			cache: false,
			processData: false,
    		contentType: false,
			data: formData,
			success: $.proxy(this.addPositionSucc, this)
		})
	},
	addPositionSucc: function(res) {
		$(this.addPositionEle).modal("hide");
		$(this).trigger("addPositionChange");
	},
	newBtnClick: function() {
		// $(this).trigger("addPositionChange");
		this.addPositionEle.modal("show");
		
	}

})