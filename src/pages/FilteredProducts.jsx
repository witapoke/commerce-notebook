import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'
import { useParams } from 'react-router-dom'
import ItemListComponent from '../componentes/ItemListComponent'
import { ProductsContext } from '../context/ProductsContext'

const FilteredProducts = () => {
  const { products, setProducts } = useContext(ProductsContext)

  const params = useParams()

  const productsCollectionRef = collection(db, 'products')

  const categoryQuery = query(
    productsCollectionRef,
    where('category', '==', params.category)
  )

  useEffect(() => {
    const getProductsByCategory = async () => {
      const data = await getDocs(categoryQuery)
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getProductsByCategory()
  }, [params.category])

  return (
    <>
      {products.length > 0 ? (
        <ul className='itemListContainer'>
          {products.map((product) => (
            <ItemListComponent key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <h1>Cargando...</h1>
      )}
    </>
  )
}

export default FilteredProducts
