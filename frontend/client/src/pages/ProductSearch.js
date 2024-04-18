import NavBarWithCart from "../components/NavBarWithCart"
import { useParams } from "react-router-dom";
const ProductSearch=()=>{
    const { productId } = useParams(); // Get the product ID from URL params
    return(
        <div className="w-[100vw] h-[100vh] relative">
          <NavBarWithCart/>
          <div className="h-[80vh] w-full overflow-y-auto">
           
            {/* <ProductContainer products={products} /> */}

          </div>
    

        </div>
    )
}

export default ProductSearch