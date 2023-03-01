import AppRouter from "./AppRouter";
import MyProvider from "./Provider/Provider";

function App() {
  return (
    <MyProvider>
      <AppRouter />
    </MyProvider>
  );
}

export default App;
