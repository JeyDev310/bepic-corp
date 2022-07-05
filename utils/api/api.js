import axios from 'axios'
import store from 'epics/store'

const baseUrl=`${process.env.NEXT_PUBLIC_API_SERVER}/api/corporate/`

const callApi = (method, path, data, doneCallback, failCallback) => {
  let options = {
    'Access-Control-Allow-Origin': '*',
  }
  let axiosCall
  if (method === 'POST') {
    axiosCall = axios.post(`${baseUrl}${path}`, data, options)
} else if (method === 'GET') {
    axiosCall = axios.get(`${baseUrl}${path}`, options)
  } else if (method === 'PUT') {
    axiosCall = axios.put(`${baseUrl}${path}`, data, options)
  }
  axiosCall
    .then((res) => {
      if (doneCallback) doneCallback(res.data)
    })
    .catch((err) => {
      let errorMessage = 'Network error.'
      if (err.response) {
        errorMessage = err.response.data.message
      }
      if (failCallback) failCallback(errorMessage)
    })
}

export const callGetApi = (path, doneCallback, failCallback) => {
  callApi('GET', path, undefined, doneCallback, failCallback)
}

export const callPostApi = (path, data, doneCallback, failCallback) => {
  callApi('POST', path, data, doneCallback, failCallback)
}
