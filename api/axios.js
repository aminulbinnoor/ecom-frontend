import axios from "axios"
import Cookie from 'cookie-universal'

const cookies = Cookie()

const http1 = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/v1/admin',
  baseURL: 'https://api.p2p.com.bd/api/v1/admin',
  timeout: 0,
  maxRedirects: 10,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Accept': 'application/json, text/plain',
    'Jwt': cookies.get('jwt_token'),
    'Authorization': 'Bearer VCVRb99R4cCSw00Kv500HIKNIktDtKNTk5GkfNvF4rs'
  }
});

const http2 = axios.create({
  baseURL: '',
  headers: {}
});


const http3 = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Authorization': 'bearer ',
  }
});

export {
  http1,
  http2,
  http3
};
