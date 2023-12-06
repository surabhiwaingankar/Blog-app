import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
const BlogDetails = () => {
    const {id} = useParams();

    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async() => {
          try{
              const response = await fetch('http://localhost:8000/blogs/'+id)
              const json = await response.json();

              if(response.ok){
                setBlog(json);
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
        fetchBlog();
      }, []);

      const handleClick = async() =>{
        try{
          await fetch('http://localhost:8000/blogs/'+id, {
            method: 'DELETE'
          })

          navigate('/');
      }
      catch(err){
        setError(err.message)
      }
    }

    return ( 
        <div className="blog-details">
            {error && <div>{error}</div> }
            { blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by { blog.author }</p>
                    <div>
                        {blog.body}
                    </div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;