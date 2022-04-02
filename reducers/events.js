export default function (tableId = "", action) {

  //ordre donné par la HomeScreen
  if (action.type === "saveTableId") {
    return action.tableId

  // ordre donné par la CreateScreen
  } else if (action.type === "registerTableId") {
    return action.tableId
    
  } else {
    return tableId
  }
}