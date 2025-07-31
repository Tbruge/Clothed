import axios from "axios";
import env from '@/env.js';
import {useStore} from 'vuex'
import {computed} from 'vue'


const projectId = env.VITE_CHAT_ENGINE_PROJECT_ID;
const privateKey = env.VITE_CHAT_ENGINE_PRIVATE_KEY;
const store = useStore();
const user_id = computed(()=> store.state.userDataMessage?.id)

const loginRest = async (username, secret) => {
  return await axios.get("https://api.chatengine.io/users/me/", {
    headers: {
      "Project-ID": projectId,
      "User-Name": username,
      "User-Secret": secret,
    },
  });
};


const signupRest = async (username, secret, email, first_name, last_name) => {
  return await axios.post(
    "https://api.chatengine.io/users/",
    { username, secret, email, first_name, last_name },
    { headers: { "Private-Key": privateKey} }
  );
};

const modifyRest = async (username , secret, first_name ) => {
  return await axios.patch(`https://api.chatengine.io/users/me/`, {
    username , secret , first_name },
    {
      headers: {
        "Project-ID": projectId,
        "User-Name": username,
        "User-Secret": secret,
      }
  });
  
}

export { loginRest, signupRest , modifyRest };

