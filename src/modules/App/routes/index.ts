import Home from "@modules/App/components/Home";
import Page1 from "@modules/App/components/Page1";
import Page2 from "@modules/App/components/Page2";

export default [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/page1",
        exact: true,
        component: Page1
    },
    {
        path: "/page2",
        exact: true,
        component: Page2
    },
];