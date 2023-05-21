export default interface Reply {
  reply_id: number;
  reply_content: string;
  thread_id: number;
  id_user: string;
  parent_reply_id: number | null;
  children?: [];
}
