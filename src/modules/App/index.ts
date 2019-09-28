import RouteContainer from "@core/containers/RouteContainer";
import LogicContainer from "@core/containers/LogicContainer";
import ReducerContainer from "@core/containers/ReducerContainer";
//
import routes from './routes/index';
import reducers from './reducers/index';
import logics from './logics/index';
//
export const MODULE = 'app';
//

export default () => {
    RouteContainer.new.put(MODULE, routes);
    LogicContainer.new.put(MODULE, logics);
    ReducerContainer.new.put(MODULE, reducers);
};
