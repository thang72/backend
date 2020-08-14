import { mongoParser } from '@juicycleff/repo-orm';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { FindProjectsResponse, Project } from '@ssc/proto-schema/project';
import { ProjectRepository } from '@ssc/repository';

import { GetProjectsQuery } from '../../impl';

@QueryHandler(GetProjectsQuery)
export class GetProjectsHandler implements IQueryHandler<GetProjectsQuery> {
  logger = new Logger(this.constructor.name);
  projectRepository: ProjectRepository;

  async execute(query: GetProjectsQuery): Promise<FindProjectsResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${query.constructor.name}...`);
    const { input, projectRepository } = query;
    this.projectRepository = projectRepository;

    try {
      if (input.filter) {
        const where = JSON.parse(input.filter);
        const filter = mongoParser(where);
        const projectFil = await this.projectRepository.find({
          conditions: { ...filter },
          limit: input.paginate?.limit || 100,
          skip: input.paginate?.skip || 0,
        });

        return {
          projects: (projectFil as unknown) as Project[],
        };
      }

      const projects = await this.projectRepository.find();
      return {
        projects: (projects as unknown) as Project[],
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}
