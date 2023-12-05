var OUT = {};
var env = ulink.getQueryString("ulenv");
OUT.site = {
    url: '//ulink.game.qq.com/app/5231/62981e54eed8ba8a/index.php',
    htmlUrl:'https://pvp.qq.com/act/6749/a20210927pf/index.html',
    endUrl:'https://pvp.qq.com/act/6749/a20210927pf/index.html?bres=1',
    iActId: '6749',//活动ID
    game: 'yxzj',
    sAppId: 'ULINK-TBRJ-729002'//腾讯优联APPID
};

var DIALOG_ID = {
    BIND: 1, // 绑定角色
    LOGIN: 2, // 登陆窗口
    SUCCESS: 3, // 领取成功
    HASGET: 4, // 已经领取过福利了
    FAIL: 5, // 领取失败；服务器开小差
    EXPIRED: 6, // 活动过期了1
}

var shareOptions = {
    iActId: OUT.site.iActId, // 活动号
    title: '不是吧不是吧！王者荣耀六周年限定皮肤难道是TA？', // 分享标题
    desc: '猜英雄免费领限时语音',  // 分享内容简介
    imgUrl: '/game.gtimg.cn/images/yxzj/act/6749/a20210927pf/images/share.jpg', // 分享后朋友看到的图标，大小不能超过32K
    link: OUT.site.htmlUrl,
    WXtrigger: function (res) { // 微信分享点击事件回调

    },
    WXsuccess: function (res) { // 微信分享后回调

    },
    QQcallback: function (res) { // qq成功、失败、或取消的回调
    },
};
ulink.share.init(shareOptions);

OUT.role = {
    channel:'',
    isBindRole: false,
    showBindRoleDialog: function () {
        if(isLogin === false){
            // 未登录, 判断当前是PC 还是移动端
            toLogin();
            return false;
        }
        ulink.http.get({
            url: OUT.site.url + '?route=Role/getRoleSecretInfo',
            params: {
                'sAppId': OUT.site.sAppId,
                'game': OUT.site.game,
                'iActId': OUT.site.iActId
            },
            success: function (result) {
                if (result.iRet != 0) {
                    alertTips(result.sMsg);
                } else {
                    window.role = OUT.role.createRoleSelector(OUT.role.setOptions(result.jData));
                    console.log('roleselector========>' + JSON.stringify(window.role));
                    window.role.show();
                    showDialog(DIALOG_ID.BIND);
                    //showTan('pop1');
                }
            },
            error: function (e) {
            }
        });
    },
    // 设置options值
    setOptions: function (data) {
        console.log('=====>' + JSON.stringify(data));
        var obj =  {
            "sAppId": OUT.site.sAppId,  //腾讯优联APPID
            "iActId": OUT.site.iActId,   //活动ID
            "sSign": data.data.sSign,
            "game": OUT.site.game,
            "timestamp": data.data.timestamp,
            "sCode": data.data.sCode,
            "filterChannels":['微信-安卓抢先服', '手Q-安卓抢先服'],
            custom: true,    // 自定义皮肤必须指定为true
            UISettings: {   // 以下属性必须指定，且不能为空
                dialog: ulink.$('#input_wrapper'), // RoleSelector弹框
                channelSelect: ulink.$('#area_select'), // 渠道下拉框
                systemSelect: ulink.$('#system'),  // 系统下拉框
                areaSelect: ulink.$('#server_select'),    // 大区下拉框
                serverSelect: ulink.$('#ulinkServerSelect'),    // 服务器下拉框
                roleSelect: ulink.$('#role_select'),    // 角色下拉框
                roleSelectParent: ulink.$('#role_select_wrapper'), // 角色下拉框父节点
                errorMsgPanel: ulink.$('#warn_tip'), // 错误信息展示面板
                confirmButton: ulink.$('#bind_bt'), // 确定按钮
                cancelButton: ulink.$('#ulinkCancelBtn'), // 取消按钮
                closeButton: ulink.$('#ulinkCloseBtn'), // 关闭按钮
            }
        };

        return obj;
    },
    // 调起角色选择器
    createRoleSelector: function (options) {
        var roleselector = new ulink.RoleSelector(options);
        //角色查询数据返回监听事件绑定
        roleselector.on("getRoleData", function (data) {
            OUT.role.bindRole(data);//绑定关系
        });

        return roleselector;
    },
    // 请求后台接口， 绑定角色信息
    bindRole: function (data) {
        ulink.http.get({
            url: OUT.site.url + '?route=Role/bindUserInfo',
            params: {
                'iActId': OUT.site.iActId,
                'area': data.area,
                'partition': data.partition,
                'roleId': data.roleId,
                'roleName': encodeURIComponent(data.roleName),
                'game': OUT.site.game
            },
            success: function (result) {
                console.log('bindRole=========>' + JSON.stringify(result));
                if(result.iRet != 0){
                    alertTips(result.sMsg);
                    return;
                }
                checkLogin();
            },
            error: function (e) {
            }
        });
    }
};


var isLogin = false;
var isBindRole = false;

function checkLogin() {
    // 点击领取福利，判断是否有登录态；若无，跳转或者唤起登录
    if(isLogin === false){
        // 未登录, 判断当前是PC 还是移动端
        toLogin();
        return false;
    }
    // 请求数据, 进行领取功能
    ulink.http.get({
        url: OUT.site.url + '?route=User/getReward',
        params: {
            'sAppId': OUT.site.sAppId,
            'game': OUT.site.game,
            'iActId': OUT.site.iActId,
        },
        success: function (result) {
            if (result.iRet == 4001) {
                OUT.role.showBindRoleDialog();
                return false;
            } else if (result.iRet == -1 && result.jData.code == -111) {
                alertTips(result.sMsg);
                return false;
            } else if (result.iRet == 1) { // 领取过了1
                showDialog(DIALOG_ID.HASGET);
                return false;
            }else if (result.iRet == 2) { // 领取失败
                showDialog(DIALOG_ID.FAIL);
                return false;
            }else if (result.iRet == -1 && result.jData.code == -110 && result.jData.sMsg == '活动已经结束！') {
                showDialog(DIALOG_ID.EXPIRED);
                return false;
            } else if (result.iRet != 0){
                showDialog(DIALOG_ID.FAIL);
                return false;
            }
            // 成功了
            showDialog(DIALOG_ID.SUCCESS);

        },
        error: function (e) {
        }
    });
}


function toLogin(){
    if(ulink.isMobile()){
        // 移动端 调用显示QQ / 微信的弹窗
        showDialog(DIALOG_ID.LOGIN);
    }else {
        // PC
        loginByPC();
    }
}

var LoginManager = ulink.LoginManager;
LoginManager.init({
    openLinkUrl: "",
    loginCallback: function(userInfo){
        isLogin = true;
        console.log("登录不刷新页面->", userInfo)
    },
    unloginCallback: function(){
        console.log("登录不刷新页面----->未登录");
    }
});

if((ulink.isWxApp() || ulink.isQQApp()) && ulink.getQueryString("msdkEncodeParam")){
    window.location.href = htmlUrl;
}


LoginManager.checkLogin(function (userInfo) { //检查登录态
    isLogin = 1;

}, function () {
    console.log('checkLogin ==========> 未登录');
    if (ulink.isQQApp()) {
        LoginManager.login();
    } else if (ulink.isWxApp()) {
        LoginManager.loginByWx();
    }
});


/**
 * 拉起手Q登录
 */
function loginByQQ()
{
    LoginManager.openLink(OUT.site.endUrl); // url不传那么url就是当前页面
}

function loginByWx()
{

}

/**
 * PC 端登录
 */
function loginByPC()
{
    LoginManager.loginByWxAndQQ({
        needReloadPage: false
    });
}

