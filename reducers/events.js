export default function (tableId = "", action) {

  // ordre donné par la CreateScreen
  if (action.type === "registerTableId") {
    return action.tableId
    
  } else {
    return tableId
  }
}