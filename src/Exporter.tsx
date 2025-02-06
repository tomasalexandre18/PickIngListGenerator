import {useEffect, useState, useRef} from "react";
import csv from "csvtojson";
// @ts-ignore
import style from './styles/exporter.module.css';

interface Cat {
    name: string
    subCategory: string[]
}

interface ExporterProps {
    file: File
}

interface DataType {
    Catégorie: string
    Name: string
    Quantity: string
    'In order(s)': string
}

function getProductBySubCategory(data: DataType[], subCategory: string) {
    return data.filter((product) => product.Catégorie === subCategory)
}

export function Exporter(props: ExporterProps) {
    const [categories, setCategories] = useState<Cat[]>(window.localStorage.getItem('categories') ? JSON.parse(window.localStorage.getItem('categories') as string) : [])
    const [missingCategories, setMissingCategories] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const ref = useRef<HTMLDivElement>(null)
    if (!categories) {
        alert('Categories not found, this should not happen')
        window.location.reload()
    }
    const [data, setData] = useState<DataType[]>([])

    useEffect(() => {
        const reader = new FileReader()
        reader.onload = async () => {
            csv({delimiter: ';'}).fromString(reader.result as string).then((json: DataType[]) => {
                // check if categories is missing
                let mis: string[] = []
                json.forEach((product) => {
                    if (!categories.find((cat) => cat.subCategory.includes(product.Catégorie))) {
                        mis.push(product.Catégorie)
                    }
                })
                // remove duplicates
                mis = mis.filter((value, index, self) => self.indexOf(value) === index)
                setMissingCategories(mis)
                setData(json)
                if (mis.length > 0) {
                    ref.current!.style.display = 'flex';
                    return;
                }

                setLoading(false)
            })
        }
        reader.readAsText(props.file)
    }, [props.file])

    useEffect(() => {
        if (loading) {
            return
        }
        window.print()
    }, [loading])

    useEffect(() => {
        const callback = () => {
            window.location.reload()
        }
        window.addEventListener('afterprint', callback)
        return () => window.removeEventListener('afterprint', callback)
    }, []);
    return (
        <>
            {categories.map((cat, i) => {
                if (data.filter((product) => cat.subCategory.includes(product.Catégorie)).length === 0) {
                    return null
                }
                return (<>
                <table className={style.tableFH}>
                    <thead><th><td><div className={style.emptyHeader}></div></td></th></thead>
                <tbody><tr><td>
                    <div className={style.content}>
                        <div key={i} style={{pageBreakAfter: categories.length - 1 === i ? 'auto' : 'always'}}>
                            <h2 className={style.category}>{cat.name}</h2>
                            {cat.subCategory.map((subCat, j) => {
                                if (getProductBySubCategory(data, subCat).length === 0) {
                                    return null
                                }
                                return (
                                    <div key={j}>
                                        <h3 className={style.subcategory}>{subCat}</h3>
                                        <table className={style.products}>
                                            <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Quantité</th>
                                                <th>Commandes</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {getProductBySubCategory(data, subCat).map((product, k) => {
                                                const splited = product['In order(s)'].split(' - ')
                                                return (
                                                    <tr key={k}>
                                                        <td>{product.Name}</td>
                                                        <td>{product.Quantity}</td>
                                                        <td>{splited.map((order, l) => {
                                                            return (
                                                                <span key={l} style={{textWrap: "nowrap"}}>{order}<br/></span>
                                                            )
                                                        })}</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </td>
                </tr>
                </tbody>
                    <tfoot>
                    <div className={style.emptyFooter}></div>
                    </tfoot>
                </table>
                        <div className={style.footer}>{new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString()}</div>
                    </>
                )
            })}
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2em'}} className={style.cover}>
            <h1>Impression...</h1>
        </div>
        <div style={{display: 'none', justifyContent: 'center', alignItems: 'center', fontSize: '2em', flexWrap: 'wrap', backgroundColor: "white", zIndex:2000, width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0}} className={style.cover} ref={ref}>
            <div>
                <h1>Les catégories suivantes ne sont pas configurées:</h1>
                <ul>
                    {missingCategories.map((cat, i) => {
                        return (
                            <li key={i}>{cat}</li>
                        )
                    })}
                </ul>

                <button onClick={() => {
                        alert('L\'editeur de catégories n\'est pas encore disponible\nMerci de modifier la configuration manuellement')
                }}>Configurer les catégories</button>
                <button onClick={() => {
                    const other = categories.find((cat) => cat.name === 'Autre')
                    if (!other) {
                        categories.push({name: 'Autre', subCategory: missingCategories})
                    } else {
                        other.subCategory = other.subCategory.concat(missingCategories)
                    }
                    setMissingCategories([])
                    setCategories(categories)
                    setLoading(false)
                }}>ajouter les produits manquants dans une catégorie Autre</button>
                <button onClick={() => {
                    setMissingCategories([])
                    setLoading(false)
                }}>Imprimer sans les produits manquants</button>
            </div>
        </div>
        </>
    )
}