import axios from 'axios'

export const login = async (params) => {
  const res = await axios({
    method: 'post',
    url: process.env.REACT_APP_API_ENDPOINT + '/login',
    data: params,
  }).then((response) => response)
  return res.data
}
