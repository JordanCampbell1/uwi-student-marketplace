import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBarWithCart from '../components/NavBarWithCart';
import StarRating from '../components/StarRating';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

function ProductDetails() {
  const { productId } = useParams(); // Get the product ID from URL params
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = 'http://localhost:8000';
  const [imageUrl,setImageUrl]=useState(null)
  const [rating, setRating] = useState(2);  // Default rating value
  const [comment, setComment] = useState('');
  const AuthTokens = useSelector(state => state.AuthTokens);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const handleSubmitReview = (event) => {
    event.preventDefault();
    const reviewData = {
      rating,
      comment,
      product: productId
    };

    fetch(`http://127.0.0.1:8000/api/add_reviews/${productId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${AuthTokens.access}`  // Adjust authentication as necessary
      },
      body: JSON.stringify(reviewData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to post review');
      }
      return response.json();
    })
    .then(data => {
      console.log('Review submitted:', data);
      setRating(2);  // Reset the form
      setComment('');
      navigate(`/products/${productId}`);  // Redirect or update UI as needed
    })
    .catch(error => console.error('Error submitting review:', error));
  };
  const addProductToCart = async (productId) => {
    const response = await fetch('http://127.0.0.1:8000/api/add-to-cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(AuthTokens.access),
      },
      body: JSON.stringify({ product_id: productId }),
    });

    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/reviews/${productId}/`)  // Adjust this URL based on your actual API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        return response.json();
      })
      .then(data => {
        setReviews(data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      })
      .finally(() => {
        setReviewsLoading(false);
      });
  }, [productId]);
  
  useEffect(() => {
    // Using fetch and chaining .then() and .catch()
    fetch(`http://127.0.0.1:8000/api/products/${productId}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        const url = data.images.length > 0 
    ? `${baseURL}${data.images[0].image}` 
    : 'path/to/placeholder/image.jpg';
  setImageUrl(url);
        console.log(data);
      })
      .catch(error => {
        console.error('Failed to fetch product:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

 
  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>No product found!</p>;

  return (
    <div className="w-[100vw] h-[100vh] relative">
       <NavBarWithCart/>
       <div className="h-[80vh] w-full overflow-y-auto">
          <div className="p-[64px] w-full h-[70vh]  flex">
            <div className='h-[50vh] w-1/2 flex items-center justify-center px-[32px]'>
              <img 
                className="object-contain w-full h-full rounded-t-lg"  // Fixed height for images
                src={imageUrl} 
                alt={product.name} 
              />
            </div>
            <div className='h-[50vh] w-1/2'>
              <h1 className='text-3xl font-semibold mb-4'>{product.name}</h1>
              <Rating name="customized-10 " defaultValue={product.average_rating} max={5}  onChange={(event, newValue) => {
              setRating(newValue);
            }} />
              <p className='text-2xl font-semibold mt-3'>${product.price}</p>
              <p className='mt-3'>Sold By: {product.owner.first_name} {product.owner.last_name}</p>
              {product.condition.length>0&&<p className='mt-3'>Condition: {product.condition} </p>}
              <p className='mt-3'>{product.description}</p>
              <p className='mt-3'>Date Posted: {new Date(product.dateListed).toString()}</p>
              <button onClick={() => addProductToCart(product.id)} className="text-white bg-red-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-1/4 py-2.5 text-center mt-2">Add to cart</button>
            </div>
          </div>
          <div className='px-[64px] py-[32px] w-full'>
              <h1 className='text-3xl font-semibold'>Comments</h1>
              <form className='px-[64px] py-[32px] w-full flex flex-col items-start gap-2' onSubmit={handleSubmitReview}>
                <TextField
                  fullWidth
                  label="Add Your Review"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" className='mt-4'>
                  Submit Review
                </Button>
              </form>
              {reviewsLoading ? (
                  <p>Loading reviews...</p>
                ) : reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className=" w-full my-4 p-4 border rounded px-[64px]">
                      <div className='flex items-center gap-2 mb-2'>
                        <div className='w-12 h-12 border border-black rounded-full'></div>
                        <p className="text-md">{review.author.first_name} {review.author.last_name}</p>
                      </div>
                      <div className='px-2'>
                        <Rating name="read-only" value={review.rating} readOnly />
                      </div>
                     
                      <p className='px-2'>{review.comment}</p>
                  
                      <p className="text-md mt-2 px-2">{new Date(review.datePosted).toString()}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
            </div>
        </div>
    </div>
  );
}

export default ProductDetails;
