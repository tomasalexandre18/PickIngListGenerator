import {useState} from "react";
import style from "./styles/Menu.module.css";
import {loadConfig, saveConfig} from "./config-ei.ts";

export function Menu(props: {setEtape: (etape: number) => void, setFile: (file: File) => void}) {
    const [optionExtend, setOptionExtend] = useState<boolean>(false)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setOptionExtend(!optionExtend)
    //     }, 1000)
    //     return () => clearInterval(interval)
    // }, [optionExtend])
    const handleEditCat = () => {
        // check if its ios mobile
        if(!(('ontouchstart' in window) || (navigator.maxTouchPoints > 0))) {
            props.setEtape(1)
            return
        }
        alert('IOS n\'est pas supporté, veuillez utiliser un ordinateur et importer la configuration manuellement')
        props.setEtape(0)
    }

    return (
        <div className={style.center}>
            <div className={style.menu}>
                <label htmlFor="file">Choisir un fichier
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-filetype-csv" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.517 14.841a1.13 1.13 0 0 0 .401.823q.195.162.478.252.284.091.665.091.507 0 .859-.158.354-.158.539-.44.187-.284.187-.656 0-.336-.134-.56a1 1 0 0 0-.375-.357 2 2 0 0 0-.566-.21l-.621-.144a1 1 0 0 1-.404-.176.37.37 0 0 1-.144-.299q0-.234.185-.384.188-.152.512-.152.214 0 .37.068a.6.6 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.1 1.1 0 0 0-.2-.566 1.2 1.2 0 0 0-.5-.41 1.8 1.8 0 0 0-.78-.152q-.439 0-.776.15-.337.149-.527.421-.19.273-.19.639 0 .302.122.524.124.223.352.367.228.143.539.213l.618.144q.31.073.463.193a.39.39 0 0 1 .152.326.5.5 0 0 1-.085.29.56.56 0 0 1-.255.193q-.167.07-.413.07-.175 0-.32-.04a.8.8 0 0 1-.248-.115.58.58 0 0 1-.255-.384zM.806 13.693q0-.373.102-.633a.87.87 0 0 1 .302-.399.8.8 0 0 1 .475-.137q.225 0 .398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.4 1.4 0 0 0-.489-.272 1.8 1.8 0 0 0-.606-.097q-.534 0-.911.223-.375.222-.572.632-.195.41-.196.979v.498q0 .568.193.976.197.407.572.626.375.217.914.217.439 0 .785-.164t.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.8.8 0 0 1-.118.363.7.7 0 0 1-.272.25.9.9 0 0 1-.401.087.85.85 0 0 1-.478-.132.83.83 0 0 1-.299-.392 1.7 1.7 0 0 1-.102-.627zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879z"/>
                    </svg>
                </label>

                <input type="file" id="file" onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        props.setFile(e.target.files[0])
                        props.setEtape(2)
                    }
                }} accept={'.csv'}/>
                <div>
                    <div className={style.labelShowOptions}>
                        <label htmlFor="showOptions">Voir les options
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-gear-wide-connected" viewBox="0 0 16 16">
                                <path
                                    d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z"/>
                            </svg>
                        </label>
                        <input type="checkbox" id="showOptions" onChange={(e) => setOptionExtend(e.target.checked)}/>
                    </div>
                    <div className={style.options + (optionExtend ? ' ' + style.extend : '')}>
                        <div className={style.button} onClick={handleEditCat}>Modifier les catégories</div>
                        <div>
                            <div className={style.button} onClick={saveConfig}>Sauvegarder Config</div>
                            <div className={style.button} onClick={loadConfig}>Importer Config</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}