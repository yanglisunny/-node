

function tableList(tbody,listContainer) {
	this.tbody = tbody ;
	this.listContainer = listContainer
	this.createDom();
	this.setDom();
	this.bindEvents();
	this.pagination = 1;
	this.pageNum = 10 ;
}

tableList.Template = 
`
	<div class="modal fade" id="updatePositionModel" tabindex="-1" role="dialog" aria-labelledby="updatePositionModel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="updatePos">修改职位</h4>
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
	            <input type="file" class="form-control" id="logo" value="1">
	          </div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" id="updatePositionBtn"  class="btn btn-primary">修改</button>
	      </div>
	    </div>
	  </div>
	</div>
`;

$.extend(tableList.prototype, {
	createDom: function(){
		$.ajax({
			url: "api/position/show",
			data: {
				pagination:this.pagination,
				pageNum: this.pageNum
			},
			success: $.proxy(this.handelShowPositionList, this)
		})
	},
	setDom: function() {
		this.updatePositionEle = $(tableList.Template)
		this.listContainer.append(this.updatePositionEle);
		
		this.nameInput = this.updatePositionEle.find("#name");
		this.companyInput = this.updatePositionEle.find("#company");
		this.salaryInput = this.updatePositionEle.find("#salary");
		this.addressInput = this.updatePositionEle.find("#address");
		this.logoInput = this.updatePositionEle.find("#logo");
	},
	handelShowPositionList: function(res) {
		if (!res.data.positionInfo || !res.data.positionInfo.length) {
			if (res.data.totalPage >= 1) {
				$(this).trigger(new $.Event("pagechange", {
					pagination: ((this.pagination -1) === 0 ? 1 : this.pagination -1)
				}))
			}else {
				return;
			}
		}
		let str = '';
		let length = res.data.positionInfo.length;
		for(var i = 0 ; i < length ; i ++) {
			const item = res.data.positionInfo[i] ;
			var imgSrc = item.logo ?  item.logo : 'default.png';
			str += `
					<tr><td><a href='javascript:;' class="orderNum" class="data-id">${(res.data.pagination-1)*(res.data.pageNum)+i+1}</a></td>
					<td><a href='javascript:;'>${item.name}</a></td>
					<td><img src='uploads/${imgSrc}' width="30px" height="30px"></td>
					<td><a href='javascript:;'>${item.company}</a></td>
					<td><a href='javascript:;'>${item.salary}</a></td>
					<td><a href='javascript:;'>${item.address}</a></td>
					<td><a href='javascript:;' class="js-update" data-id="${item._id}">修改 </a><a href='javascript:;' class="js-delete" data-id="${item._id}">删除</a></td>
					</tr>`;
		}
		this.tbody.html(str);
		$(this).trigger(new $.Event("showPositionSucc", {
			totalPage: res.data.totalPage
		}))
	},
	refreshTabList: function(pagination) {
		if(pagination){
			this.pagination = pagination;
		}
		this.createDom();
	},
	bindEvents: function() {
		this.tbody.on("click", ".js-delete", $.proxy(this.handleDelectClick, this));
		this.tbody.on("click", ".js-update", $.proxy(this.handleUpdateClick, this));
		var updatePositionBtn = this.updatePositionEle.find("#updatePositionBtn");
		updatePositionBtn.on("click", $.proxy(this.handleUpdatePosClick, this));
	},
	handleDelectClick: function(e) {
		this.delId = $(e.target).attr("data-id");
		$.ajax({
			url: '/api/position/del',
			data: {
				id: this.delId
			},
			success: $.proxy(this.handelDeleteItem, this)
		})
	},
	handelDeleteItem: function(res) {
		if(res) {
			this.refreshTabList();
		}	
	},
	handleUpdateClick: function(e) {

		this.updataId = $(e.target).attr("data-id");
		this.updatePositionEle.modal("show");
		$.ajax({
			url: '/api/position/getItem',
			data: {
				id: this.updataId
			},
			success: $.proxy(this.handelUpdateItem, this)
		})
	},
	handelUpdateItem: function(res) {
		const updateInfo = res.data.positionInfo;
		this.nameInput.val(updateInfo.name);
		this.companyInput.val(updateInfo.company);
		this.salaryInput.val(updateInfo.salary);
		this.addressInput.val(updateInfo.address);
	},
	handleUpdatePosClick: function() {
		var name = this.updatePositionEle.find("#name").val(),
			company = this.updatePositionEle.find("#company").val(),
			salary = this.updatePositionEle.find("#salary").val(),
			address = this.updatePositionEle.find("#address").val(),
			logo = this.updatePositionEle.find("#logo");

		var formData = new FormData();

		formData.append("id", this.updataId);
		formData.append("name", name);
		formData.append("company", company);
		formData.append("salary", salary);
		formData.append("address", address);
		formData.append("logo", logo[0].files[0]);
		console.log(logo[0],logo[0].files[0])
		
		$.ajax({
			url: "/api/position/update",
			type: "post",
			cache: false,
			processData: false,
    		contentType: false,
			data: formData,
			success: $.proxy(this.handelUpdatePosition, this)
		})
	},
	handelUpdatePosition: function(res) {
		if(res){
			this.updatePositionEle.modal("hide");
			this.refreshTabList();
		}
	}
	
})