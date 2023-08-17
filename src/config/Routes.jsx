import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail';
import MovieWatch from '../pages/MovieWatch';
import Search from '../pages/Search'; // Import the Search component

const Routes = () => {
    return (
        <Switch>
            {/* Update the /:category/search/:keyword route */}
            <Route path='/search/:keyword'>
                <Search />
            </Route>
            <Route path='/:category/:id/watch'>
                <MovieWatch />
            </Route>
            <Route path='/:category/:id'>
                <Detail />
            </Route>
            <Route path='/:category'>
                <Catalog />
            </Route>

            <Route path='/' exact>
                <Home />
            </Route>
        </Switch>
    );
}

export default Routes;
