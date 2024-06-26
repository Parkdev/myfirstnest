import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentCreateDto } from '../dtos/comments.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from '../comments.schema';
import { CatsRepository } from 'src/cats/cats.repository';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('An unexpected error occurred.');
      }
    }
  }

  async createComment(id: string, commentData: CommentCreateDto) {
    try {
      const targetCat =
        await this.catsRepository.findCatByIdWithoutPassword(id);
      const { contents, author } = commentData;
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);
      const newComment = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('An unexpected error occurred.');
      }
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {}
  }
}
