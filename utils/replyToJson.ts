export interface Reply {
  reply_id: number;
  reply_content: string;
  thread_id: number;
  id_user: string;
  parent_reply_id: number | null;
  children?: Reply[];
}

export function buildReplyTree(replies: Reply[]): Reply[] {
  const replyMap: Record<number, Reply> = {};
  const replyTree: Reply[] = [];

  replies.forEach((reply) => {
    reply.children = [];
    replyMap[reply.reply_id] = reply;
  });

  replies.forEach((reply) => {
    if (reply.parent_reply_id !== null) {
      const parentReply = replyMap[reply.parent_reply_id];
      if (parentReply && parentReply.children) {
        parentReply.children.push(reply);
      }
    } else {
      replyTree.push(reply);
    }
  });

  return replyTree;
}

export function convertReplyToJson(reply: Reply): Record<string, any> {
  const replyJson: Record<string, any> = {
    reply_id: reply.reply_id,
    reply_content: reply.reply_content,
    id_user: reply.id_user,
    parent_reply_id: reply.parent_reply_id,
    post_id: reply.thread_id,
  };

  return replyJson;
}

// const repliesFromDB: Reply[] = [];

// const replyTree = buildReplyTree(repliesFromDB);
// const replyJson = replyTree.map((reply) => convertReplyToJson(reply));

// console.log(JSON.stringify(replyJson));
