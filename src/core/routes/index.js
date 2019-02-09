import * as Enum from './enum';

/**
 * @returns {Array}
 */
export default function() {
    return [
        {
            name: 'App',
            path: Enum.BASE_ROOT,
            exact: true,
            component: () => {},
            routes: [
                {
                    name: 'Home',
                    path: Enum.BASE_ROOT,
                    component: () => {},
                }
            ]
        },
    ];
}