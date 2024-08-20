import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    const post = await this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async updatePost(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    await this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOneBy({ id });
  }
}