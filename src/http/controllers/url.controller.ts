import { CreateUrl } from '@app/use-cases/urls/create-url';
import { DeleteExpiredUrls } from '@app/use-cases/urls/delete-expired-urls';
import { GetUrlById } from '@app/use-cases/urls/get-url-by-id';
import { prismaUrlsRepository } from '@database/repositories/prisma/prisma-urls.repository';
import { HttpCode } from '@exceptions/application-exception';
import { CreateUrlDTO } from '@http/dtos/url/create-url.dto';
import { FindUrlByIdDTO } from '@http/dtos/url/find-url-by-id.dto';
import { UrlViewModel } from '@http/view-models/url.view-model';
import dayjs from 'dayjs';
import { Request, Response } from 'express';

export class UrlController {
  async findById(req: Request, res: Response) {
    const { id } = FindUrlByIdDTO.parse(req.params);

    const getUrlById = new GetUrlById(prismaUrlsRepository);

    const { url } = await getUrlById.execute({ id });

    res.status(HttpCode.OK).json(UrlViewModel.toHTTP(url));
  }

  async store(req: Request, res: Response) {
    const { url: originalUrl } = CreateUrlDTO.parse(req.body);
    const { userId } = req;

    const createUrl = new CreateUrl(prismaUrlsRepository);

    const { url } = await createUrl.execute({ userId, originalUrl });

    res.status(HttpCode.CREATED).json(UrlViewModel.toHTTP(url));
  }

  async deleteExpiredUrls() {
    const deleteUrls = new DeleteExpiredUrls(prismaUrlsRepository);

    const { count } = await deleteUrls.execute();
    console.log(
      `[delete-expired-urls] ${dayjs().format(
        'DD/MM/YYYY - HH:mm:ss'
      )} - ${count} expired urls deleted.`
    );
  }
}

export const urlController = new UrlController();
