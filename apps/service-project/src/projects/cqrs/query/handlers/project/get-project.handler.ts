import { mongoParser } from '@juicycleff/repo-orm';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Project, ReadProjectResponse } from '@ssc/proto-schema/project';
import { ProjectRepository } from '@ssc/repository';

import { GetProjectQuery } from '../../impl';

@QueryHandler(GetProjectQuery)
export class GetProjectHandler implements IQueryHandler<GetProjectQuery> {
  logger = new Logger(this.constructor.name);
  projectRepository: ProjectRepository;

  async execute(query: GetProjectQuery): Promise<ReadProjectResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${query.constructor.name}...`);
    const { input, projectRepository } = query;
    this.projectRepository = projectRepository;

    if (!input.filter) {
      throw new RpcException('Missing space where input');
    }

    try {
      const where = JSON.parse(input.filter);
      const filter = mongoParser(where);
      const project = await this.projectRepository.findOne({ ...filter });

      return {
        project: (project as unknown) as Project,
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}
