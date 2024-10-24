import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5050/',
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    timeout: 1000,
  });

  export const addAccessToken = (token) => {
    console.log(token)
    localStorage.setItem('token', token)
  }

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMzcwODEzNy05NmIyLTQxODMtYTUyOC1hMmVkYWFhNDI2MDMiLCJpYXQiOjE3Mjk3Njk0MjIsImV4cCI6MTcyOTg1NTgyMn0.UunyHkNdxjbQr3WDKF21l2VR9txCt16TqaTaG3jPl4s"

  instance.defaults.headers.common['Authorization'] = token;

const Api = {
    get : async(url,params)=>{
        try {
            const response = await instance.get(url, { params });
            return response.data;
        }catch (error) {
            return error
        }
    },
    post : async(url,data,params)=>{
        try {
            const response = await instance.post(url,data, { params });
            return response.data;
        }catch (error) {
            return error
        }
    },
    put : async(url,data,params)=>{
        try {
            const response = await instance.put(url,data, { params });
            return response.data;
        }catch (error) {
            return error
        }
    },
    delete : async(url,data,params)=>{
        try {
            const response = await instance.delete(url,{ params });
            return response.data;
        }catch (error) {
            return error
        }
    }
}

export default Api