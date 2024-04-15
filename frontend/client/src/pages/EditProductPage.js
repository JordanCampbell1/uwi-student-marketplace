
import NavBarWithCart from "../components/NavBarWithCart"
import EditProductForm from "../components/EditProductForm";

const EditProductPage=()=>{
    return(
        <div className="w-[100vw] h-[100vh] relative flex flex-col items-center">
              <NavBarWithCart/>
              <EditProductForm/>
       

        </div>
    );
}
export default EditProductPage