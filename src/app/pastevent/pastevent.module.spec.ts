import { PasteventModule } from './pastevent.module';

describe('PasteventModule', () => {
  let pasteventModule: PasteventModule;

  beforeEach(() => {
    pasteventModule = new PasteventModule();
  });

  it('should create an instance', () => {
    expect(pasteventModule).toBeTruthy();
  });
});
