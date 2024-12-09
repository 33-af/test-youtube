import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext); //список продуктов из контекста
  const [showFilter, setShowFilter] = useState(false); // управляет видимостью секции с фильтрами 
  const [filterProducts, setFilterProducts] = useState([]); //отфильтрованный список продуктов
  const [category, setCategory] = useState([]); //массивы для хранения выбранных категорий и подкатегорий.
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  // обновляют состояния 
  // e - объект события
  const toggleCategory = (e) => { //отображаем массив элементов при фиолтрации если выбрано если нет то нет
    // Событие содержит информацию о том, какой чекбокс был изменен (например, его значение в e.target.value)
    // содержится ли значение измененного чекбокса
    if (category.includes(e.target.value)) {
      //вернёт true если value уже есть в массиве тогда удаляется
      // prev текущее состояние массива category
      // а дальше оно уже создаёт новый масив исключая из него элемент равный чекбоксу
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      // если значение не выбрано оно добавится в категорию
      // создаёт новый массив добавляя чекбокс в существующий элемент массива
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }


  // Отвечает за применение фильтров к массиву products
  const applyFilter = () => {
    // копирует массив и фильтрует взависимости от выбраных категорий
    // создаёт поверхностную копию массива
    // что бы фильтровать продукты не изменяя оригинальный массив
    // метод массива slice без аругментов возвращает новый массив содерж все элементы ориг массива 
    let productsCopy = products.slice();

    if (category.length > 0) {
      // Фильтрует массив  оставляя только те елементы у которых category совпадает с выбранным елементом
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    setFilterProducts(productsCopy)
    // отображается  отфильтрованая копия  массива
  }


  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
        break;

      default:
        applyFilter();
        break
    }
  }


  useEffect(() => {
    // инициализирует полный список продуктов при первом рендере
    setFilterProducts(products)
  }, [])

  useEffect(() => {
    // применяет фильтры когда изменяется категории или подкатегории
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS</p>
        <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>
      </div>


      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className="mb-3 text-sm font-medium">Type</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p className="flex gap-2">
            <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
          </p>
          <p className="flex gap-2">
            <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
          </p>
          <p className="flex gap-2">
            <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
          </p>
        </div>
      </div>

      <div className="flex-1">

        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>


  )
}

export default Collection