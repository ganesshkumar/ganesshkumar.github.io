import { useRef } from 'react';
import { GetStaticProps } from 'next';
import { Meta } from '../containers/layout/Meta';
import { Main } from '../containers/templates/Main';
import { getAllPosts, getShowcaseProjects } from '../utils/Content';

const BlogPost = (props: any) => {
  const { post } = props;

  return (
    <div className="w-full mx-auto lg:mx-0 z-10 py-3">
      <a className='no-underline' href={`/articles/${props.post.slug}`}>
        <div className='text-xl text-slate-700 hover:text-sky-600 decoration-sky-600 hover:underline'>{post.title}</div>
      </a>
      {/* <div className='text-sm'> {post.date} </div> */}
      <div className='text-slate-400 font-semibold uppercase text-xs pt-1'>
        {post.tags.join(', ')}
      </div>
    </div>
  );
}

const LatestBlogPosts = ({posts}: {posts: any[]}) => {
  return (
    <div className='px-4 basis-full md:basis-1/2'>
      <h1 className='font-bold text-3xl'>
        <span className='tracking-wide underline decoration-sky-500 decoration-4 underline-offset-2'>Latest Articles</span>
      </h1>
      <div className='flex-col divide-y my-5'>
        {posts
            .slice(0, 5)
            .map((post: any) => <BlogPost key={post.slug} post={post}/>)}
      </div>
      <div className='mt-5'>
        <button
          type="button"
          onClick={() => window.location.href = "/articles"}
          className="inline-flex gap-3 justify-center items-center text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-40">
            Read all posts →
        </button>
      </div>
    </div>
  );
}

const Project = (props: any) => {
  return (
    <div className='py-3'>
      <div>
        <a className='no-underline' href={props.project.repoUrl} target="_blank" rel="noreferrer">
          <div className='text-xl text-slate-700 hover:text-sky-600 decoration-sky-600 hover:underline'>{props.project.title}</div>
        </a>
      </div>
      <div className='text-slate-600 text pt-1'>
        {props.project.summary}
      </div>
    </div>
  );
}

const ProjectShowcase = ({ projects }: { projects: any[]}) => {
  return (
    <div className='px-4 basis-full md:basis-1/2'>
      <h1 className='font-bold text-3xl tracking-wide underline decoration-sky-500 decoration-4 underline-offset-2'>
        Project Showcase
      </h1>
      <div className='flex-col divide-y my-5'>
        {projects
            .map((project: any) => <Project key={project.repoUrl} project={project}/>)}
      </div>
      <div className='mt-5'>
      <button
          type="button"
          onClick={() => window.location.href = "/projects"}
          className="inline-flex gap-3 justify-center items-center text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-40">
            See all →
        </button>
      </div>
    </div>
  );
}

const Home = (props: any) => {
  const headerRef = useRef(null);
  return (
    <Main
      currentPage='Home'
      meta={(
        <Meta
          title="Home"
          description="Description"
        />
      )}>
      <div className='bg-white'>
        <div className='flex flex-col h-full'>
          {/* Banner */}
          <header className='flex flex-col justify-center items-center border border-0 border-b-2 border-sky-600 bg-sky-50' style={{minHeight: '60vh'}}>
            <div ref={headerRef} className='w-full'>
              {/* <Particles headerRef={headerRef} /> */}
              <div className='isolate flex flex-col md:flex-row'>
                <div className='flex basis-1/2 justify-center'>
                  <div className='flex flex-col justify-center'>
                    <h5 className='text-sky-600'>
                      Hi 👋 I am
                    </h5>
                    <div className='text-4xl text-black font-bold mt-2'>
                      Ganessh Kumar R P
                    </div>
                    <div className='text-xl my-5'>
                      Full-Stack Software Engineer
                    </div>
                    <p className='text-base text-slate-600'>
                      Currently building Microsoft Teams at Microsoft.
                      <br/>
                      I build and maintain Obsidian Plugins.
                    </p>
                    <button
                      type="button"
                      onClick={() => window.location.href = "/about"}
                      className="inline-flex gap-3 justify-center items-center text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-36">
                        About me →
                    </button>
                  </div>
                </div>
                <div className='z-10 flex basis-1/2 justify-center overflow-hidden'>
                  <img className='z-10 object-cover h-96 w-96' src="/ganesshkumar-emoji.png" alt='profile picture' />
                </div>
              </div>
            </div>
          </header>
          
          <main className='my-10 container mx-auto w-100 lg:w-2/3 2xl:w-1/2'>
            <div className='flex flex-wrap'>
              {/* Latest blog posts */}
              <LatestBlogPosts posts={props.posts} />
              <img className="w-1/2 hidden md:block" src="/static/blogging-illustration.svg" alt="blog image" />
            </div>
            <div className='flex flex-wrap mt-20'>
              {/* Latest projects */}
              <img className="w-1/2 hidden md:block" src="/static/project-illustration.svg" alt="projects image" />
              <ProjectShowcase projects={props.projects} />
            </div>
          </main>
        </div>
      </div>
      {/* #9C9C9C */}
    </Main>
  );
}

export const getStaticProps: GetStaticProps<any> = async () => {
  const posts = getAllPosts(['title', 'date', 'slug', 'image', 'tags']);
  const projects = getShowcaseProjects(['title', 'summary', 'repoUrl', 'iconUrl']);

  return {
    props: {
      posts, projects
    },
  };
};

export default Home;