import axios from "axios";

export const signupapihit = async (name, email, password, role, institution) => {
    console.log(name);
   const res = await axios.post('/auth/signup', {name, email, password, role, institution},{
      withCredentials: true
   });
   if(res.status === 409){
      throw new Error("user already exists");
   }
   return res.data;
}


export const loginapihit = async (email, password, role) => {
   const res = await axios.post('/auth/login', {email, password},{
      withCredentials:true
   });
   if(res.status !== 200){
        throw new Error("Unable to login");
   }
   const data = res.data;
   return data;
}

export const verifyapihit = async () => {
   const data = await axios.get('/auth/authverify', {
      withCredentials: true
   });
   if(data.status !== 200){
      throw new Error("Need to login again");
   }
   return data.data;
}

export const logoutapihit = async () => {
    const data = await axios.get('/auth/logout', {
        withCredentials: true
    });
    if(data.status !== 200){
        throw new Error("Unable to logout");
    }
    return data.data;
}