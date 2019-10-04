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
RouteContainer.put(MODULE, routes);
LogicContainer.put(MODULE, logics);
ReducerContainer.put(MODULE, reducers);
