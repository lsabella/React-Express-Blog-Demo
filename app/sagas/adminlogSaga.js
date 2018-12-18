import {take,put,call} from 'redux-saga/effects'
import {get,post} from '../fetch/fetch'
import {actionTypes as IndexActionTypes} from '../reducers'
import {actionTypes as AdminLogActionTypes} from '../reducers/adminlog'

export function* getArticleList (tag,pageNum) {
    try {
        return yield call(get, `/getArticles?pageNum=${pageNum}&isPublish=true&tag=${tag}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        // yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* creatLogs () {
    while(true){
        let req = yield take(AdminLogActionTypes.CREATE_LOG_OPERATE);
        let res = yield call(getArticleList,'JavaScript',req.pageNum);
        if(res){
            if(res.code === 0){
                console.log(res.data.total,'res res res res')
                yield put({type: AdminLogActionTypes.CREATE_LOG_RESPONSE,data: res.data})
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }

    }
}

export function* addLogs () {
    while(true){
        let req = yield take(AdminLogActionTypes.ADD_LOG_NOTE);
        let res = yield call(getArticleList,req.tag,req.pageNum);
        if(res){
            if(res.code === 0){
                yield put({type: AdminLogActionTypes.ADD_LOG_NOTE_RESPONSE,data: res.data})
                console.log('tag', res)
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}