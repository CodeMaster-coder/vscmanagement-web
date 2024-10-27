import axios from 'axios'
import { baseUrl } from '../config'

const request = axios.create({
    baseURL:baseUrl,
    headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000
})

export default request;