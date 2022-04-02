export default function (conversation = "", action) {
  if (action.type === "saveConversationId") {
    return action.conversationId

  } else {
    return conversation;
  }
}