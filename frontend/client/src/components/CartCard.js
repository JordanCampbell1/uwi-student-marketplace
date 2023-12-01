const CartCard = ({ product }) => {
    const baseURL = 'http://localhost:8000'; // Adjust as needed
    let imageUrl;

    if (product.images && product.images.length > 0) {
        imageUrl = `${baseURL}${product.images[0].image}`;
    } else {
        imageUrl = 'path/to/placeholder/image.jpg'; // Replace with actual path to a placeholder image
    }

    // Format price as currency
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(product.price);

    return (
        <div className="flex w-full h-[15%] p-2 gap-2 border-t-grey">
            <img className="object-cover w-1/2 rounded-t-lg" src={imageUrl} alt={product.name} />
            <div>
                <p>{product.name}</p>
                <p>{formattedPrice}</p>
            </div>
        </div>
    );
};

export default CartCard;
