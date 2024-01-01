import { Test, TestingModule } from '@nestjs/testing';
import { QuizCreatorsController } from './quiz-creators.controller';
import { QuizCreatorsService } from './quiz-creators.service';

describe('QuizCreatorsController', () => {
  let controller: QuizCreatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizCreatorsController],
      providers: [QuizCreatorsService],
    }).compile();

    controller = module.get<QuizCreatorsController>(QuizCreatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
