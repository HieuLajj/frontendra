import { IMenu, IPackage, TOKEN } from "../_types_";

export const packages: IPackage[] = [
  {
    key: 'bnb-01',
    name: 'COPPER PACKAGE',
    amount: 1000,
    bg: 'PolygonBG.png',
    icon: 'logopolygon.png',
    token: TOKEN.BNB,
  },
  {
    key: 'bnb-02',
    name: 'SILVER PACKAGE',
    amount: 2000,
    bg: 'PolygonBG.png',
    icon: 'logopolygon.png',
    token: TOKEN.BNB,
  },
  {
    key: 'bnb-03',
    name: 'GOLD PACKAGE',
    amount: 3000,
    bg: 'PolygonBG.png',
    icon: 'logopolygon.png',
    token: TOKEN.BNB,
  },
  {
    key: 'usdt-01',
    name: 'COPPER PACKAGE',
    amount: 1,
    bg: 'usdt-bg.png',
    icon: 'usdt.png',
    token: TOKEN.USDT,
  },
  {
    key: 'usdt-02',
    name: 'SILVER PACKAGE',
    amount: 2,
    bg: 'usdt-bg.png',
    icon: 'usdt.png',
    token: TOKEN.USDT,
  },
  {
    key: 'usdt-03',
    name: 'GOLD PACKAGE',
    amount: 3,
    bg: 'usdt-bg.png',
    icon: 'usdt.png',
    token: TOKEN.USDT,
  }
]

export const menus: IMenu[] = [
  {name: 'Invest', url: '/'},
  {name: 'Market', url: '/market'},
  {name: 'Auction', url: '/auction'},
]