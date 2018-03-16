function Login(headerCon, btnContainer, logoutContainer) {
	this.headerCon = headerCon;
	this.btnContainer = btnContainer;
	this.logoutContainer = logoutContainer;
	this.createDom();
	this.bindloginEvent();
}
 
Login.Template = 
	`<div class="modal" id="loginModel" tabindex="-1" role="dialog" aria-labelledby="loginLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="registerLabel">登录</h4>
	      </div>
	      <div class="modal-body">
	        <form>
	          <div class="form-group">
	            <label for="username" class="control-label">用户名:</label>
	            <input type="text" class="form-control" id="username">
	          </div>
	          <div class="form-group">
	            <label for="password" class="control-label">密码:</label>
	            <input type="password" class="form-control" id="password">
	          </div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	        <button type="button" id="loginBtn"  class="btn btn-primary">登录</button>
	      </div>
	       	<div style="margin:20px;" class="alert hide alert-success" id="successNotice">恭喜您登陆成功！</div>
           	<div style="margin:20px;" class="alert hide alert-danger" id="errorNotice">sorry, 用户不存在或者密码不正确</div>
	    </div>
	  </div>
	</div>`;
$.extend(Login.prototype, {
	createDom: function() {
		this.btnContainer.append('<li><a href="#" data-toggle="modal" data-target="#loginModel">登录</a></li>');
		this.logoutContainer.append('<li><a href="javascript:;" id="loginUser"></a></li><li><a href="javascripot:;" id="logout">退出</a></li>');
		this.element = $(Login.Template);
		this.headerCon.append(this.element);
	},
	bindloginEvent: function() {
		this.loginBtn = this.element.find("#loginBtn");
		this.loginBtn.on("click",$.proxy(this.handelloginClick, this));
		this.logout = this.logoutContainer.find("#logout");
		this.logout.on("click",$.proxy(this.handellogoutClick, this));
		this.succNoticeElem = this.element.find("#successNotice");
		/*this.succNoticeElem.on("click",$.proxy(this.handellogoutClick, this));*/
        this.errNoticeElem = this.element.find("#errorNotice");
	},
	handelloginClick: function() {
		var username = this.element.find("#username").val();
		var password = this.element.find("#password").val();

		$.ajax({
			type: "post",
			url: '/api/user/login',
			data: {
				username: username,
				password: password
			},
			success: $.proxy(this.handleloginSucc,this)
		})
	},
	handleloginSucc: function(res) {
		if (res.data.login) {
          // location.reload();
        	$(this).trigger(new $.Event("loginSucc",{//发布事件（触发）
        		username: res.data.username
        	}))
        	 setTimeout($.proxy(this.succCloseModal, this), 20)
        }else {
            this.errNoticeElem.addClass('hide');
        }
	},

	handellogoutClick: function(res) {
		 $.ajax({
            url: '/api/user/logout',
            success: $.proxy(this.handleLogoutSucc, this)
        })
	},
	handleLogoutSucc: function(res) {
		if(res.data.logout){
			 window.location.reload();
		}
	},
	
    succCloseModal: function() {
    	console.log( this.element.modal)
        this.succNoticeElem.addClass('hide');
        this.element.modal('hide');
    },

    handleUsernameFocus: function() {
        this.errNoticeElem.addClass('hide');
    },
    setUsername: function(username) {
    	this.logoutContainer.find("#loginUser").html(username);
    }
})