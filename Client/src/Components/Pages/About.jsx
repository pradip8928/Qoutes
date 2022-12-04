import React, { useState, useEffect } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import axios from "axios";
const About = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    // http://localhost:3000
    axios
      .get("/api/users/quotes", config)
      .then((result) => {
        setData(result.data);
        console.log(data);
      });
  }, []);

  // like
  const likePost = async (id) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        // method: "put",
        // body: JSON.stringify({ postId: id }),
      };

      const { data } = await axios
        .put(`http://localhost:3000/api/users/likes/${id}`, config)
        .then((result) => {
          console.log(result.data);

          const newData = data.map((item) => {
            if (content._id === result._id) {
              return result;
            }else{
              item
            }
          });
          setData(newData);
        })
        .catch((err) => {
          console.log("error" + err);
        });
      console.log(data);
    } catch (error) {
      console.log("error" + error);
    }
  };

  //   const likePost = (id)=>{
  //     fetch(`http://localhost:3000/api/users/likes/${id}`,{
  //         method:"put",
  //         headers:{
  //             "Content-Type":"application/json",

  //         },
  //         body:JSON.stringify({
  //             postId:id
  //         })
  //     }).then(res=>res.json())
  //     .then(result=>{
  //                console.log(result)
  //       const newData = data.map(item=>{
  //           if(data._id==result._id){
  //               return result
  //           }else{
  //               return data
  //           }
  //       })
  //       setData(newData)
  //     }).catch(err=>{
  //         console.log(err)
  //     })
  // }

  //   unlikePost
  const unlikePost = async (id) => {
    try {
      // const config = {
      //   headers: { "Content-Type": "application/json" },
      //   method: "put",
      //   body: JSON.stringify({ postId: id }),
      // };

      const data = await axios
        .put("http://localhost:3000/api/users/unlikes", {
          id: id,
        })
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(data);
    } catch (error) {
      console.log("error" + error);
    }
  };

  return (
    <>
      <div className="container m-4 w-50   mx-auto">
        <h2 className="text-center text-warning text-bold">Quotes</h2>
        {data.length === 0 ? (
          <h2 className="text-center text-warning ">no data</h2>
        ) : (
          data.map((content, key) => {
            return (
              <>
                <div className="card my-4 " key={content._id}>
                  <div className="card-body">
                    {" "}
                    {content.title}
                    id :== {content._id}
                    <br />
                    <BsHeart
                      className=" my-3"
                      style={{ height: "30px", width: "30px" }}
                      onClick={() => {
                        likePost(content._id);
                      }}
                    />{" "}
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <BsHeartFill
                      className=" my-3"
                      style={{ height: "30px", width: "30px" }}
                      onClick={() => {
                        unlikePost(content._id);
                      }}
                    />
                    <h6>{content.like.length} likes</h6>
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
};

export default About;
