import { GithubRepo, GithubUser } from "../context/GithubContext"
import useRepoAPI from "../hooks/useRepoAPI"
import Star from "../assets/star.svg"
import { Spinner } from "./Loader"

export default function RepoList({ user }: { user: GithubUser }) {
  const { repos, error, isLoading } = useRepoAPI(user.repos_url)
  if (error) {
    return <h1>An error occured, please try again later</h1>
  }

  if (isLoading) {
    return <div className="flex justify-center items-center w-full">
      <Spinner dimension={60} />
    </div>
  }

  return (
    <ul className="w-full h-fit mt-4 transition-height duration-1000 ease-in-out">
      {repos.map((repo: GithubRepo, key: number) => (
        <li key={key} className="flex justify-between items-start w-full px-4 py-2">
          <div className="basis-10/12">
            <h1 className="font-bold text-sm uppercase text-green-500">{repo.name}</h1>
            <h2 className="font-medium text-sm">{repo.description}</h2>
          </div>
          <div className="basis-2/12 flex items-center justify-end">
            <span className="text-green-500 pt-1">{repo.watchers_count}</span>
            <img src={Star} width={16} className="ml-2 inline-block" />
          </div>
        </li>
      ))}
    </ul>
  )
}