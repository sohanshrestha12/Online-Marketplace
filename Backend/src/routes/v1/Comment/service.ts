import { addCommentToProduct } from "../Product/repository";
import { Comment } from "./model";
import { createComment } from "./repository";

export const CommentsService = {
  async createComment(data: Comment, productId: string) {
    const comment = await createComment(data);
    const updatedComment =await addCommentToProduct(productId, comment._id);
    return{comment,updatedComment}
  },
}
export default CommentsService;