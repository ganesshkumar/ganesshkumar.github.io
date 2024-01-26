import { GetServerSidePropsContext } from "next/types";
import { PostItems, ProjectItems, getAllPosts, getAllProjects } from "../utils/Content";

const BASE_URL = 'https://www.ganesshkumar.com';

function generateSiteMap(posts: PostItems[], projects: ProjectItems[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${BASE_URL}</loc>
     </url>
     <url>
       <loc>${BASE_URL}/articles</loc>
     </url>
     <url>
       <loc>${BASE_URL}/projects</loc>
     </url>
     <url>
       <loc>${BASE_URL}/about</loc>
     </url>
     ${posts
       .map(post => {
         return `
         <url>
           <loc>${`${BASE_URL}/articles/${post.slug}`}</loc>
           <lastmod>${post.modified_date?.replace('/', '-')?.replace('/', '-') || post.date?.replace('/', '-')?.replace('/', '-')}</lastmod>
         </url>
         `;
       })
       .join('')}
     ${projects
       .map(project => {
         return `
         <url>
           <loc>${`${BASE_URL}/projects/${project.slug}`}</loc>
         </url>
         `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { res } = context;

  const posts: PostItems[] = getAllPosts(['title', 'date', 'slug', 'tags']);
  const projects: ProjectItems[] = getAllProjects(['slug', 'order']);

  console.log(posts)
  console.log(projects)

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts, projects);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;