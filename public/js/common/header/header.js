function Header(container) {
    this.container = container;
    this.createDom();
    this.createLogin();
    this.createRegister();
    this.checkLogin();
    this.bindLoginEvents();
    this.bindEvents();
}
Header.Template = `
    <header>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/">职位管理系统</a>
                </div>
    
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav" id="navBar">
                        <li><a href="/">首页 <span class="sr-only">(current)</span></a></li>
                        <li><a href="/details.html">职位管理</a></li>
                        <li><a href="/candidate.html">候选人</a></li>
                    </ul>
      
                    <ul class="nav navbar-nav navbar-right hide"  id="btnContainer"> </ul>
                    <ul class="nav navbar-nav navbar-right hide"  id="logoutContainer"></ul>
                </div>
            </div>
        </nav>
</header>
`;
$.extend(Header.prototype,{
    createDom: function() {
        this.element = $(Header.Template);
        this.container.append(this.element);
        this.btnContainer = this.element.find("#btnContainer")
        this.logoutContainer = this.element.find("#logoutContainer")
    },
    createRegister: function() {
        this.register = new Register(this.element,this.btnContainer);
    },
    createLogin: function() {
       this.login = new Login(this.element,this.btnContainer,this.logoutContainer);
    },
    checkLogin: function() {
        $.ajax({
            url: "/api/user/isLogin",
            success: $.proxy(this.handleGetLoginStatusSucc, this)
        })
    },
    handleGetLoginStatusSucc: function(res) {
        if(!res.data.isLogin){
            this.btnContainer.removeClass("hide");
        }else{
            this.logoutContainer.removeClass("hide");
           this.login.setUsername(res.data.username);
        }
    },
    bindLoginEvents: function() {//订阅
        $(this).on("handelLogin", $.proxy(this.handelLoginSucc, this))
        $(this.login).on("loginSucc", $.proxy(this.handelLoginSucc, this));
    },
    handelLoginSucc: function(e) {
        this.username = e.username;
         this.btnContainer.addClass("hide");
         this.logoutContainer.removeClass("hide");
          this.login.setUsername(this.username);
    },
    bindEvents: function() {
        this.navbarLiEle = this.element.find("#navBar>li");
        this.navbarLiEle.on("click", $.proxy(this.handelNavLiClick, this));
        console.log(this.navbarLiEle)
    },
    handelNavLiClick: function(e) {
        console.log($(e.target).html())
          // $(e.target).siblings().removeClass("active");
        $(e.target).addClass("active");
       
    }
})