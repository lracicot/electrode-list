import Axios from 'axios';
import Promise from 'bluebird';
/* eslint-disable func-style */
/* eslint-disable max-params */


/* * * * * * * * * * * * * * *
 * Actions
 * * * * * * * * * * * * * * */

export function requestDataStart(url) {
 return {
   type: 'REQUEST_DATA_START',
   url
 };
}

export function requestDataFailure(error) {
  return {
    type: 'REQUEST_DATA_FAILURE',
    error
  };
}

export function requestDataSuccess(data) {
  return {
    type: 'REQUEST_DATA_SUCCESS',
    data
  };
}

/* * * * * * * * * * * * * * *
 * Action creators
 * * * * * * * * * * * * * * */

export function requestData(url, method, sendData, onSuccess, onFailure) {
  return dispatch => {
    try {
      console.log(sendData);
      return new Axios({ method, url, sendData }).then(res => {
        if (res.data.success === false) {
          return dispatch(onFailure(res.data.error));
        }

        return dispatch(onSuccess(res.data));
      });
    } catch (error) {
      return dispatch(onFailure(error));
    }
  }
}

export function getData(url, onSuccess, onFailure = requestDataFailure) {
  return requestData(url, 'get', null, onSuccess, onFailure);
}

export function postData(url, data, onSuccess, onFailure = requestDataFailure) {
  return requestData(url, 'post', data, onSuccess, onFailure);
}

export function deleteData(url, id, onSuccess, onFailure = requestDataFailure) {
  return requestData(url, 'delete', { id }, onSuccess, onFailure);
}

export function putData(url, data, onSuccess, onFailure = requestDataFailure) {
  return requestData(url, 'put', data, onSuccess, onFailure);
}
