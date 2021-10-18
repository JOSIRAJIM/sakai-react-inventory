import {useState, useEffect, useDebugValue} from 'react'
import { useDirectus } from '../DirectusProvider'
import RequestStatus from '../utils/RequestStatus';
export const useDirectusRequest = (fn)=>{
    const {directus} = useDirectus()
    const [response, setResponse] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        // will call the API with your provided fn
        const fetcher = async () => {
          try {
            const result = await fn(directus);
            // set the response if everything's allright
            setResponse(result);
          } catch (err) {
            // set the error if something went wrong
            setError(err);
          }
        }
    
        // execute!
        fetcher();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [fn]);

      const state = error
      ? RequestStatus.Error
      : response
        ? RequestStatus.Success
        : RequestStatus.Pending;
  
    // debugging experience for devtools
    useDebugValue({ response, error, state }, ({ response, error, state }) => {
      return `${state}: ${response || error}`
    });
  
    return [response, error, state];
}
