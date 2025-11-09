import Buttons from "./components/Buttons";
import NavBar from "./components/NavBar";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter } from "react-router";

function App() {
  
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-2xl p-4">Exemplos componentes dinâmicos</h1>
        <div className="flex gap-4">
          <div className="w-56 h-80 border flex flex-col gap-4 ml-4 items-center">
            <h3>Exemplo de Buttons dinâmicos</h3>
            <Buttons />
            <Buttons variant="Now" />
          </div>
          <ProductPage />
          <BrowserRouter><NavBar /></BrowserRouter>
        </div>
      </div>
    </>
  )
}

export default App
