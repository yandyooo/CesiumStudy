import { Home} from '../view/home/Home';

export const RoutersLogin = {
    path: '/login',
    component: Home,
};

export const Routers = [
    {
        path: '/',
        name: '/',
        component: Home,
        isAuth: true,
    }
];
