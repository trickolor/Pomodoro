import { hot } from "react-hot-loader/root";
import * as React from "react";
import './main.global.css';
import { Provider } from 'react-redux';
import { persistor, store } from "./redux_store/store";
import { Routes, Route, Navigate } from "react-router-dom";
import { TimerContent } from "./TimerContent";
import { StatsContent } from "./StatsContent";
import { PersistGate } from 'redux-persist/integration/react';

function AppComponent() {
  return (
    <PersistGate persistor={persistor} loading={null}>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Navigate to='/timer' replace={true} />} />
          <Route path='/timer' element={<TimerContent />} />
          <Route path='/stats' element={<StatsContent />} />
        </Routes>
      </Provider>
    </PersistGate>

  );
}

export const App = hot(() => <AppComponent />);
