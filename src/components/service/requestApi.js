import { LOCAL_STORAGE } from '../constant/localStorage'
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 5000,
})

instance.interceptors.request.use(
  (configs) => {
    const tokenAccess = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
    if (tokenAccess) {
      configs.headers['Authorization'] = `Bearer ${tokenAccess}`
    }
    return configs
  },
  (error) => {
    Promise.reject(error)
  },
)

instance.interceptors.response.use((configs) => {
  return configs
}),
  () => {
    return Promise.reject(error)
  }

const get = async (url, params = {}) => {
  try {
    const config = { params }
    const response = await instance.get(url, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const post = async (url, data = {}, headers) => {
  try {
    const response = await instance.post(url, data, headers)
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}

const put = async (url, data = {}, headers) => {
  try {
    const response = await instance.put(url, data, headers)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const patch = async (url, data = {}) => {
  try {
    const response = await instance.patch(url, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const del = async (url, data = {}) => {
  try {
    const response = await instance.delete(url, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export { get, post, put, patch, del }
