import lrcFetch from '../../src/utils/lrcfetch/lrclib';
test('lrclib lrc', async () => {
  const content = await lrcFetch.getLrcOptions('wake');
  expect(content[0].label.includes('Wake')).toBe(true);
}, 33333);
