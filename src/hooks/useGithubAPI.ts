import useSWRImmutable from 'swr/immutable';
import { useCallback, useState, useContext, useEffect, useRef } from 'react';
import { GithubActionType, GithubContext, GithubUser } from '../context/GithubContext';
import { LimitSearchUser } from '../config/config'

type GithubResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}

export default function useGithubAPI(query: string = '') {
  const { dispatch } = useContext(GithubContext);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const page = useRef(1);

  const options: Record<string, string> = {}
  if (LimitSearchUser > 0) {
    options['page'] = '1'
    options['per_page'] = LimitSearchUser.toString()
  }

  const url = `https://api.github.com/search/users?${new URLSearchParams({
    ...options,
    q: query,
  })}`

  const fetcher = (url: string) => fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN ?? ""}`,
      "X-GitHub-Api-Version": "2022-11-28"
    }
  })
    .then(async (res) => {
      const respJson = await res.json() as GithubResponse
      const mappedData: GithubUser[] = respJson.items.map((item: any) => ({
        id: item.id,
        login: item.login,
        avatar_url: item.avatar_url,
        html_url: item.html_url,
        repos_url: item.repos_url,
      }));
      return Promise.resolve(mappedData ?? []);
    })

  const loadMoreUsers = useCallback(() => {
    if (query.length === 0) {
      return;
    }
    setLoadMoreLoading(true)
    page.current += 1;
    const pageUrl = url + `&page=${page.current}`;
    fetcher(pageUrl).
      then((mappedData) => {
        dispatch({
          type: GithubActionType.LOAD_MORE_USERS,
          payload: mappedData ?? []
        });
      })
      .finally(() => {
        setLoadMoreLoading(false)
      })
  }, [query])

  const { data, error, isLoading } = useSWRImmutable(query.length > 0 ? url : null, fetcher)

  useEffect(() => {
    page.current = 1
    dispatch({
      type: GithubActionType.FETCH_USERS,
      payload: data ?? []
    });
  }, [data])

  return { users: data ?? [], loadMoreUsers, error, isLoading, loadMoreLoading };
}