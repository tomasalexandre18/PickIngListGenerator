// @ts-ignore
import style from './styles/Cat.module.css';
// import {useEffect, useState} from "react";

// interface Cat {
//     name: string
//     subCategory: string[]
// }

/*
class DataTransfer {
    private data: {[key: string]: string} = {}

    getData(key: string): string {
        return this.data[key]
    }

    setData(key: string, value: string) {
        this.data[key] = value
    }
}

const dataTransfer = new DataTransfer()

export function Cat(props: {setEtape: (etape: number) => void, file: File | null}) {
    const [categories, setCategories] = useState<Cat[]>(window.localStorage.getItem('categories') ? JSON.parse(window.localStorage.getItem('categories') as string) : [])
    const [unsortedSubCategories, setUnsortedSubCategories] = useState<string[]>(['test', 'test2'])
    // const [addCategoryString, setAddCategoryString] = useState<string>('')
    //
    useEffect(() => {
        const temp = []
        const nb = Math.floor(Math.random() * 100)
        for (let i = 0; i < nb; i++) {
            temp.push(Math.random().toString(36).substring(7))
        }

        setUnsortedSubCategories(temp)
    }, []);


    // const addCategory = (str: string) => {
    //     const newCat = {
    //         name: str,
    //         subCategory: []
    //     }
    //     setCategories([...categories, newCat])
    // }


  return (
    <div className={style.center}>
        <div className={style.maxHeight}>
            <div className={style.categories + ' ' + style.scroll}>
                {categories.map((cat) => <Category name={cat.name} subCategories={cat.subCategory} />)}
            </div>
            <div className={style.subcategory + ' ' + style.scroll}>
                {unsortedSubCategories.length === 0 && <p>Aucune sous-catégorie</p>}
                {unsortedSubCategories.map((cat) => <SubCategory name={cat} />)}
            </div>
        </div>
    </div>
  );
}

function Category(props: {name: string, subCategories: string[]}) {
    return (
        <div className={style.category}>
            <h1>{props.name}</h1>
            {props.subCategories.map((subCat) => <p draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', 'test')}>{subCat}</p>)}
        </div>
    )
}

function SubCategory(props: {name: string}) {
    return (
        <div className={style.subCategoryItem}>
            <p>{props.name}</p>
        </div>
    )
}*/

export function Cat(props: {setEtape: (etape: number) => void, file: File | null}) {
    // under construction
    return (
        <div className={style.center} style={{flexDirection: 'column'}}>
            <h1 style={{marginBottom: '0'}}>Fonctionnalité en cours de développement</h1>
            <p>Merci de generer votre fichier manuellement</p>
            <button onClick={() => props.setEtape(0)}>Retour</button>
        </div>
    )
}
