import Card from "../components/UI/Card";
import ListItem from "../components/UI/ListItem";
import UnorderedList from "../components/UI/UnorderedList";
import PageLayout from "./PageLayout";
import ProjectArchImg from "../assets/project-arch.png";
export function HomePage() {
  return (
    <PageLayout pageTitle="Cinema" pageSubTitle="Hello!">
      <Card className="flex-col gap-4">
        <div>
          <p>
            This is a FullStack project - a management platform for members &
            movies subscriptions.
          </p>
        </div>
        <div>
          <img src={ProjectArchImg} alt="Project Architecture" />
        </div>
        <div>
          <p className="font-semibold">Technologies:</p>
          <UnorderedList>
            <ListItem>
              Frontend: React, Redux, React-Router, TypeScript, TailwindCSS
            </ListItem>
            <ListItem>Backend: Node.js, Express, MongoDB</ListItem>
          </UnorderedList>
        </div>
        <div>
          <p className="font-semibold">
            To login as an Admin and try the platform:
          </p>
          <UnorderedList>
            <ListItem>Username: test@test.com</ListItem>
            <ListItem>Password: Test!1234</ListItem>
          </UnorderedList>
        </div>
        <div>
          <p className="font-semibold">Source code:</p>
          <UnorderedList>
            <ListItem>
              <a
                href="https://github.com/talmosko/moviesWatcher-front"
                className="underline text-blue-500"
              >
                Frontend
              </a>
            </ListItem>
            <ListItem>
              <a
                href="https://github.com/talmosko/MoviesWatcher"
                className="underline text-blue-500"
              >
                Backend
              </a>
            </ListItem>
          </UnorderedList>
        </div>
      </Card>
    </PageLayout>
  );
}
 