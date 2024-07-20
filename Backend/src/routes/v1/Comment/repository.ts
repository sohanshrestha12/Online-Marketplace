import { Comment, CommentDocument, CommentModel } from "./model";

export const createComment = (data: Comment): Promise<CommentDocument> => {
  const comment = new CommentModel(data);
  return comment.save();
};
