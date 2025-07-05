import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
console.log("Loaded Base URL =>", axios.defaults.baseURL); 

export default function useFetch(query){
  const [getData, setData] =   useState({ isLoading : false, apiData: undefined, status : null, serverError:null});

  useEffect(()=>{

    if(!query) return;

    const fetachData = async () =>{
        try {
            setData(prev =>({ ...prev, isLoading: true}));

            const {data, status} = await axios.get(`/api/${query}`);

            if(status ===201 || status ===200){
                setData(prev => ({
                    ...prev,
                    isLoading: false,
                    apiData: data,
                    status
                  }));
            }
        } catch (error) {
            setData(prev =>({ ...prev, isLoading: false, serverError: error}))
        }
    };
    fetachData()
  },[query])

  return [getData, setData];
}