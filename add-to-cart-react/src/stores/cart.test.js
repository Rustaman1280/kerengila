describe('cart persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  test('starts with an empty cart when saved JSON is corrupt', () => {
    localStorage.setItem('carts', '{invalid');

    const cartReducer = require('./cart').default;

    expect(cartReducer(undefined, { type: 'test/init' }).items).toEqual([]);
  });

  test('restores cart items from valid saved JSON', () => {
    const savedItems = [{ productId: 1, quantity: 2 }];
    localStorage.setItem('carts', JSON.stringify(savedItems));

    const cartReducer = require('./cart').default;

    expect(cartReducer(undefined, { type: 'test/init' }).items).toEqual(savedItems);
  });
});
