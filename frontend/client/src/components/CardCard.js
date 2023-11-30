const CartCard=({product})=>{

    return(
        <div className="flex w-full h-[15%] p-2 gap-2 border-t-grey">
            <img className="object-cover w-1/2 rounded-t-lg" src={product.imageUrl} alt={product.name} />
            <div>
                <p>{product.name}</p>
                <p>{product.price}</p>

            </div>

        </div>
    )
}
export default CartCard