
// userToken = argument 1 qui réccupère la valeur initiale dans le store; "" = valeur vide
// action = argument 2 qui réccupère l'action fournit dans le conteneur/dispatch
export default function (userToken = "", action) {
    if (action.type === "saveUserToken") {
        return action.userToken

    } else if (action.type === "registerToken") {
        return action.userToken
        
    } else {
        return userToken;
    }
}