import {useState} from "react";
import {Exporter} from "./Exporter.tsx";
import {Menu} from "./Menu.tsx";
// @ts-ignore
import './styles/global.css';
import {Cat} from "./Cat.tsx";

function App() {
  const [etape, setEtape] = useState(0)
  const [file, setFile] = useState<File | null>(null)

  return (
    <>
      {etape!=2 && <div className={"transition" + (etape==1 ? " active" : "")}>
        <Menu setFile={setFile} setEtape={setEtape} />
        <Cat file={file} setEtape={setEtape} />
      </div>}
      {etape==2 && <Exporter file={file!} />}
    </>
  )
}

export default App
