// @ts-ignore
import {Action as A} from "redux";

export default interface Action extends A {
    [key: string]: any
};