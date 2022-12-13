import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product("iPhone",200,"Good","1.jpg",1)).toBeTruthy();
  });
});
