import express from 'express';
import axios from "axios";
import bodyParser from 'body-parser'


const app = express();
const port = 3000;
const base_API = "https://api.jikan.moe/v4/"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render("index.ejs" ,{content: "waiting for the data..."});
})

app.get("/get-anime",async(req,res)=>{
 
    const response = await axios.get(base_API + "random/anime");
    let post = JSON.stringify(response.data.data.images.webp.large_image_url)
    post = post.replace(/^"(.+)"$/, '$1')
    res.render("anime.ejs",{mal_id : JSON.stringify(response.data.data.mal_id),images: post,title:JSON.stringify(response.data.data.title)
        ,synopsis:JSON.stringify(response.data.data.synopsis),episodes: JSON.stringify(response.data.data.episodes), duration: JSON.stringify(response.data.data.duration),rating: JSON.stringify(response.data.data.rating), rank:JSON.stringify(response.data.data.rank),season : JSON.stringify(response.data.data.season),status : JSON.stringify(response.data.data.status), score: JSON.stringify(response.data.data.score)
    }
);
    });

app.get("/get-manga",async(req,res)=>{
 
        const response = await axios.get(base_API + "random/manga");
        let post = JSON.stringify(response.data.data.images.webp.large_image_url)
        post = post.replace(/^"(.+)"$/, '$1')
        res.render("manga.ejs",{mal_id : JSON.stringify(response.data.data.mal_id),images: post,title:JSON.stringify(response.data.data.title)
            ,synopsis:JSON.stringify(response.data.data.synopsis),episodes: JSON.stringify(response.data.data.episodes), duration: JSON.stringify(response.data.data.duration),rating: JSON.stringify(response.data.data.rating), rank:JSON.stringify(response.data.data.rank),season : JSON.stringify(response.data.data.season),status : JSON.stringify(response.data.data.status),chapters: JSON.stringify(response.data.data.chapters),volumes: JSON.stringify(response.data.data.volumes),popularity : JSON.stringify(response.data.data.popularity), authors: JSON.stringify(response.data.data.authors.name),
        }
    );
        });

app.get("/about",async(req,res)=>{
 
            const response = await axios.get(base_API + "random/manga");
            let post = JSON.stringify(response.data.data.images.webp.large_image_url)
            post = post.replace(/^"(.+)"$/, '$1')
            res.render("about.ejs",{mal_id : JSON.stringify(response.data.data.mal_id),images: post,title:JSON.stringify(response.data.data.title)
                ,synopsis:JSON.stringify(response.data.data.synopsis),episodes: JSON.stringify(response.data.data.episodes), duration: JSON.stringify(response.data.data.duration),rating: JSON.stringify(response.data.data.rating), rank:JSON.stringify(response.data.data.rank),season : JSON.stringify(response.data.data.season),status : JSON.stringify(response.data.data.status),chapters: JSON.stringify(response.data.data.chapters),volumes: JSON.stringify(response.data.data.volumes),popularity : JSON.stringify(response.data.data.popularity)
            }
        );
            });

            app.get("/features",async(req,res)=>{
 
                const response = await axios.get(base_API + "random/manga");
                let post = JSON.stringify(response.data.data.images.webp.large_image_url)
                post = post.replace(/^"(.+)"$/, '$1')
                res.render("features.ejs",{mal_id : JSON.stringify(response.data.data.mal_id),images: post,title:JSON.stringify(response.data.data.title)
                    ,synopsis:JSON.stringify(response.data.data.synopsis),episodes: JSON.stringify(response.data.data.episodes), duration: JSON.stringify(response.data.data.duration),rating: JSON.stringify(response.data.data.rating), rank:JSON.stringify(response.data.data.rank),season : JSON.stringify(response.data.data.season),status : JSON.stringify(response.data.data.status),chapters: JSON.stringify(response.data.data.chapters),volumes: JSON.stringify(response.data.data.volumes),popularity : JSON.stringify(response.data.data.popularity)
                }
            );
                });

                app.post("/get-secret", async (req, res) => {
                    const searchId = req.body.id;
                    
                      const response = await axios.get("https://kitsu.io/api/edge" + "/anime?filter[text]="+searchId);
                      let post = JSON.stringify(response.data.data[0].attributes.posterImage.original);
                    post = post.replace(/^"(.+)"$/, '$1')
                      res.render("search.ejs",{title : JSON.stringify(response.data.data[0].attributes.canonicalTitle),images : post,synopsis: JSON.stringify(response.data.data[0].attributes.synopsis), episodes: JSON.stringify(response.data.data[0].attributes.episodeCount), status: JSON.stringify(response.data.data[0].attributes.status), duration : JSON.stringify(response.data.data[0].attributes.episodeLength) , rating: JSON.stringify(response.data.data[0].attributes.ageRatingGuide), rank : JSON.stringify(response.data.data[0].attributes.ratingRank),
                    })
                }
                );
                    
                  

app.listen(port, ()=>{
    console.log(`server is listning to port ${port}`);
});