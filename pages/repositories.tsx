import { GetServerSideProps } from "next";

type Repo = {
  name: string;
  description: string;
};

type RepositoriesProps = {
  repos: Repo[];
};

export default function repositories({ repos }: RepositoriesProps) {
  return (
    <div>
      <h1>respositories</h1>
      <ul>
        {repos.map(repo => (
          <li key={repo.name}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://api.github.com/users/dbatistaschilling/repos");
  const data = await response.json();

  return {
    props: {
      repos: data,
    },
  };
};
