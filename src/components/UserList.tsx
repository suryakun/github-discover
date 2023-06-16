import { useContext, useEffect, useRef } from "react";
import useGithubAPI from "../hooks/useGithubAPI";
import { GithubContext, GithubUser } from "../context/GithubContext";
import Loader, { Spinner } from "./Loader";
import Useritem from "./UserItem";

type Props = {
  query: string;
}

export default function UserList({ query }: Props) {
  const { isLoading, loadMoreUsers, loadMoreLoading } = useGithubAPI(query)
  const { users } = useContext(GithubContext)
  const observerTarget = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreUsers()
      }
    }, {
      threshold: 1.0
    })

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [observerTarget, isLoading, query, loadMoreUsers])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div data-testid="user-list">
      {query.length > 0 && users.length === 0 && !isLoading &&
        <div className="flex flex-col w-full justify-center items-center px-3 pb-5">
          <span className="text-green-500 font-medium uppercase text-lg mt-8">No user found</span></div>
      }

      {query.length === 0 &&
        <div className="flex flex-col w-full justify-center items-center px-3 pb-5">
          <span className="text-green-500 font-medium uppercase text-lg mt-8">Please enter a username</span></div>
      }

      <ul className="flex flex-col w-full justify-center items-center px-3 pb-5">
        {users.map((user: GithubUser, key: number) => (
          <Useritem user={user} key={key} />
        ))}
      </ul>
      <div className="w-full h-12 pb-3 flex justify-center items-center" ref={observerTarget}>
        {loadMoreLoading && <Spinner />}
      </div>
    </div>
  );
}