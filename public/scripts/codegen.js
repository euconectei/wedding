function codegen(size, uppers, numbers, symbols) {
  var wLower = 'abcdefghijkmnpqrstuvwxyz'; // removido L, O
  var wUpper = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // removido I, O
  var num = '23456789'; // removido 0, 1
  var symb = '!@#$%*-';
  var ret = '';
  var chars = '';

  size = size || 8;
  uppers = uppers || true;
  numbers = numbers || true;
  symbols = symbols || true;

  chars += wLower;
  if (uppers) chars += wUpper;
  if (numbers) chars += num;
  if (symbols) chars += symb;

  for (var i = 0; i < size; i++) {
    var wRand = randomize(1, chars.length);
    ret += chars[wRand];
  }

  return ret;

  function randomize(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }
}