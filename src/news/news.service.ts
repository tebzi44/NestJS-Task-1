import { Injectable, NotFoundException } from "@nestjs/common";
import { News } from "./newsEntity/news.entity";
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';


@Injectable()
export class NewsService {
    constructor(@InjectRepository(News) private  newsRepository: Repository<News>) {}

    async getAllNews():Promise<News[]> {
        return await this.newsRepository.find()
    }

    async getMyNews(req: any):Promise<News[]> {
        const { id } = req.user
        const myNews = await this.newsRepository.find({ where: {userId: id}})
        if(!myNews.length) throw new NotFoundException();
        return myNews
    }

    async changeMyNews(req: any, newsId: number, text: string):Promise<News> {
        const userId = req.user.id;
        console.log(userId, newsId, text);
        
        const news = await this.newsRepository.findOneBy({userId, id: newsId})
        if (!news) throw new NotFoundException();
        news.text = text;
        const result = await this.newsRepository.save(news)
        return result;
    }

    async createNews(req: any, text: string):Promise<News> {
        const {id} = req.user

        const newNews = this.newsRepository.create({ text, userId: id})
        return await this.newsRepository.save(newNews)
    }


    // async deleteNews(req: any, id: number) {
    //     const userId = req.user.id;
    //     await this.newsRepository.delete({ id, userId})
    //     return 'delete news!'
    // }
}