import { Test, TestingModule } from '@nestjs/testing';
import { QuizCreatorsService } from './quiz-creators.service';

describe('QuizCreatorsService', () => {
  let service: QuizCreatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizCreatorsService],
    }).compile();

    service = module.get<QuizCreatorsService>(QuizCreatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
