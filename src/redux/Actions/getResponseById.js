import axios from "axios";
export const GET_RES_ID = "GET_RES_ID";

export const getResponseById = (id) => {
  return async (dispatch) => {
   //let info = await axios.get(`http://localhost:3001/response/${id}`);
    //let info = await axios.get(`https://formserver-t5jb.onrender.com/response/${id}`);
    let info = await axios.get(`https://easyformserver.onrender.com/response/${id}`);
     
    return dispatch({ type: GET_RES_ID, payload: info.data });
  };
};
