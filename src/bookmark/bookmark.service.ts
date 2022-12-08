import { Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService){}
  async create(createBookmarkDto: BookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
          title: createBookmarkDto.title,
          link: createBookmarkDto.link,
          userId: createBookmarkDto.userId
      }
  })

  return bookmark;
  }

  async findAll() {
    const bookmarks = await this.prisma.bookmark.findMany();
  
  return bookmarks;
  }

  async findOne(id: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: id,
      }
  });
  
  return bookmark;
  }

  async update(id: number, updateBookmarkDto: BookmarkDto) {
    const bookmark = await this.prisma.bookmark.update({
      where: {
        id: id,
      },
      data: {
        title: updateBookmarkDto.title,
        link: updateBookmarkDto.link,
        userId: updateBookmarkDto.userId
      }
  });
  
  return bookmark;
  }

  async remove(id: number) {
    const bookmark = await this.prisma.bookmark.delete({
      where: {
        id: id,
      },
  });
  
  return bookmark;
  }
}
