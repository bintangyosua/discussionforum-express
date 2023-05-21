"use strict";
exports.__esModule = true;
exports.convertReplyToJson = exports.buildReplyTree = void 0;
function buildReplyTree(replies) {
  var replyMap = {};
  var replyTree = [];
  replies.forEach(function (reply) {
    reply.children = [];
    replyMap[reply.reply_id] = reply;
  });
  replies.forEach(function (reply) {
    if (reply.parent_reply_id !== null) {
      var parentReply = replyMap[reply.parent_reply_id];
      if (parentReply && parentReply.children) {
        parentReply.children.push(reply);
      }
    } else {
      replyTree.push(reply);
    }
  });
  return replyTree;
}
exports.buildReplyTree = buildReplyTree;
function convertReplyToJson(reply) {
  var replyJson = {
    reply_id: reply.reply_id,
    reply_content: reply.reply_content,
    id_user: reply.id_user,
    parent_reply_id: reply.parent_reply_id,
    post_id: reply.thread_id,
  };
  return replyJson;
}
exports.convertReplyToJson = convertReplyToJson;
// const repliesFromDB: Reply[] = [];
// const replyTree = buildReplyTree(repliesFromDB);
// const replyJson = replyTree.map((reply) => convertReplyToJson(reply));
// console.log(JSON.stringify(replyJson));
