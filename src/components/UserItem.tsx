import { useState } from "react";
import { GithubUser } from "../context/GithubContext";
import Arrow from "../assets/arrow.svg";
import RepoList from "./RepoList";

export default function Useritem({ user }: { user: GithubUser }) {
  const [openRepo, setOpenRepo] = useState(false)
  return (
    <>
      <li className="flex flex-col w-full px-3 py-2 mb-1 items-center border-2 border-gray-solid" >
        <div className="flex flex-row w-full">
          <div className="basis-2/12">
            <img src={user.avatar_url} alt={user.login} className="object-cover max-w-none w-20 h-20 rounded-full" />
          </div>
          <div className="max-[400px]:pl-3 basis-8/12 flex items-center">
            <span className="lg:pl-0 pl-3 text-green-500 font-medium uppercase text-lg hover:cursor-pointer" onClick={() => setOpenRepo(state => !state)} >{user.login}</span>
          </div>
          <div className="basis-2/12 hover:cursor-pointer flex justify-end items-center">
            <img width={24} src={Arrow} onClick={() => setOpenRepo(state => !state)} />
          </div>
        </div>
        <div className="w-full">
          {openRepo && <RepoList user={user} />}
        </div>
      </li>
    </>)
}