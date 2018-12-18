import { fork } from 'redux-saga/effects';
import {
  // eslint-disable-next-line camelcase
  loginFlow, registerFlow, user_auth, user_logout,
} from './homeSaga';
// eslint-disable-next-line camelcase
import { get_all_users_flow } from './adminManagerUsersSaga';
import { getAllTagsFlow, addTagFlow, delTagFlow } from './adminManagerTagsSaga';
import { saveArticleFlow } from './adminManagerNewArticleSaga';
import { getArticleListFlow, deleteArticleFlow, editArticleFlow } from './adminManagerArticleSaga';
import { getArticlesListFlow, getArticleDetailFlow } from './frontSaga';
import { creatLogs, addLogs } from './adminlogSaga';

export default function* rootSaga() {
  yield fork(loginFlow);
  yield fork(registerFlow);
  yield fork(user_auth);
  yield fork(user_logout);
  yield fork(get_all_users_flow);
  yield fork(getAllTagsFlow);
  yield fork(addTagFlow);
  yield fork(delTagFlow);
  yield fork(saveArticleFlow);
  yield fork(getArticleListFlow);
  yield fork(deleteArticleFlow);
  yield fork(getArticlesListFlow);
  yield fork(getArticleDetailFlow);
  yield fork(editArticleFlow);
  yield fork(creatLogs);
  yield fork(addLogs);
}
