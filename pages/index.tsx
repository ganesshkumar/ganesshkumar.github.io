import { GetStaticProps } from 'next';
import Image from 'next/image';
import {
  Avatar,
  Card,
  Button,
  Text,
  Row,
  Col,
  Spacer,
  Container,
  Link 
} from '@nextui-org/react';
import { Meta } from '../containers/layout/Meta';
import { Main } from '../containers/templates/Main';
import GreenGradient from '../static/green-gradient.svg';
import PurpleGradient from '../static/purple-gradient.svg';
import { getAllPosts, getAllProjects } from '../utils/Content';

const Twitter = () => (<i className='bx bxl-twitter'></i>)
const Github = () => (<i className='bx bxl-github'></i>)
const Gitlab = () => (<i className='bx bxl-gitlab'></i>)

const goto = (url: string) => window.open(url, '_blank');

const BlogPost = (props: any) => {
  return (
    <div className="w-full lg:w-1/4 mx-auto lg:mx-0 pb-1 z-10">
      <Card hoverable clickable onClick={_ => window.location.href =`/blog/${props.post.slug}`}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Text b color="white" size={16}>{props.post.title}</Text>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            objectFit="cover"
            src={props.post.image}
            height="auto"
            width="100%"
            alt={props.post.title}
          />
        </Card.Body>
        <Card.Footer className='cursor-pointer'>
          <Row justify="center">
            <Text size={16} color="primary" onClick={_ => window.location.href =`/blog/${props.post.slug}`}>Read</Text>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
}

const Project = (props: any) => {
  return (
    <div className="w-full lg:w-1/4 mx-auto lg:mx-0 pb-1 z-10">
      <Card hoverable>
        <Card.Body>
          <Card.Image
            objectFit="cover"
            src={props.project.repoUrl.includes("github") ? 
              'https://github.githubassets.com/images/modules/logos_page/Octocat.png' : ''}
            height="auto"
            width="100%"
            alt={props.project.title}
          />
        </Card.Body>
        <Card.Footer>
          <Col>
            <Row justify="space-between">
              <Col>
                <Text b size={16}>{props.project.title}</Text>
              </Col>
              <Col>
                <Row justify="flex-end">
                  <a href={props.project.repoUrl} target="_blank" rel="noreferrer">
                    <Text size={16} color="primary">Visit</Text>
                  </a>
                </Row>
              </Col>
            </Row>
            <Row>
              <Text size={12}>{props.project.summary}</Text>
            </Row>
          </Col>
        </Card.Footer>
      </Card>
    </div>
  );
}

const Home = (props: any) => {
  return (
    <Main
      currentPage='/'
      meta={(
        <Meta
          title="Made with Next.js, TypeScript, ESLint, Prettier, PostCSS, Tailwind CSS"
          description="Description"
        />
      )}>
      <Container>
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='mt-5 self-center'>
            <Card.Header className='flex items-center'>
              <Avatar src="https://avatars.githubusercontent.com/u/2135089" size="xl" color="primary" bordered zoomed />
              <div className='ml-5'>
                <p className='text-xl'>Ganessh Kumar R P</p>
                <div className='flex mt-2 w-full'>
                  <div className='mr-2' onClick={_ => goto('https://twitter.com/ganesshkumar')}>
                    <Avatar size="sm" squared icon={<Twitter/>}/>
                  </div>
                  <div className='mr-2' onClick={_ => goto('https://github.com/ganesshkumar')}>
                    <Avatar size="sm" squared icon={<Github/>}/>
                  </div>
                  <div className='mr-2' onClick={_ => goto('https://gitlab.com/ganesshkumar')}>
                    <Avatar size="sm" squared icon={<Gitlab/>}/>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="text-base">
              <div>Building Microsoft Teams - Full Stack Engineer</div>
            </Card.Body>
          </div>
          
          {/* Latest blog posts */}
          <div className='relative'>
            <div className='absolute -top-80 -left-80'>
              <Image src={PurpleGradient} alt="customization background" />
            </div>
            <Spacer y={8} />
            <Text h2 size={30} weight="bold">Latest</Text>
            <Text h1 size={30} weight="bold"
                css={{
                  textGradient: '45deg, $blue500 -20%, $pink500 50%'
                }}>
              Blog Posts
            </Text>
            <div className='mt-5 flex justify-between flex-wrap'>
              {props.posts
                  .slice(0, 3)
                  .map((post: any) => <BlogPost key={post.slug} post={post}/>)}
            </div>
            <div className='mt-5 z-50'>
              <Button bordered color="primary" auto size="xs" className='z-50'>
                <Link href="/blog">
                  <Text color="primary">Read all posts</Text>
                </Link>
              </Button>
            </div>
          </div>

          {/* Latest projects */}
          <div className='relative'>
            <div className='absolute -top-80 -right-80'>
              <Image src={GreenGradient} alt="customization background"/>
            </div>
            <Spacer y={8} />  
            <Text h2 size={30} weight="bold">Latest</Text>
            <Text h1 size={30} weight="bold"
                css={{
                  textGradient: '0deg, $green700 0%, $green300 58%'
                }}>
              Projects
            </Text>
            <div className='mt-5 flex justify-between flex-wrap'>
              {props.projects
                  .slice(0, 3)
                  .map((project: any) => <Project key={project.repoUrl} project={project}/>)}
            </div>
            <div className='mt-5 z-10'>
              <Button bordered color="success" auto size="xs">
                <Link href="/projects">
                  <Text color="success">See all</Text>
                </Link>
              </Button>
            </div>
          </div>

          <Spacer y={4} />
        </div>
      </Container>
    </Main>
  );
}

export const getStaticProps: GetStaticProps<any> = async () => {
  const posts = getAllPosts(['title', 'date', 'slug', 'image']);
  const projects = getAllProjects(['title', 'summary', 'repoUrl']);

  return {
    props: {
      posts, projects
    },
  };
};

export default Home;