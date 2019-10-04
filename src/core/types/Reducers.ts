import Action from "./Action";
import State from "./State";

export default interface Reducers {
    [ket: string]: (state: State, a: Action) => object
}
