function isObject(param) {
    return typeof param === 'object' && param !== null;
}

// 定义一个缓存对象
const toProxy = new WeakMap(); // 保存代理后的对象

/* 返回一个被代理后的结果，通过操作这个结果可以来实现响应式, 例如视图更新 */
function reactive(target) {
    // 如果是个对象，则返回被代理后的结果，如果不是则直接返回
    if (!isObject(target)) {
        return target;
    }

    // 是否存在缓存
    const targetCatch = toProxy.get(target);
    if (targetCatch) {
        return targetCatch;
    }

    const handler = {
        get(target, key, receiver) {
            const proxyTarget = Reflect.get(target, key, receiver); // 相当于 return target[key]
            // 递归处理子集
            if (isObject(target[key])) {
                return reactive(proxyTarget);
            }

            return proxyTarget;
        },
        set(target, key, value, receiver) {
            // 只对私有属性的修改动作触发视图更新
            if (!target.hasOwnProperty(key)) {
                // trigger();
            }
            return Reflect.set(target, key, value, receiver); // 相当于 target[key] = value
        }
    };

    // 利用 Proxy 来代理这个对象属性
    let observed = new Proxy(target, handler);

    toProxy.set(target, observed); // 保存已代理的对象

    return observed;
}

// // 提示视图需要更新
// function trigger() {
//     console.log('视图需要更新');
// }


const state = reactive({
    type: '',
    data: {}
});

const _event = new CustomEvent('__customEvent', { detail: state });

/** 3D模型传入H5数据，触发H5更新state */
function sendDataToH5({ type, ...data } = {}) {
    state.type = type;
    state.data = data;
    window.dispatchEvent(_event);
}


// //发起游戏邀请
// var invertata = { type: 1001, invite_user_id: invite_user_id, send_nick_name: nickname };
// h5Inteaction.sendDataToH5(invertata);

// //h5处理返回
// if (data.type == 1001) {
//     sendDataToPlaycanvas({ type: 1002, invite_user_id: data.invite_user_id });
// }

// //被邀请进行小游戏：notice弹窗，带按钮
// var invertata = { type: 2001, send_user_id: data.Data.send_user_id, send_nick_name: data.Data.send_nick_name };
// h5Inteaction.sendDataToH5(invertata);

// //h5处理返回
// if (data.type == 2001) {
//     sendDataToPlaycanvas({ type: 2002, invite_user_id: data.send_user_id, status: 0 });//0是同意，1是不同意
// }

// //发起小游戏不成功：notice。发起失败
// var result = { type: 1004，msg : "具体文案" };
// h5Inteaction.sendDataToH5(result);

// //邀请结果
// var result = { type: 1003, result: data.Data.result_status };
// h5Inteaction.sendDataToH5(result); // 0：自动进入小游戏界面，1：拒绝（notice）。

// //小游戏结算：暂时：勋章新增提示
// var scoreData = {type: 1005, score_my: data.Data.score_my, score_another: data.Data.score_another, time_my: 15, time_another: 15,result:win/fail/peace};
// h5Inteaction.sendDataToH5(scoreData);


// 拍照:
// { type: 1006, user_id: data.send_user_id, role_type:string}

// 设置界面：
// { type: 1007, user_id: 1001, background_mp3_status: true/false， nick_name_status:true/false, invite_status:true/false}

// 倒计时和等分：

// { type: 1008, user_id:1001, gametime: 20, gamescore:5}

// 通知返回：
// { type: 1009,  user_id:1001 }

// 发言，通知3d
// ｛type:1010，user_id:string,message:"世界就在这一杯！"｝


// 用户互动：
// ｛type:3003，user_id:string｝  有风险

// 打call结果已出：
// ｛type:1011，user_id:string｝

// 进入二楼互动区
// ｛type:1012，user_id:string｝

// 捡金币
// ｛type:1013，user_id:string，count：1｝


window.sendDataToH5 = sendDataToH5;
// sendDataToH5('battle', { a: 1 })
