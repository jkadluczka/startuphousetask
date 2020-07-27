const { getCorrectDateFormat } = require('../main');
import './styles/main.css';

test('getting correct Date format', () => {

  expect(getCorrectDateFormat(new Date('2011/11/30'))).toBe('2011-11-30');
});
