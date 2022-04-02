
// userToken = argument 1 qui réccupère la valeur initiale dans le store; "" = valeur vide
// action = argument 2 qui réccupère l'action fournit dans le conteneur/dispatch
export default function (userToken = "", action) {

  // ordre donné par la LoginScreen
    if (action.type === "saveUserToken") {
      return action.userToken

    // ordre donné par la RegisterScreen
    } else if (action.type === "registerToken") {
      return action.userToken

    } else {
      return userToken;
    }
}