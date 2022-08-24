import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Khoá học pha chế 1',
  'Khoá học pha chế 2',
  'Khoá học pha chế 3',
  'Khoá học pha chế 4',
  'Khoá học pha chế 5',
  'Khoá học pha chế 6',
  // 'Nike Air Max Zephyr',
  // 'Jordan Delta',
  // 'Air Jordan XXXV PF',
  // 'Nike Waffle Racer Crater',
  // 'Kyrie 7 EP Sisterhood',
  // 'Nike Air Zoom BB NXT',
  // 'Nike Air Force 1 07 LX',
  // 'Nike Air Force 1 Shadow SE',
  // 'Nike Air Zoom Tempo NEXT%',
  // 'Nike DBreak-Type',
  // 'Nike Air Max Up',
  // 'Nike Air Max 270 React ENG',
  // 'NikeCourt Royale',
  // 'Nike Air Zoom Pegasus 37 Premium',
  // 'Nike Air Zoom SuperRep',
  // 'NikeCourt Royale',
  // 'Nike React Art3mis',
  // 'Nike React Infinity Run Flyknit A.I.R. Chaz Bear',
];
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------

const products = [...Array(PRODUCT_NAME.length)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `https://nauphache.com/wp-content/uploads/2022/05/z3457434562355_ccd47b1a635596f40353f471cac25ea8.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', '']),
  };
});

export default products;
