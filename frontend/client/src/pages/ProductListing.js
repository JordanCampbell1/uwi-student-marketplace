import ProductDescriptionForm from "../components/ProductForm"
import NavBarWithCart from "../components/NavBarWithCart"


const ProductListing=()=>{
    return(
        <div className="w-[100vw] h-[100vh] relative">
              <NavBarWithCart/>
            <ProductDescriptionForm/>

        </div>
    )
}
export default ProductListing