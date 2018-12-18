/* eslint-disable camelcase */
import {
  put, take, call,
} from 'redux-saga/effects';
import { get, post } from '../fetch/fetch';
import { actionsTypes as IndexActionTypes } from '../reducers';

// eslint-disable-next-line
export function* login(username, password) {
  yield put({ type: IndexActionTypes.FETCH_START });
  try {
    return yield call(post, '/user/login', { username, password });
  } catch (error) {
    yield put({ type: IndexActionTypes.SET_MESSAGE, msgContent: '用户名或密码错误', msgType: 0 });
  } finally {
    yield put({ type: IndexActionTypes.FETCH_END });
  }
}
// eslint-disable-next-line
export function* register(data) {
  yield put({ type: IndexActionTypes.FETCH_START });
  try {
    return yield call(post, '/user/register', data);
  } catch (error) {
    yield put({ type: IndexActionTypes.SET_MESSAGE, msgContent: '注册失败', msgType: 0 });
  } finally {
    yield put({ type: IndexActionTypes.FETCH_END });
  }
}

export function* loginFlow() {
  while (true) {
    const request = yield take(IndexActionTypes.USER_LOGIN);
    const response = yield call(login, request.username, request.password);
    if (response && response.code === 0) {
      yield put({ type: IndexActionTypes.SET_MESSAGE, msgContent: '登录成功!', msgType: 1 });
      yield put({ type: IndexActionTypes.RESPONSE_USER_INFO, data: response.data });
    }
  }
}

export function* registerFlow() {
  while (true) {
    const request = yield take(IndexActionTypes.USER_REGISTER);
    const response = yield call(register, request.data);
    if (response && response.code === 0) {
      yield put({ type: IndexActionTypes.SET_MESSAGE, msgContent: '注册成功!', msgType: 1 });
      yield put({ type: IndexActionTypes.RESPONSE_USER_INFO, data: response.data });
    }
  }
}

export function* user_auth() {
  while (true) {
    yield take(IndexActionTypes.USER_AUTH);
    try {
      yield put({ type: IndexActionTypes.FETCH_START });
      const response = yield call(get, '/user/userInfo');
      if (response && response.code === 0) {
        yield put({ type: IndexActionTypes.RESPONSE_USER_INFO, data: response.data });
      }
    } catch (err) {
      console.log(err);
    } finally {
      yield put({ type: IndexActionTypes.FETCH_END });
    }
  }
}

export function* user_logout() {
  while (true) {
    const request = yield take(IndexActionTypes.USER_LOGOUT);
    const response = yield call(get, '/user/logout');
    console.log('request response', request, response);
    if (response && response.code === 0) {
      yield put({ type: IndexActionTypes.SET_MESSAGE, msgContent: '成功退出登录', msgType: 1 });
      yield put({ type: IndexActionTypes.RESPONSE_USER_INFO, data: response.data });
    }
  }
}
