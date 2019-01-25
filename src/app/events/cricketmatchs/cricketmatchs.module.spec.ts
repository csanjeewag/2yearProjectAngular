import { CricketmatchsModule } from './cricketmatchs.module';

describe('CricketmatchsModule', () => {
  let cricketmatchsModule: CricketmatchsModule;

  beforeEach(() => {
    cricketmatchsModule = new CricketmatchsModule();
  });

  it('should create an instance', () => {
    expect(cricketmatchsModule).toBeTruthy();
  });
});
