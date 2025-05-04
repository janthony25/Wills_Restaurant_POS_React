import React, { useEffect, useState } from 'react'

const Categories = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState( {
        categoryName: ""
    });

    // Call the function fetchCategories from the start
    useEffect(() => {
        fetchCategories();
    }, []);
    
    // Fetch categories from api
    const fetchCategories = async () => {
        try{
            const response = await fetch('https://localhost:7256/api/Category/categories');

            if(!response.ok) throw new Error ("Failed to fetch data.");

            const data = await response.json();
            setCategories(data);
        }
        catch(error) {
            console.error('Error fetching categories', error);
            setError(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    // Add Category API Request
    const addCategorySubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('https://localhost:7256/api/Category/add-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) throw new Error('Failed to add category');

            const result = await response.json();
            console.log('New Category added', result);

            // Clear the form after successful submission
            setFormData({
                categoryName: ""
            });

            // Update the category list again
            fetchCategories();
        }
        catch(error) {
            console.error('Error adding category', error);
            setError(error.message);
        }
    }

    // handle change on selected category
    const handleChange = (e) => {
        setSelectedCategory(e.target.value);
        console.log(e.target.value);
    }

    // handle input change for add category
    const handleAddCategoryInput = (e) => {
        setFormData( {
            ...formData,
            [e.target.name]: e.target.value
        });
        console.log(e.target.value)
    };



  return (
    <div>
        {/* Show error message if there is one */}
        {error && <div className='text-red-500 mb-4 w-full bg-red-200 h-10 flex items-center justify-center text-xl font-medium'>{error}</div>}
        
        <div className='flex justify-center mt-20'>
            


            <div className='border w-100 mr-25 pb-10 pt-2 pl-4 rounded-md'>
                <h1 className='text-xl'>Categories</h1>
                {loading ? (
                    <p className='mt-5'>Loading categories...</p>
                ) : (
                    <select onChange={handleChange} className='w-80 mt-5 border rounded-sm'>
                        {categories.map((item) => (
                            <option value={item.categoryId} key={item.categoryId}>{item.categoryName}</option>
                        ))}
                    </select>
                )}
                

            </div>

            <div className='border w-100 pt-2 pl-4 pb-4 rounded-md'>
                <h1 className='text-xl mb-5'>Add Categories</h1>
                <form onSubmit={addCategorySubmit}>
                    <input className='border rounded-sm w-80 mr-3 mb-2'
                            name='categoryName'
                            value={formData.categoryName}
                            onChange={handleAddCategoryInput}
                            required
                            placeholder='Category'></input>
                    <button type='submit'
                    className='bg-blue-600 w-20 rounded-sm text-white hover:bg-blue-800 transition-all duration-300'>Add</button>
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default Categories
