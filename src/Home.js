import {useState, useEffect} from 'react';
import BlogList from './BlogList';
const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [error, setError] = useState(null);
      
    useEffect(() => {
        const fetchBlogs = async() => {
          try{
              const response = await fetch('http://localhost:8000/blogs')
              const json = await response.json();

              if(response.ok){
                setBlogs(json);
                setError(null);
              }

              else if(!response.ok){
                throw Error('could not fetch data for that resource');
              }
            }
          catch(err){
            setError(err.message);
          }
        }
        fetchBlogs();
      }, [])

    return ( 
        <div className="home">
            {error && <div> {error}</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs!"/>}
        </div>
     );
}
 
export default Home;