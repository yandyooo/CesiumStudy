import { Component} from 'react';
import { Routers, RoutersLogin } from './router/routes';
import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';

class App extends Component {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
        super(props)
    }

    render() {

        return (
          <>
            <>
                <Router>
                    <Switch>
                        {Routers.map((item, index) => {
                            return <Route key={index} path={item.path} exact render={props =>
                            (item.isAuth ? (<item.component {...props} />)  : <Redirect to={{
                                pathname: RoutersLogin.path,
                                // pathname: RoutersOS.path,
                                // pathname: RoutersOSPMD.path,
                                state: { from: props.location }
                            }} />
                            )} />
                        })}
                    </Switch>
                </Router>
            </>
      </>

        )
    }
}

export default App;

