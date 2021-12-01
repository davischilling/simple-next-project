import { GetStaticPaths, GetStaticProps } from "next";

type Profile = {
  company: string;
  bio: string;
};

type ProfileProps = {
  profile: Profile;
};

export default function Profile({ profile }: ProfileProps) {
  return (
    <div>
      <h1>Profile</h1>
      <p>Nome: {profile.company}</p>
      <p>Bio: {profile.bio}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { username: "dbatistaschilling" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username } = params;

  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();

  return {
    props: {
      profile: data,
    },
    revalidate: 10,
  };
};
