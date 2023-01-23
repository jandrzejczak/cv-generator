import { reactive, readonly } from "vue";
import { UserType } from "../types/userTypes";

let loggedUser = reactive({
  firstname: "",
  lastname: "",
  email: "",
  token: "",
  avatar: "",
} as UserType);

export default {
  loggedUser: readonly(loggedUser),
  actions: {
    setUser(user: UserType) {
      loggedUser.firstname = user.firstname;
      loggedUser.lastname = user.lastname;
      loggedUser.email = user.email;
      loggedUser.token = user.token;
      loggedUser.avatar = user.avatar;
    },
    setUserSingleProperty(key: string, value: string) {
      loggedUser[key as keyof UserType] = value;
    },
    clearUser(user: UserType) {
      loggedUser.firstname = user.firstname;
      loggedUser.lastname = user.lastname;
      loggedUser.email = user.email;
      loggedUser.token = user.token;
      loggedUser.avatar = user.avatar;
    },
  },
};
