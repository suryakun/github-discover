import useSWRImmutable from 'swr/immutable';
import { GithubToken } from '../config/config';
import { GithubRepo } from '../context/GithubContext';

export default function useRepoAPI(url: string = '') {

  const fetcher = (url: string) => fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${GithubToken}`,
      "X-GitHub-Api-Version": "2022-11-28"
    }
  })
    .then(async (res) => {
      const respJson = await res.json() as Object[]
      const mappedData: GithubRepo[] = respJson.map((item: any) => ({
        name: item.name,
        description: item.description,
        watchers_count: item.watchers_count
      }));
      return Promise.resolve(mappedData ?? []);
    })

  const { data, error, isLoading } = useSWRImmutable(url, fetcher)

  return { repos: data ?? [], error, isLoading };
}