import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
console.log("Loaded Base URL =>", axios.defaults.baseURL); 

export default function useFetch(query){
  const [getData, setData] =   useState({ isLoading : false, apiData: undefined, status : null, serverError:null});

  useEffect(()=>{

    const fetachData = async () =>{
        try {
            setData(prev =>({ ...prev, isLoading: true}));

            const {data, status} = !query ? await axios.get(`api/user/${username}`) : await axios.get(`/api/${query}`);

            const {username} = !query? await getUsername() : '';

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